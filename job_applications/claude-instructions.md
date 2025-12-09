# Cover Letter Writing Instructions

## Where to find information about Joshua

### Primary source (most up-to-date)
- **CV LaTeX file**: `public/cv/two_page/JPrettymanCV.tex`
  - Contains personal statement, technical skills, professional experience, and academic background
  - This is the canonical source for dates, job titles, and key achievements

### Additional detail
- **Technical skills breakdown**: `src/assets/techSkills.json`
  - Data Science: ScikitLearn, PyTorch, TensorFlow, NLP (NLTK), DBSCAN clustering, LLM integration (Ollama, Huggingface)
  - Data Engineering: BigQuery, PyGoogalytics package, GraphQL/REST API wrappers, ETL pipelines
  - Software Development: Python backend on GCP Compute Engine, PostgreSQL job queues, Scrapy, Cloud Functions
  - Visualisation: Matplotlib, Plotly, Retool dashboards, Looker Studio

- **Professional experience**: `src/assets/cv-professional/`
  - `blink.shtml` / `macaroni.shtml` - Blink SEO / Macaroni Software (most recent role)
  - `npl.shtml` - National Physical Laboratory (PhD research)
  - `shu.shtml` - Sheffield Hallam University (lecturing)
  - `met-office.shtml` - Met Office internship

- **Academic background**: `src/assets/cv-academic/`
  - `phd-reading.shtml` - PhD Mathematics, University of Reading
  - `mres-imperial.shtml` - MRes Mathematics, Imperial College London
  - `ma-edinburgh.shtml` - MA Mathematics, University of Edinburgh
  - `publications.json` - Published papers with links

### Previous applications
- **jobs.json** in this folder contains previous cover letters and question answers that can be referenced for tone and content

## Key selling points to highlight (adjust based on job requirements)

1. **Blink SEO / Macaroni Software**: Built full-stack ML platform from scratch, 20x productivity increase, Python backend on GCP + BigQuery (50M+ data points daily), async job queues in PostgreSQL, Plotly dashboards, evolved from internal tool to SaaS product

2. **PhD research at NPL**: Tipping point detection in time series data, stochastic models, published in peer-reviewed journals (ERL, Chaos, EPL), presented at international conferences

3. **Technical skills**: Python (10+ years), SQL, GCP, BigQuery, PostgreSQL, NLP, clustering, Plotly, Git, API integrations

4. **Soft skills**: Worked closely with delivery teams, comfortable explaining technical work to different audiences, ownership mentality

## Style guidelines

### Do
- Use contractions (I'm, I've, wasn't)
- Be direct and conversational
- Vary sentence length
- Include specific details (50M+ data points, 20x productivity)
- Show genuine interest in the specific role
- Connect past experience to the job requirements
- Keep it concise (4-6 short paragraphs)

### Don't
- Use em-dashes (use colons, commas, or periods instead)
- Use phrases like "I am writing to apply for...", "aligns closely with my experience", "I would welcome the opportunity"
- Use excessive formality or corporate-speak
- Make every paragraph the same length
- List skills like a checklist
- Over-explain or pad with filler

### Structure (flexible, not a rigid template)
1. Opening: State interest and what specifically draws you to the role
2. Blink SEO experience: Relevant technical details, outcomes, what you enjoyed
3. PhD research: Connect to the role if relevant, otherwise keep brief
4. Skills summary: Brief, only if not already covered above
5. Closing: Simple, no grovelling

## Best practices from hiring managers (tech/data science roles)

### What matters most
1. **Quantify achievements**: Concrete numbers like "20x productivity increase" or "50M+ data points daily" provide clear evidence of impact. Hiring managers want to see measurable results, not vague claims.

2. **Show genuine interest in the specific company**: Generic letters get ignored. Reference something specific about what the company does or their goals. Show you understand their challenges.

3. **Lead with the strongest stuff**: Write the intro as if it's the only part they'll read. Don't bury achievements in paragraph three.

4. **Balance technical and soft skills**: Technical competence is assumed from the CV. The cover letter is a chance to show communication skills, collaboration, and how you work with others.

5. **Mirror the job description language**: If they say "deploy models to production", use that phrase. If they emphasise "cross-functional teams", address that directly.

6. **Keep it short**: Hiring managers spend under a minute on cover letters. 4-6 short paragraphs max. Every sentence should earn its place.

### Common mistakes to avoid
- Generic openings that could apply to any company
- Restating the CV instead of adding context
- Focusing only on what you want (growth, learning) rather than what you can contribute
- Listing technologies without showing what you did with them
- Being too humble or too boastful

### For career changers / non-traditional backgrounds
The cover letter is where you explain your journey and emphasise transferable skills. Joshua's PhD-to-industry path is a strength: it shows he can tackle novel problems, work independently, and communicate complex ideas.

*Sources: [Resume Worded](https://resumeworded.com/cover-letter-samples/data-scientist), [BrainStation](https://brainstation.io/career-guides/data-science-cover-letter-templates-and-examples), [365 Data Science](https://365datascience.com/career-advice/job-interview-tips/data-scientist-cover-letter/), [Indeed](https://www.indeed.com/career-advice/cover-letter-samples/data-scientist), [Teal](https://www.tealhq.com/cover-letter-examples/software-engineer)*

## Example prompt

> Look at claude-instructions.md and write a cover letter for [Company Name]

Make sure the job entry in jobs.json has at minimum:
```json
{
    "company": "Company Name",
    "title": "Job Title",
    "description": "Full job description text..."
}
```

The cover letter will be added as a `"cover_letter"` field to the same entry.
