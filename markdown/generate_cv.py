import os
import json
import inspect
from .parse import html_to_markdown


class CV:
    def __init__(self, assets_path: str):
        self.p = assets_path
        
    def header(self):
        h = """# Joshua Prettyman, Ph.D.\n\n"""
        h += "Data Scientist, Mathematics Ph.D., Python Developer\n\n"
        contacts = [
            "[joshua@prettyman.me](mailto:joshua@prettyman.me)", 
            "[linkedin.com/in/joshuaprettyman](https://www.linkedin.com/in/joshuaprettyman/)", 
            "[joshua.prettyman.me](https://joshua.prettyman.me)"
        ]
        h += " | ".join(contacts)
        h += "\n\n"
        return h
        
    def professional_experience(self) -> str:
        section = "# Professional Experience\n\n"
        
        p = os.path.join(self.p, "cv-professional")
        
        with open(os.path.join(p, "intro-experience.html"), "r") as _f:
            _md = html_to_markdown(_f.read())
        
        section += _md
        section += "\n\n"
            
        with open(os.path.join(p, "manifest.json"), "r") as f:
            manifest = json.load(f)

        for r in manifest:
            s = f"## {r['title']}\n\n"
            s += f"**{r['company']} | {r['duration']}**\n\n"
            with open(os.path.join(p, r['entryId']+".shtml"), "r") as _f:
                _md = html_to_markdown(_f.read())
            s += _md
            s += "\n\n"
            section += s
        
        return section
    
    def _parse_tech_skill(self, record: dict):
        s = f"## {record['title']}\n\n"
        s += record['firstParagraph'] + "\n"
        for _d in record['text']:
            s += f"- {_d['content']}\n"
            if children := _d.get('children'):
                for c in children:
                    s += f"\t- {c}\n"
        return s
    
    def tech_skills(self):
        section = "# Technologies and Skills\n\n"
        
        intro_path = os.path.join(self.p, "cv-professional", "intro-tech-stack.html")
        with open(intro_path, "r") as _f:
            _md = html_to_markdown(_f.read())
        section += _md
        section += "\n\n"      
        
        with open(os.path.join(self.p, "techSkills.json"), "r") as _f:
            info = json.load(_f)
            
        for _record in info:
            section += self._parse_tech_skill(_record) + "\n"
            
        return section
    
    def academic_experience(self):
        section = "# Academic Background\n\n"
        
        p = os.path.join(self.p, "cv-academic")
        
        with open(os.path.join(p, "intro-academic.html"), "r") as _f:
            _md = html_to_markdown(_f.read())
        
        section += _md
        section += "\n\n"
            
        with open(os.path.join(p, "manifest.json"), "r") as f:
            manifest = json.load(f)

        for r in manifest:
            s = f"## {r['title']}\n\n"
            s += f"**{r['company']}**"
            if 'grade' in r:
                s += f" ({r['grade']})"
            s += "\n\n"
            
            with open(os.path.join(p, r['entryId']+".shtml"), "r") as _f:
                _md = html_to_markdown(_f.read())
            s += _md
            s += "\n\n"
            section += s
        
        return section
    
    def to_md(self, file: str = None) -> str | None:
        cv = self.header()
        cv += self.professional_experience()
        cv += self.tech_skills()
        cv += self.academic_experience()
        
        if file:
            with open(file, "w") as _f:
                _f.write(cv)
        else:
            return cv
        

def jp_website_path() -> str:
    # Get the current file path
    current_file = inspect.getfile(inspect.currentframe())
    absolute_path = os.path.abspath(current_file)
    p = os.path.dirname(absolute_path)
    
    # Go up a level until we get jp-website
    while os.path.basename(p) != "jp-website":
        p = os.path.dirname(p)
        
    return p


if __name__ == "__main__":
    p = jp_website_path()

    cv = CV(os.path.join(p, "src", "assets"))
    cv.to_md(os.path.join(p, "public", "documents", "JPrettymanCV.md"))