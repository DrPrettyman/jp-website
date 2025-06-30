# Joshua Prettyman, Ph.D.

Data Scientist, Mathematics Ph.D., Python Developer

[joshua@prettyman.me](mailto:joshua@prettyman.me) | [linkedin.com/in/joshuaprettyman](https://www.linkedin.com/in/joshuaprettyman/) | [joshua.prettyman.me](joshua.prettyman.me)

# Professional Experience

My Ph.D. focussed on predicting tipping points in dynamical systems using multi-dimensional time series data, which I thought to be a great jumping-off point for a career in Data Science: I'm good with statistics, problem solving, implementing algorithms and working with data.

I work in mainly in Python and SQL, but I have experience with creating and maintaining databases, dashboards and full-stack software projects. I have implemented and used a variety of Machine Learning algorithms.

In my most recent role at Blink SEO I built the company's internal software from scratch, increasing productivity by 20× by automating all data processing and generating data-lead recommendations through machine learning. This software improved the SEO process so much that we marketed it as a SaaS app to other agencies: *Macaroni Software*. You can find a pdf-format CV [here](https://j.prettyman.me/documents/JPrettymanCV.pdf).

## Data Scientist

**Macaroni Software | Nov 2023 — Dec 2024 (1 year)**

I created Macaroni as internal software for the Blink SEO team, which was successful in increasing productivity by over 20×. The management team decided to market it as a SaaS product. We streamlined the product and positioned it as a Shopify platform, allowing us to focus on the most common use-case and provide a more tailored solution for our clients.

Macaroni is a data engineering and machine learning platform that automates data ingestion, cleaning, analysis, and provides actionable insights for SEO teams.

As a new startup Macaroni hired a data engineer, front-end developer, and a product manager to take the product to market: I worked with the new team to onboard them and hand over parts of the project, freeing up time to work on the machine learning features, and still consulting regularly with the Blink SEO delivery team to understand their processes and requirements.

### Key achievements:
- Continued development of Macaroni Software, allowing SEO teams to deliver [a year's-worth of work in a single month](https://www.linkedin.com/posts/sam-wright-17b6ab6_shopify-seo-activity-7170336529146441729-JGDn?utm_source=combined_share_message&utm_medium=member_desktop).
- Agile development alongside new team members for continual integration and deployment.
- I refined the use of LLMs to generate page content, in consultation with Blink SEO's resident copywriter.
- I replaced part of the web-scraping process with data pulled directly from the Shopify GraphQL API to provide better data quality and reduce the load on the servers. This also allowed for more frequent updates and insights based on real-time product catalogue data.

### Other Responsibilities:
- Presenting to the team and stakeholders on the progress of Macaroni and the insights it has generated.
- I continued to complete one-off data tasks for the Blink SEO delivery and management teams including data engineering, content generation, and providing analyses and visualisations for clients and investors.
- I continued to work on data visualisations and interactive components for the front end (*Retool*, *Plotly JavaScript*) and data engineering tasks (*BigQuery SQL*).

### Technologies:
Python, SQL, Pandas, Machine Learning, NLP, ScikitLearn, NLTK, Huggingface, Plotly, Web Scraping, Looker, Retool, JavaScript, GraphQL, Unix, Linux, Bash, async, CGP Products, Compute Engine, Big Query, PostgreSQL, Docker, Git, Google Analytics, Google Search Console, Google Ads, Shopify API.

## Data Scientist / Full Stack Developer

**Blink SEO | Nov 2021 — Dec 2024 (3 years)**

I started at Blink as the only technical team member at a small SEO agency with the brief "use data to improve our processes". I quickly realised that the SEO team was spending most of their time on data engineering by hand: pulling data from various sources (Google Analytics, Shopify, etc., and site crawls using ScreamingFrog), then cleaning it and analysing it all in spreadsheets.

I created a python backend wrapping several web APIs to automate the data engineering process, including the PyGoogalytics library to pull data from Google Analytics, Search Console and Google Ads. These data are cleaned and streamed to a Big Query data warehouse with a schema I designed to standardise the data, and several views and procedures to make it easier to query key business metrics.

I also created a (*PostgreSQL*-based) job-queue system to manage asynchronous tasks, ensuring that data imports, analysis, and ML-assisted recommendations could be processed efficiently, and a user-friendly front-end in Looker Studio which I later migrated to Retool.

I then began adding ML features into the backend to provide actionable insights to the SEO team. This meant frequent consultation with the team to understand their processes and needs with continual feedback and deployment.

The system was successful in speeding up the SEO process by over 20× and the management team decided to market it as a SaaS product to other SEO agencies and, eventually, ecommerce businesses: Macaroni Software.

### Key achievements:
- I delivered Macaroni Software, allowing SEO teams to deliver [a year's-worth of work in a single month](https://www.linkedin.com/posts/sam-wright-17b6ab6_shopify-seo-activity-7170336529146441729-JGDn?utm_source=combined_share_message&utm_medium=member_desktop).
- I wrote the [PyGoogalytics](https://pypi.org/project/pygoogalytics/) open-source library to manage data ingestion from Google Analytics, Search Console and Google Ads, wrapping several API calls in one library and standardising the data (see [mention on LinkedIn](https://www.linkedin.com/posts/sam-wright-17b6ab6_github-blink-seopygoogalytics-activity-7234957676437274624-ipnf/)).
- I implemented several ML features to provide actionable recommendations for the SEO team, including: - Keyword clustering using *ScikitLearn* and *NLTK*, combined with quantitative data (clicks, impressions, etc.), to identify content gaps and opportunities. - LLM integration (*huggingface*) to generate ready-to-go suggestions for new content. - Automated site taxonomy suggestions using clustering and classification algorithms (*ScikitLearn*).
- Quantitative data are used for various visualisations in the app, powered by *Plotly*.
- Client onboarding, data imports, data analysis tasks and ML-assisted recommendations can be triggered in the app and run asynchronously in the backend using a (*PostgreSQL*-based) job-queue system which I wrote for this purpose.

### Other Responsibilities:
- Presenting to the team and stakeholders on the progress of Macaroni and the insights it has generated.
- Besides conceiving of and working on Macaroni, I also did frequent, one-off data tasks for the SEO delivery and management teams including data engineering, content generation, and providing analyses and visualisations for clients and investors.

### Technologies:
Python, SQL, Pandas, Machine Learning, NLP, ScikitLearn, NLTK, Huggingface, Plotly, Web Scraping, Looker, Retool, JavaScript, Unix, Linux, Bash, CGP Products, Compute Engine, Big Query, PostgreSQL, Docker, Git, Google Analytics, Google Search Console, Google Ads, Shopify API.

## Data Science Researcher

**National Physical Laboratory | Sep 2015 — Feb 2021 (5½ years)**

I was lucky enough to collaborate with Dr Valerie Livina at NPL during my doctoral research. This was an interesting opportunity to apply my mathematical and statistical knowledge in the research area of tipping points, with applications to geophysical systems. During my time at NPL I developed a new method for detecting tipping points in time series data, published three papers in respected journals, and presented at several international conferences.

My research was focused on the detection of tipping points in time series data, which are points at which the system undergoes a rapid change in behaviour. I developed the Power Spectrum Indicator method to provide early warning signals of tipping points, building on Dr Livina's previous work on the DFA Exponent indicator.

### Key achievements:

- Developed the Power Spectrum Indicator method for Early Warning Signals.
- Provided a mathematical explanation of the Power Spectrum Indicator's relationship to auto correlation and detrended fluctuation analysis.
- Published three papers in respected journals and presented at several international conferences.

### Other Responsibilities:

- As a Ph.D. student taking part in a collaboration with (and receiving funding from) a public research institution, I gave presentations on the progress of my research to stakeholders at NPL.

### Technologies & Skills:

Python, MatLab, R, Data Mining, LaTeX, Data Visualisation, Time Series Analysis.

## Associate Lecturer

**Sheffield Hallam University | Sep 2017 — Jul 2019 (2 years)**

At Sheffield Hallam University I taught a variety of Mathematics and Computer Science courses, dealing with planning, marking and delivering lectures. I also took on the role of "Maths Help" person, providing support to any struggling students by appointment or during drop-in sessions. This was interesting as I got to meet engineering students who were confused by Laplace transforms, business students who were struggling with basic algebra, and sports science students who needed help with statistics.

### Key points:
- Taught at all levels from Foundation Degree to Masters.
- Taught Maths and Computing courses.
- Taught in tutorials, lectures and drop-in sessions.
- Developed and marked coursework and exams.

## Informatics Developer

**UK Met Office | Jun — Aug 2017 (3 month internship)**

I was fortunate to have the time and opportunity, during my Ph.D. research, to take on a summer internship at the Met Office including a series of seminars, tours and workshops followed by an 8-week project. I chose to take on a project offered by the Met Office Informatics Lab that sought to quantify the viability of using amateur weather station data to improve the accuracy of the Met Office's weather forecasts. This was an individual project with guidance and support from the Informatics Lab team; progress was shared with the team and other interns at twice-weekly standups.

The Met Office relies on a network of professional weather stations to provide data for their weather models, complementing this with data from satellites and other sources. But there are hundreds of dedicated amateur meteorologists who have their own weather stations — some simple, some very sophisticated. The Met Office has a portal for these enthusiasts to upload their data but does not currently use it in their models.

After writing some scripts to access the amateur and official observations (the Informatics Lab was unable to obtain direct access for me in time, so I had to use the external APIs). I proceeded in two directions:

- Assessing the reliability and coverage of the amateur data.
- Comparing the amateur observations to official interpolated observations from the same time.

This lead to a huge number of possible questions and I wish I'd had more time to explore them all. I was able to identify a number of issues with the amateur data and show that it is not yet ready for use in the Met Office's weather models, and leave behind some suggestions for future work.

### Technologies & Skills:

Python, JavaScript, web APIs, Data Mining, time series analysis, data cleaning, data engineering.

## Trainee Teacher

**Bristol University | Sep 2013 — Apr 2014 (7 months)**

I briefly trained to be a secondary school Mathematics teacher, beginning a PGCE at Bristol University, due to my existing interest in mathematics education and outreach.

I mostly enjoyed teaching A-level, and probably spent too much time on coding projects (for educational purposes!) rather than the day-to-day teaching. I eventually decided to pursue a Ph.D. when the opportunity arose.

### Key points:
- Received the maximum £20,000 teaching scholarship from the [Institute of Mathematics and its Applications](https://www.ima.org.uk/) due to my outstanding undergraduate degree ([see my academic background](https://j.prettyman.me/education?open=ma-edinburgh)).
- I completed placements in state and private schools, from Year 7 to A-level.
- I wrote several pieces of software for educational purposes. (see [my projects page](https://j.prettyman.me/projects) for more details)

# Technologies and Skills

I work mainly in Python, utilising various packages for data mining, machine learning, visualisation, web-scraping, and most other things. I also have extensive experience working with SQL, JavaScript and a host of other technologies.

## Data Science

I've spent a lot of time working with <b>ScikitLearn</b>, <b>PyTorch</b> and <b>TensorFlow</b> for machine learning tasks, and using NLP for working with textual data.
- NLP using <b>NLTK</b>, and <b>DBSCAN</b> clustering on Search Console data to provide recommendations for primary keywords. This cut down a days-long spreadsheet-scrolling task to a few minutes.
- A combination of classification and clustering to recommend new category pages for D2C brands with a focus on optimising click-through rate and capturing niche keywords whilst reducing cannibalisation.
- <b>LLM</b> intergration (<b>Ollama</b>, <b>Huggingface</b>) to provide highly personalised recomendations for on-page copy. This allowed new pages to be launched in minutes rather than days.

## Data Engineering

I designed and implemented the <i>Blink SEO</i> data warehouse in <b>BigQuery</b>. This saved the team from the manual csv-export/excel-import repetative nightmare –freeing up countless hours– and provided consistent data for future dashboards, front-end dev, and ML methods.
- Wrote the <b>PyGoogalytics</b> package for data extraction from <b>Google Ads</b>, <b>GA4</b> and <b>Search Console</b> in a consistent format.
- Plus wrappers for other services such as <b>Shopify</b> (<b>GraphQL</b>) and <b>SemRush</b> (<b>REST</b>).
- <b>Python</b> scripts for cleaning data and loading into <b>BigQuery</b>.
- Dozens of table functions and views to aggregate data across different sources to easily query key business metrics.

## Software Development

I built the <i>Macaroni Software</i> backend in <b>Python</b> running on a <b>GCP Compute Engine</b> virtual machine. This connected to client data sources via APIs, handled Data Cleaning and ML tasks, integrated with <b>BigQuery</b> and communicated with the front-end.
- Set up <b>Slack</b> notifications from the backend system to alert devs (me) of tech problems and agency staff of clients' statuses.
- Created a job-queue system (<b>PostgreSQL</b>) for running back-end processes on demand and on schedules.
- Created a web-scraping process based on <b>Scrapy</b>.
- Set up <b>Python</b> scripts in <b>Google Cloud Functions</b> with API endpoints to onboard users into the system.

## Story Telling

Data is useless if it doesn't tell you anything. I've produced visualisations throughout my accademic career for posters, papers and presentations. More recently I've created interactive dashboards to communicate KPIs, and as playgrounds allowing users to explore data in meaninful ways.
- Visualisations created with <b>Matplotlib</b> and <b>Plotly</b>: from academic papers to investor reports.
- <b>Looker Studio</b> dashboards as prototypes for quick feedback and integration.
- I created the <i>Macaroni Software</i> frontend in <b>Retool</b> (<b>JavaScript</b>) incorporating multiple dashboards:
	- Client-facing dashboards to replace time-consuming monthly PDF reports, saving hours per client per month,
	- Agency-facing dashboards for data exploration and the ability to implement business descisions with a click, dramatically increasing productivity.

# Academic Background

At Edinburgh I studied Pure Mathematics but switched to more applied mathematics at the *Mathematics of Planet Earth* Centre for Doctoral Training. My Masters taught courses covered Probability, Statistics, Computational Mathematics, and Dynamical Systems. My Ph.D. focused on the application of dynamical systems theory to the study of tipping points in geophysical systems. You can find a pdf-format CV [here](https://j.prettyman.me/documents/JPrettymanCV.pdf).

## Ph.D. Mathematics

**University of Reading**

My Ph.D. research focussed on detecting (or rather, predicting) tipping points in dynamical systems using time series data. I was funded by [EPSRC](https://www.epsrc.ac.uk) and was able to publish three papers in respected journals and to present my work at a number of international conferences and workshops.

I built on the work of Dr. Valerie Livina to develop a novel method: the use of the *power spectrum scaling exponent* as an indicator of critical slowing down, which I showed to be related to the existing ACF(1) and DFA indicators. I also applied the method to a range of geophysical datasets, notably changes in sea-level pressure as a precursor to tropical cyclones.

I created stochastic models of dynamical systems and implemented Early Warning Signal algorithms using Matlab and Python. I also used Python to process and analyse geophysical datasets, and to access data from external APIs.

### Supervisors:
- Dr. Valerie Livina (National Physical Laboratory)
- Prof. Tobias Kuna (University of Reading)

### Key Points:
- Industrial partnership with the [National Physical Laboratory](https://www.npl.co.uk).
- EPSRC funded as part of the [Mathematics of Planet Earth CDT](https://mpecdt.ac.uk/cohort-2014/).
- Publication of three papers in respected journals (see publications below).
- Participation in several international conferences and workshops.
- Third year research attracted additional funding from [NCEO](https://www.nceo.ac.uk) (a NERC centre).
- A ten-week internship at the UK Met Office (see [prof. exp.](https://j.prettyman.me/professional?open=met-office) for more details).
- Participated in Oxford University Mathematical Modelling workshop.
- Attendance at a number of personal and professional development courses.

### Technologies & Skills:
Python, MatLab, R, LaTeX, XMGrace, Plotly, Matplotlib, web APIs, Academic Writing, Poster Design, Presentations, Public Speaking, Software Development, Scientific Computing, Data Mining, Time Series Analysis, Dynamical Systems.

## MRes. Mathematics

**Imperial College London** (Distinction)

This Masters course involved applied mathematics taught course including: *Probability*, *Statistics*, *Stochastic PDEs*, *Dynamical Systems* and *Scientific Computing With Python*.

As part of the [Mathematics of Planet Earth CDT](https://mpecdt.ac.uk/cohort-2014/) I attended weekly workshops and seminars led by experts in the field, as well as taking part in weekly group meetings to discuss the latest research in the field, and weekly soft-skills sessions.

In the second half of the course I was supervised by Dr. Hilary Weller for a dissertation project which developed a method for generating an adaptive mesh for PDE solvers. This numerical method was built on Dr. Weller's previous work and implemented in C++.

Left: A mesh generated to be uniformally spaced with respect to the ring-shaped monitor function (heat map). Right: The solutions of the Monge-Ampere equation used to generate the mesh.

### Key Points:

- EPSRC funded as part of the [Mathematics of Planet Earth CDT](https://mpecdt.ac.uk/cohort-2014/).
- Participation in conferences and workshops.
- Attendance at a number of personal and professional development courses.

### Technologies & Skills:

C++, Python, MatLab, LaTeX, XMGrace, Plotly, Matplotlib,
        Academic Writing, Poster Design, Presentations, Public Speaking,
        Scientific Computing, Dynamical Systems, PDEs, Numerical Methods.

## MA Mathematics

**University of Edinburgh** (First Class Honours)

During my Undergraduate MA at the University of Edinburgh, I focused on pure mathematics, with modules including: *Groups and Rings*, *Algebraic Number Theory*, *Algebraic Geometry* and *Algebraic Topology*. My dissertation project explored the properties of directed graphs and their relation to non-commutative algebras. The software I wrote for this project ([Digraph Explorer](https://j.prettyman.me/projects/digraph-explorer)) was used as a teaching resource, for which I received a letter of thanks from the Principal.

Throughout my degree I was dedicated to Maths Outreach and volunteered at public events and at local schools. I even gave my own series of seminars on probability to "gifted and talented" school students. I was also a member of Edinburgh Maths Jam and took modules in Maths Education in my final year.

### Key Points:

- Software written for a dissertation project ([Digraph Explorer](https://j.prettyman.me/projects/digraph-explorer)) used as a teaching resource.
- Received a letter of thanks from the Principal.
- Participated in Maths Outreach events and led seminars.
- Pure Mathematics focus.

### Technologies & Skills:

MatLab, LaTeX, Academic Writing, Presentations, Public Speaking, 
        Teaching, Outreach,
        Graph Theory, Algebraic Topology, Algebraic Geometry, Number Theory.

