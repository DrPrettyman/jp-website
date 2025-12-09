#!/usr/bin/env python3
"""
Generate PDF cover letters from jobs.json using LaTeX.
"""

import json
import os
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

\href{mailto:joshua@prettyman.me}{joshua@prettyman.me} \textbar{} \href{https://joshuaprettyman.com}{joshuaprettyman.com} \textbar{} \href{https://linkedin.com/in/joshuaprettyman}{in/joshuaprettyman}
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

Yours sincerely,

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


def generate_latex_cover_letter(
    company: str,
    title: str,
    cover_letter: str,
    addressee: str = "hiring team"
) -> str:
    """Generate LaTeX source for a cover letter."""

    # Escape text for LaTeX
    company_escaped = escape_latex(company)
    cover_letter_escaped = escape_latex(cover_letter)
    title_escaped = escape_latex(title)
    addressee_escaped = escape_latex(addressee)

    # Format current date
    current_date = datetime.now().strftime("%d %B %Y")

    # Convert newlines to LaTeX paragraph breaks
    cover_letter_formatted = cover_letter_escaped.replace('\n', '\n\n')

    latex_template = LATEX_TEMPLATE
    latex_template = latex_template.replace('<INSERT_DATE>', current_date)
    latex_template = latex_template.replace('<INSERT_TITLE>', title_escaped)
    latex_template = latex_template.replace('<INSERT_COMPANY>', company_escaped)
    latex_template = latex_template.replace('<INSERT_ADDRESSEE>', addressee_escaped)
    latex_template = latex_template.replace('<INSERT_BODY>', cover_letter_formatted)

    return latex_template


def generate_plain_text_cover_letter(
    cover_letter: str,
    addressee: str = "hiring team"
) -> str:
    """Generate plain text cover letter (no letterhead)."""
    lines = [
        f"Dear {addressee},",
        "",
        cover_letter,
        "",
        "Yours sincerely,",
        "",
        "Joshua Prettyman"
    ]
    return "\n".join(lines)


def compile_latex_to_pdf(latex_source: str, output_path: Path) -> bool:
    """Compile LaTeX source to PDF."""
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_file = Path(tmpdir) / "cover_letter.tex"
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
        pdf_file = Path(tmpdir) / "cover_letter.pdf"
        if pdf_file.exists():
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_bytes(pdf_file.read_bytes())
            return True
        return False


def sanitize_filename(name: str) -> str:
    """Convert company name to safe filename."""
    return name.replace(' ', '_').replace('/', '_').replace('\\', '_')


def main():
    script_dir = Path(__file__).parent
    jobs_file = script_dir / "jobs.json"
    output_dir = script_dir / "cover_letters"
    txt_output_dir = script_dir / "cover_letters_txt"

    # Ensure output directories exist
    txt_output_dir.mkdir(parents=True, exist_ok=True)

    # Read jobs data
    with open(jobs_file, 'r') as f:
        jobs = json.load(f)

    # Process each job with a cover letter
    generated_count = 0
    for job in jobs:
        if 'cover_letter' not in job or not job['cover_letter'].strip():
            continue

        company = job.get('company', 'Unknown')
        title = job.get('title', 'Position')
        cover_letter = job['cover_letter']
        addressee = job.get('addressee', 'hiring team')

        print(f"Generating cover letter for {company}...")

        # Generate LaTeX
        latex_source = generate_latex_cover_letter(
            company=company,
            title=title,
            cover_letter=cover_letter,
            addressee=addressee
        )

        # Compile to PDF
        base_filename = f"{sanitize_filename(company)}_JoshuaPrettyman_CoverLetter"
        output_path = output_dir / f"{base_filename}.pdf"

        if compile_latex_to_pdf(latex_source, output_path):
            print(f"  Created: {output_path}")
            generated_count += 1
        else:
            print(f"  Failed to generate PDF for {company}")

        # Generate plain text version
        plain_text = generate_plain_text_cover_letter(
            cover_letter=cover_letter,
            addressee=addressee
        )
        txt_output_path = txt_output_dir / f"{base_filename}.txt"
        txt_output_path.write_text(plain_text)
        print(f"  Created: {txt_output_path}")

    print(f"\nGenerated {generated_count} cover letter(s)")


if __name__ == "__main__":
    main()
