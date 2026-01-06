#!/usr/bin/env python3
"""
Generate PDF cover letters from jobs.json using LaTeX.
"""

import json
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path


LATEX_TEMPLATE = r"""\documentclass[11pt]{article}

\usepackage[paper=a4paper,
            margin=25mm]{geometry}

\usepackage{hyperref}
\usepackage{color}
\definecolor{darkblue}{rgb}{0.0,0.0,0.3}
\hypersetup{colorlinks,breaklinks,
            linkcolor=darkblue,urlcolor=darkblue,
            anchorcolor=darkblue,citecolor=darkblue}

\setlength{\parindent}{0pt}
\setlength{\parskip}{12pt}

\pagestyle{empty}

\begin{document}

% Letterhead
\begin{center}
{\Large \underline{JOSHUA PRETTYMAN, PHD}}

\vspace{4pt}

\href{mailto:joshua@prettyman.me}{joshua@prettyman.me} \textbar{} \href{https://joshuaprettyman.com}{joshuaprettyman.com} \textbar{} \href{https://linkedin.com/in/prettyman}{in/prettyman}
\end{center}

\vspace{20pt}

<INSERT_DATE>

\vspace{12pt}

% Subject line
\textbf{RE: <INSERT_TITLE> role at <INSERT_COMPANY>}

\vspace{12pt}

% Salutation
Dear <INSERT_ADDRESSEE>,

% Body
<INSERT_BODY>

\vspace{12pt}

Yours <INSERT_SIGNOFF>,

\vspace{24pt}

Joshua Prettyman

\end{document}
"""


def escape_latex(text: str) -> str:
    """Escape special LaTeX characters in text."""
    replacements = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}',
    }
    for char, replacement in replacements.items():
        text = text.replace(char, replacement)
    return text


def compile_latex_to_pdf(latex_source: str, output_path: Path) -> bool:
    """Compile LaTeX source to PDF."""
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_file = Path(tmpdir) / "latex_source.tex"
        tex_file.write_text(latex_source)

        # Run pdflatex twice for references
        for _ in range(2):
            result = subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-output-directory", tmpdir, str(tex_file)],
                capture_output=True,
                text=True
            )
            if result.returncode != 0:
                print(f"LaTeX compilation error:\n{result.stdout}\n{result.stderr}")
                return False

        # Copy PDF to output location
        pdf_file = Path(tmpdir) / "latex_source.pdf"
        if pdf_file.exists():
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_bytes(pdf_file.read_bytes())
            return True
        return False


class Job:
    def __init__(
        self, 
        company: str,
        title: str,
        cover_letter_body: str,
        addressee: str = None):
        
        self.company: str = company
        self.title: str = title
        self.cover_letter_body: str = cover_letter_body
        
        if addressee:
            self.addressee = addressee
            self.sign_off: str = "sincerely"
        else:           
            self.addressee = "hiring team"
            self.sign_off = "faithfully"
            
    @classmethod
    def from_dict(cls, job_dict: dict):
        if not isinstance(job_dict, dict):
            print(f"WARNING: Skipping entry - incorrect formatting")
            return None
        
        company = job_dict.get('company')
        title = job_dict.get('title')
        cover_letter = job_dict.get('cover_letter', '')
        addressee = job_dict.get('addressee')
        
        if not company:
            print(f"WARNING: Skipping entry - missing 'company' field")
            return None
        if not cover_letter.strip():
            print(f"WARNING: Skipping {company} - 'cover_letter' field is empty")
            return None
        if not title:
            print(f"WARNING: Skipping {company} - missing 'title' field")
            return None
            
        return cls(company, title, cover_letter, addressee)
    
    @property
    def filename(self) -> str:
        """Convert company name to safe filename."""
        sanitized = self.company.replace(' ', '_').replace('/', '_').replace('\\', '_')
        return f"{sanitized}_JoshuaPrettyman_CoverLetter"

    @property
    def latex_source_cover_letter(self) -> str:
        """Generate LaTeX source for a cover letter."""
        
        # Escape text for LaTeX
        company_escaped = escape_latex(self.company)
        cover_letter_escaped = escape_latex(self.cover_letter_body)
        title_escaped = escape_latex(self.title)
        addressee_escaped = escape_latex(self.addressee)

        # Format current date
        current_date = datetime.now().strftime("%d %B %Y")

        # Convert newlines to LaTeX paragraph breaks
        cover_letter_formatted = cover_letter_escaped.replace('\n', '\n\n')

        latex_template = LATEX_TEMPLATE
        latex_template = latex_template.replace('<INSERT_SIGNOFF>', self.sign_off)
        latex_template = latex_template.replace('<INSERT_DATE>', current_date)
        latex_template = latex_template.replace('<INSERT_TITLE>', title_escaped)
        latex_template = latex_template.replace('<INSERT_COMPANY>', company_escaped)
        latex_template = latex_template.replace('<INSERT_ADDRESSEE>', addressee_escaped)
        latex_template = latex_template.replace('<INSERT_BODY>', cover_letter_formatted)

        return latex_template

    @property
    def plain_text_cover_letter(self) -> str:
        """Generate plain text cover letter (no letterhead)."""
        lines = [
            f"Dear {self.addressee},",
            "",
            self.cover_letter_body,
            "",
            f"Yours {self.sign_off},",
            "",
            "Joshua Prettyman"
        ]
        return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description='Generate PDF cover letters from jobs.json')
    parser.add_argument('company', nargs='?', help='Generate for specific company only (case-insensitive)')
    args = parser.parse_args()

    # Ensure output directories exist
    TXT_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Read jobs data
    with open(JOBS_FILE, 'r') as f:
        jobs = json.load(f)

    # Filter by company if specified
    if args.company:
        jobs = [j for j in jobs if j.get('company', '').lower() == args.company.lower()]
        if not jobs:
            print(f"No job found for company: {args.company}")
            return

    # Process each job with a cover letter
    generated_count = 0
    for job_dict in jobs:
        print()
        job = Job.from_dict(job_dict)
        
        if job is None:
            continue
        
        print(f"Generating cover letter for {job.company}...")
        output_path = PDF_OUTPUT_DIR / f"{job.filename}.pdf"
        if compile_latex_to_pdf(job.latex_source_cover_letter, output_path):
            print(f"  Created: .pdf cover letter for {job.company}")
            generated_count += 1
        else:
            print(f"  Failed to generate PDF for {job.company}")

        # Generate plain text version
        txt_output_path = TXT_OUTPUT_DIR / f"{job.filename}.txt"
        txt_output_path.write_text(job.plain_text_cover_letter)
        print(f"  Created: .txt cover letter for {job.company}")

    print(f"\nGenerated {generated_count} cover letter(s)")


if __name__ == "__main__":
    main()
