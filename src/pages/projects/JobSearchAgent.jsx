import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { Briefcase } from 'lucide-react';

export const meta = () => generateMeta({ title: "JobSearch Agent", description: "An AI-powered CLI tool that automates job research, opportunity filtering, and cover letter writing using Claude.", path: "/projects/jobsearch-agent" });

const CodeBlock = ({ children, title }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    {title && (
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-mono text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
        {title}
      </div>
    )}
    <pre className="bg-gray-50 dark:bg-gray-900 p-4 overflow-x-auto text-sm">
      <code className="text-gray-800 dark:text-gray-200">{children}</code>
    </pre>
  </div>
);

const JobSearchAgentProject = () => {
  return (
    <Layout>
      <ContentBlock title="JobSearch Agent" icon={Briefcase} githubUrl="https://github.com/DrPrettyman/JobSearchAgent" maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">Overview</h2>

            <p className="mb-4 text-justify">
              JobSearch is an AI-powered CLI tool that automates the most time-consuming parts of job hunting:
              researching positions, filtering opportunities, and writing cover letters. It leverages Claude AI
              to find relevant jobs via web search, intelligently filter them based on your background, and
              generate tailored cover letters as professional PDFs.
            </p>

            <p className="mb-8 text-justify">
              The project was born out of personal necessity. After spending hours manually searching job boards,
              reading through irrelevant postings, and crafting individual cover letters, I realized most of this
              could be automated with modern AI capabilities. The result is a tool that can search, filter, and
              prepare applications in minutes rather than hours.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Key Features</h2>

            <h3 className="text-xl mb-3 font-semibold">AI-Powered Job Search</h3>

            <p className="mb-4 text-justify">
              The tool generates optimized search queries combining your desired job titles, locations, and
              relevant keywords, then executes them via Claude's web search capabilities. Results are
              automatically deduplicated and enriched with full job descriptions scraped from the posting URLs.
            </p>

            <CodeBlock title="Example search queries">
{`"data scientist" remote Spain hiring 2025
"ML engineer" remote worldwide work from anywhere
"machine learning" "Python" Barcelona full-time
"senior data analyst" Europe remote-first`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Intelligent Filtering</h3>

            <p className="mb-4 text-justify">
              Not every job posting is a good fit. The tool uses Claude to analyze each job description against
              your professional background and automatically filters out unsuitable positions. This means you
              only spend time reviewing jobs where you're actually a competitive candidate.
            </p>

            <h3 className="text-xl mb-3 font-semibold">Profile Building</h3>

            <p className="mb-4 text-justify">
              The system builds a comprehensive professional profile by parsing multiple document formats
              (PDF, DOCX, LaTeX, even Excel) and fetching your online presence from LinkedIn, GitHub, and
              personal websites. This rich profile powers both the filtering and cover letter generation.
            </p>

            <CodeBlock title="Supported document formats">
{`# Document parsing via python-docx, pypdf, openpyxl
- PDF (resumes, certificates)
- Word documents (CV, cover letters)
- LaTeX files (academic CVs)
- Excel/CSV (project lists, skills matrices)
- HTML/JSON (portfolio exports)`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Cover Letter Generation</h3>

            <p className="mb-4 text-justify">
              This is where the tool really shines. Rather than using a generic template, it follows a
              multi-step process to create genuinely personalized cover letters:
            </p>

            <ol className="list-decimal list-inside mb-4 space-y-2">
              <li>Analyze the job description to identify key topics and requirements</li>
              <li>Map your experience to those specific topics</li>
              <li>Select the 3-5 strongest matches where your background is most relevant</li>
              <li>Generate a tailored cover letter body (3-4 paragraphs)</li>
              <li>Compile to PDF using LaTeX for professional formatting</li>
            </ol>

            <p className="mb-8 text-justify">
              The system is specifically prompted to avoid common AI writing patterns, producing letters
              that read authentically rather than obviously machine-generated.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Architecture</h2>

            <p className="mb-4 text-justify">
              The project is structured as a modular Python CLI application with clear separation of concerns:
            </p>

            <CodeBlock title="Project structure">
{`jobsearch/
├── main.py              # Entry point, CLI argument parsing
├── cli_menus.py         # Interactive menu system
├── search_jobs.py       # Job search orchestration
├── cover_letter_writer.py  # LaTeX PDF generation
├── online_presence.py   # LinkedIn/GitHub scraping
├── utils.py             # Claude API wrapper, document parsing
├── cli_utils.py         # Terminal formatting, colors
└── data_handlers/
    ├── user_data.py     # Profile management
    ├── jobs_data.py     # Job storage & tracking
    └── query_data.py    # Search query management`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Data Storage</h3>

            <p className="mb-4 text-justify">
              All user data is stored locally in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">~/.JobSearch/&lt;user_id&gt;/</code>,
              with JSON files for structured data and CSV for search query tracking:
            </p>

            <CodeBlock title="User data directory">
{`~/.JobSearch/joshua/
├── user_info.json           # Profile, preferences, AI-generated summaries
├── jobs.json                # Job postings with metadata and status
├── search_queries.csv       # Generated search queries
├── search_query_results.csv # Query execution history
└── cover_letters/           # Generated PDF cover letters`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Multi-User Support</h3>

            <p className="mb-8 text-justify">
              The tool supports multiple user profiles via the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">-u</code> flag,
              making it useful for career coaches or households where multiple people are job hunting.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Workflow</h2>

            <p className="mb-4 text-justify">
              The CLI follows a structured menu system that guides users through the job search process:
            </p>

            <CodeBlock title="CLI navigation flow">
{`START → New User? → SETUP (profile configuration)
                         ↓
                    MAIN MENU
                    ├─ User Info (edit profile, refresh documents)
                    ├─ Search for Jobs (execute queries, filter results)
                    ├─ View/Manage Jobs
                    │   └─ Job Detail
                    │       ├─ Mark as applied
                    │       ├─ Generate cover letter
                    │       └─ Export PDF
                    ├─ Settings
                    └─ Exit`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Job Search Pipeline</h3>

            <p className="mb-4 text-justify">
              When searching for jobs, the system executes a multi-phase pipeline:
            </p>

            <ol className="list-decimal list-inside mb-8 space-y-2">
              <li><strong>Query Execution</strong>: Run search queries via Claude web search</li>
              <li><strong>Result Extraction</strong>: Parse job info (company, title, link, snippet)</li>
              <li><strong>Description Scraping</strong>: Fetch full job descriptions from posting URLs</li>
              <li><strong>Deduplication</strong>: Remove duplicate postings by URL</li>
              <li><strong>AI Filtering</strong>: Assess fit based on candidate background</li>
              <li><strong>Storage</strong>: Save results with metadata for tracking</li>
            </ol>

            <h2 className="text-2xl mb-4 font-bold">Technology Stack</h2>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Category</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Technologies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">CLI Interface</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">InquirerPy (interactive prompts)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Document Parsing</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">python-docx, pypdf, openpyxl</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Web Scraping</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">BeautifulSoup4, lxml</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">PDF Generation</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">LaTeX (pdflatex)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">AI Backend</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Claude CLI (with web search)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl mb-4 font-bold">Usage</h2>

            <CodeBlock title="Getting started">
{`# Install dependencies
pip install inquirerpy python-docx pypdf openpyxl beautifulsoup4 lxml

# Ensure Claude CLI is installed and authenticated
claude --version

# Run the tool
python -m jobsearch

# Or with a specific user profile
python -m jobsearch -u username`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              On first run, the setup wizard guides you through configuring your profile: personal information,
              professional credentials, online presence links, source documents, desired job titles, and
              preferred locations. The system then generates a comprehensive professional summary using AI.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>AI-powered job search via Claude web search</li>
                <li>Intelligent filtering based on candidate background</li>
                <li>Multi-format document parsing (PDF, DOCX, LaTeX, Excel)</li>
                <li>LinkedIn/GitHub profile integration</li>
                <li>Personalized cover letter generation with LaTeX PDF output</li>
                <li>Local data storage with multi-user support</li>
                <li>Beautiful terminal UI with interactive menus</li>
              </ul>
            </div>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default JobSearchAgentProject
