import os
import json
import argparse
from pathlib import Path
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

RAW_PHOTOS_PATH = os.getcwd()
MAP_ASSETS_PATH = os.path.join(os.path.dirname(os.getcwd()), "src", "assets", "map_data")
MAP_IMAGES_PATH = os.path.join(os.path.dirname(os.getcwd()), "public", "travel-images")

TARGET_SIZE_MB = 0.5

if not os.path.exists(MAP_ASSETS_PATH):
    os.makedirs(MAP_ASSETS_PATH)
    
if not os.path.exists(MAP_IMAGES_PATH):
    os.makedirs(MAP_IMAGES_PATH)

def convert_to_degrees(value):
    """Convert GPS coordinates to degrees in float format"""
    d, m, s = value
    return round(d + (m / 60.0) + (s / 3600.0), 7)

def get_metadata(img):
    """Get all metadata including GPS coordinates if available"""

    exif_data = img.getexif()
    
    metadata = {}
    
    # Get basic EXIF data
    for tag_id, value in exif_data.items():
        tag = TAGS.get(tag_id, tag_id)
        metadata[tag] = value
        
    if metadata.get("Orientation") is None:
        metadata["Orientation"] = 1
    
    # Get GPS data if it exists
    if 34853 in exif_data:  # GPSInfo tag exists
        gps_ifd = exif_data.get_ifd(0x8825)
        gps_info = {}
        for tag_id, value in gps_ifd.items():
            tag = GPSTAGS.get(tag_id, tag_id)
            gps_info[tag] = value
        
        # Convert to decimal degrees if coordinates exist
        if 'GPSLatitude' in gps_info and 'GPSLongitude' in gps_info:
            lat = convert_to_degrees(gps_info['GPSLatitude'])
            lon = convert_to_degrees(gps_info['GPSLongitude'])
            
            if gps_info.get('GPSLatitudeRef') == 'S':
                lat = -lat
            if gps_info.get('GPSLongitudeRef') == 'W':
                lon = -lon
            
            metadata['Latitude'] = lat
            metadata['Longitude'] = lon
            metadata['GPS_raw'] = gps_info
    
    return metadata

def correct_image_orientation(img, orientation):
    """
    Rotate image based on EXIF orientation tag.
    """
    
    if orientation is None:
        return img
    
    # Apply rotation based on orientation value
    if orientation == 3:
        img = img.rotate(180, expand=True)
    elif orientation == 6:
        img = img.rotate(270, expand=True)
    elif orientation == 8:
        img = img.rotate(90, expand=True)
    
    return img

def crop_to_square(image):
    """
    Crop image to square shape.
    - Uses the minimum of the height and width. So a 1080 x 1960 image will become a 1080 x 1080 image
    - Crops by anchoring bottom left
    """
    width, height = image.size

    # If already square, return original
    if width == height:
        return image

    size = min(width, height)

    # Anchor bottom left: left=0, top calculated from bottom, right=size, bottom=height
    left = 0
    top = height - size
    right = size
    bottom = height

    return image.crop((left, top, right, bottom)) 

def resize_image_to_target_size(input_path, output_path, target_size_mb=1.0, quality=85):
    """
    Resize an image to approximately target file size.
    
    Args:
        input_path: Path to input image
        output_path: Path to save resized image
        target_size_mb: Target file size in MB (default 1.0)
        quality: Initial JPEG quality (default 85)
    """
    target_size_bytes = target_size_mb * 1024 * 1024
    
    with Image.open(input_path) as img:
        metadata = get_metadata(img)
        
        img = correct_image_orientation(img=img, orientation=metadata.get("Orientation"))
        
        # Convert RGBA to RGB if necessary (for PNG with transparency)
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
            
        img = crop_to_square(img)
        
        # Start with original dimensions
        width, height = img.size
        
        # Save with initial quality and check size
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        current_size = os.path.getsize(output_path)
        
        # If still too large, reduce dimensions
        while current_size > target_size_bytes and quality > 10:
            if quality > 50:
                quality -= 5
            else:
                # Reduce dimensions by 10%
                width = int(width * 0.9)
                height = int(height * 0.9)
                img_resized = img.resize((width, height), Image.Resampling.LANCZOS)
                img_resized.save(output_path, 'JPEG', quality=quality, optimize=True)
                current_size = os.path.getsize(output_path)
                continue
            
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            current_size = os.path.getsize(output_path)
            
        metadata["AspectRatio"] = width / height
        
    return current_size, metadata

