# Travel Photos Processing

This directory contains raw travel photos and the script to process them for the interactive TravelMap component.

## Directory Structure

```
map-photos-raw/
  process_photos.py
  readme.md
  <folder_name>/
    descriptions.json
    <photo_files>
```

## Adding New Travel Photos

1. **Create a folder** for your travel collection (e.g., `vanlife/`)

2. **Add your photos** to the folder. Photos must have:
   - GPS coordinates in EXIF metadata
   - DateTime in EXIF metadata
   - Common image format (JPG, JPEG, PNG)

3. **Create `descriptions.json`** in the folder with this structure:
   ```json
   {
     "Title": "Trip Title",
     "Text": "Overall trip description",
     "Chapters": [
       {
         "Title": "Chapter Name",
         "Dates": "YYYY-MM-DD:YYYY-MM-DD",
         "Text": "Chapter description",
         "Photos": [
           {
             "Title": "Photo Title",
             "File": "filename_without_extension",
             "Description": "Photo description"
           }
         ]
       }
     ]
   }
   ```

## Running the Script

From the `map-photos-raw/` directory:

```bash
python process_photos.py <folder_name>
```

Example:
```bash
python process_photos.py vanlife
```

## What the Script Does

1. **Reads** raw photos from `map-photos-raw/<folder_name>/`
2. **Extracts** GPS coordinates and DateTime from EXIF metadata
3. **Resizes** images to ~0.5MB (configurable via `TARGET_SIZE_MB`)
4. **Rotates** images based on EXIF orientation
5. **Renames** files with chapter and photo numbers: `01-01-filename.jpg`
6. **Saves** processed images to `/public/travel-images/<folder_name>/`
7. **Generates** `metadata-<folder_name>.json` in `/src/assets/map_data/`

The metadata file contains all photo locations, descriptions, and bounds for the TravelMap component.

## Notes

- Photos without GPS data will cause the script to fail
- Duplicate filenames across subdirectories are not allowed
- The script corrects image orientation automatically based on EXIF data
