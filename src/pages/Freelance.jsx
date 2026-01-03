import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock';
import { Mail, CheckCircle, Database, Brain, BarChart3, Code, Calendar, LayoutDashboard } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const services = [
  {
    icon: Brain,
    title: "Machine Learning & NLP",
    description: "Custom ML models, NLP pipelines, OpenAI/LLM integrations, and predictive analytics that turn your data into actionable insights."
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "ETL/ELT pipelines, database architecture (AWS, GCP, BigQuery), and automation with dbt and Databricks."
  },
  {
    icon: BarChart3,
    title: "Dashboards & Visualisation",
    description: "Interactive dashboards in Tableau, Plotly, or Retool that make complex data accessible to stakeholders."
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Python backends, REST/GraphQL APIs, cloud deployment (GCP, AWS), and production-ready systems."
  }
];

const highlights = [
  "Built an ML platform that increased team productivity by 20×",
  "10+ years of Python experience across data science and software engineering",
  "Expertise in cloud infrastructure on AWS and GCP",
  "Engineered a SaaS product from scratch including database architecture and ML models.",
  "PhD in Mathematics with a track record of solving complex technical problems",
  "Experience processing 50M+ data points daily in production systems"
];

const Freelance = () => {
  return (
    <Layout>
      <ContentBlock title="Freelance Data & Development Services" icon={LayoutDashboard}>

        {/* Intro pitch */}
        <div className="space-y-4 mb-8 text-gray-600 dark:text-white">
          <p className="text-lg">
            I'm a Data Scientist and Python Developer with a PhD in Mathematics. I build production ML systems, data pipelines, and full-stack applications that solve real business problems.
          </p>
          <p className="text-lg">
            Whether you need a machine learning model deployed, a data pipeline automated, or a dashboard that actually gets used, I can help.
          </p>

        </div>

        {/* Contact */}
        <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">Contact</h2>
          <p className="text-gray-600 dark:text-white mb-4">
            Happy New Year! I have availability for 2026. If you have a project in mind, please reach out.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="mailto:joshua@prettyman.me"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Mail size={20} />
              <span>Email me</span>
            </a>
            <a
              href="https://cal.com/drprettyman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Calendar size={20} />
              <span>Book a call</span>
            </a>
            <a
              href="https://www.linkedin.com/in/prettyman/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006396] text-white rounded-lg transition-colors"
            >
              <FaLinkedin size={20} />
              <span>Connect</span>
            </a>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">Why Work With Me</h2>
          <ul className="space-y-2 text-gray-600 dark:text-white">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">Services</h2>
          <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-200/70 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <service.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-600 dark:text-white">{service.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-white">{service.description}</p>
            </div>
          ))}
          </div>
        </div>

        {/* Recent work */}
        <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">Recent Projects</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-white">
            <li>Model deployment to production cloud environments</li>
            <li>Dashboard creation with Tableau for executive reporting</li>
            <li>Pipeline automation using dbt and Databricks</li>
            <li>Database setup and architecture on AWS</li>
            <li>Data engineering and analysis for business insights</li>
          </ul>
        </div>

        

      </ContentBlock>
    </Layout>
  )
}

export default Freelance