def image_names_in_dir(_path):
    image_extensions = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
    names = {}
    names_list = []
    for _p in _path.iterdir():
        if _p.is_file() and _p.suffix.lower() in image_extensions:
            _name = _p.name
            if "-" in _name:
                _name = _name.split("-")[1]
            _name = _name.split(".")[0]
            names[_name] = _p.absolute()
            names_list.append(_name)
        elif _p.is_dir():
            _names_in_dir = image_names_in_dir(_p)
            names.update(_names_in_dir)
            names_list.extend(_names_in_dir.keys())
    
    duplicate_names = [_item for _item in set(names_list) if names_list.count(_item) > 1]
    if duplicate_names:
        raise ValueError(f"Duplicate names: {', '.join(duplicate_names)}")
    
    return names
    
def process_images(folder_name: str):
    _d = Path(RAW_PHOTOS_PATH).joinpath(folder_name)
    n_photos: int = 0
    if _d.is_dir():
        image_path_out = Path(MAP_IMAGES_PATH).joinpath(_d.name)
        if not image_path_out.exists():
            image_path_out.mkdir()
            
        descriptions_path = _d.joinpath("descriptions.json")
        if descriptions_path.exists():
            with descriptions_path.open("r") as _f:
                descriptions = json.load(_f)
        else:
            raise FileNotFoundError(f"Could not find descriptions.json in {_d.name}")
        
        image_files = image_names_in_dir(_d)
        chapters = descriptions.get("Chapters")
        
        chapter_metadata_records = []
        latitudes = []
        longitudes = []
        for _chapter_num, chapter_data in enumerate(chapters):
            chapter_num = _chapter_num + 1
            photo_data_records = chapter_data.get("Photos")
            if not photo_data_records:
                continue
            
            _chap_md = {
                "Title": chapter_data["Title"],
                "Summary": chapter_data["Text"],
                "Chapter": chapter_num
            }
            dates = chapter_data["Dates"].split(":")
            _chap_md["StartDate"] = dates[0].strip()
            _chap_md["EndDate"] = dates[1].strip()
            
            _photos_md_records = []
            for _photo_num, photo_data in enumerate(photo_data_records):
                photo_num = _photo_num + 1
                _photo_md = {
                    "Chapter": chapter_num,
                    "Photo": photo_num,
                    "Title": photo_data["Title"],
                    "Summary": photo_data["Description"]
                }
                _file_name = photo_data["File"]
                if not _file_name:
                    raise ValueError(f"Field \"File\" not specified for photo titled \"photo_data['Title']\" in chapter \"{chapter_data['Title']}\"")
                image_file = image_files.get(_file_name)
                if image_file is None:
                    raise FileNotFoundError(f"Could not find {photo_num}: \"{_file_name}\" in {_d.name}, chapter \"{chapter_data['Title']}\"")
                
                image_output_file = image_path_out.joinpath(f"{chapter_num:0>2}-{photo_num:0>2}-{_file_name}.jpg")
                
                original_size = os.path.getsize(image_file)
                final_size, metadata = resize_image_to_target_size(
                    image_file, 
                    image_output_file, 
                    target_size_mb=TARGET_SIZE_MB
                )
                
                _lon = metadata.get("Longitude")
                _lat = metadata.get("Latitude")
                if _lon is None or _lat is None:
                    raise ValueError(f"No Lat/Lon data for photo \"{_file_name}\" in {_d.name}, chapter \"{chapter_data['Title']}\"")
   
                latitudes.append(_lat)
                longitudes.append(_lon)          
                
                _photo_md.update(
                    {
                        "FileName": image_output_file.name,
                        "FileSize": final_size,
                        "OriginalSize": original_size,
                        "Latitude": _lat,
                        "Longitude": _lon,
                        "AspectRatio": metadata.get("AspectRatio"),
                        "DateTime": metadata.get("DateTime"),
                    }
                )
                
                _photos_md_records.append(_photo_md)
                n_photos += 1
                
            _chap_md["Photos"] = _photos_md_records
            
            chapter_metadata_records.append(_chap_md)
            
        bounds = {
            "North": max(latitudes),
            "South": min(latitudes),
            "East": max(longitudes),
            "West": min(longitudes)
        }
        bounds["CenterLatitude"] = (bounds["North"] + bounds["South"]) / 2
        bounds["CenterLongitude"] = (bounds["East"] + bounds["West"]) / 2
        
        metadata = {
            "Title": descriptions.get("Title", "Title"),
            "Summary": descriptions.get("Text", "Summary text."),
            "Bounds": bounds,
            "Chapters": chapter_metadata_records
        }
            
        with Path(MAP_ASSETS_PATH).joinpath(f"metadata-{folder_name}.json").open("w") as _f:
            json.dump(metadata, _f, indent=2)
            
        return n_photos
            

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process travel photos and generate metadata')
    parser.add_argument('folder_name', type=str, help='Name of the folder containing the photos to process')

    args = parser.parse_args()

    n_photos = process_images(args.folder_name)
    print(f"Successfully processed {n_photos} photos from '{args.folder_name}'")
