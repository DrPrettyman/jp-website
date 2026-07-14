import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { ChefHat } from 'lucide-react';

export const meta = () => generateMeta({ title: "Macalytics", description: "An SEO software platform built from scratch, automating data pipelines and adding ML-powered features for an SEO agency.", path: "/projects/macaroni" });

const MacaroniProject = () => {
  return (
    <Layout>
      <ContentBlock title="Macalytics" icon={ChefHat} maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">From Spreadsheets to SaaS</h2>

            <p className="mb-4 text-justify">
              I joined Blink SEO as the only technical team member, with the brief: "use data to improve our processes."
              When I arrived, the SEO team was spending most of their time on manual data engineering. They'd pull
              data from Google Analytics, Shopify, Search Console, and site crawls, then clean and analyse it all
              in spreadsheets. Rinse and repeat for every client, every month.
            </p>

            <p className="mb-4 text-justify">
              I built a Python backend to automate the ingestion pipeline, wrapping several web APIs and streaming
              the cleaned data into a BigQuery warehouse with a schema designed around SEO workflows. Views and
              stored procedures made it easy to query key metrics without writing SQL from scratch each time.
            </p>

            <p className="mb-4 text-justify">
              Once the data engineering was automated, I started adding ML features: keyword clustering to identify
              content gaps, classification algorithms to suggest site taxonomy improvements, and eventually LLM
              integrations to generate draft content. The frontend evolved from Looker Studio dashboards to a
              custom Retool app with interactive Plotly visualisations.
            </p>

            <p className="mb-8 text-justify">
              The result was a <strong>20x productivity increase</strong>. Campaigns that used to take a year
              could now be <a href="https://www.linkedin.com/posts/sam-wright-17b6ab6_shopify-seo-activity-7170336529146441729-JGDn" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">delivered in weeks</a>.
              Management saw the potential and decided to spin out Macalytics as a SaaS product, generating funding for a new startup: Macaroni Software.
            </p>

            <h2 className="text-2xl mb-4 font-bold">The Stack</h2>

            <p className="mb-4 text-justify">
              The system ran on GCP Compute Engine, processing 50M+ data points daily from external APIs. I wrote
              the <a href="https://pypi.org/project/pygoogalytics/" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">PyGoogalytics</a> library
              to standardise data ingestion from Google Analytics, Search Console, and Google Ads. Client onboarding,
              data imports, and ML tasks ran asynchronously via <a href="/projects/jobmaster" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">JobMaster</a>,
              the PostgreSQL-based job queue I built for this purpose.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Layer</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Technologies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data ingestion</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Python, PyGoogalytics, Shopify GraphQL API, web scraping</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Storage</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">BigQuery (warehouse), PostgreSQL (job queue)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ML / NLP</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ScikitLearn, NLTK, Huggingface</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Frontend</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Retool, Plotly (JavaScript), Looker Studio</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Infrastructure</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">GCP Compute Engine, Docker, Git</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl mb-4 font-bold">ML Features</h2>

            <p className="mb-4 text-justify">
              The ML components were built through constant iteration with the SEO team. I'd sit with them, watch
              how they worked, and figure out where automation could help most.
            </p>

            <ul className="list-disc list-inside mb-8 space-y-2">
              <li>
                <strong>Keyword clustering:</strong> Combined NLP-based semantic similarity with quantitative
                metrics (clicks, impressions, rankings) to group thousands of keywords into actionable topics.
                Work that took days now finished in minutes.
              </li>
              <li>
                <strong>Content gap analysis:</strong> Cross-referenced clustered keywords against existing
                site content to surface opportunities the team would have missed manually.
              </li>
              <li>
                <strong>Taxonomy suggestions:</strong> Classification algorithms proposed site structure
                improvements based on how keywords naturally grouped together.
              </li>
              <li>
                <strong>LLM content generation:</strong> Integrated Huggingface models to draft content
                suggestions, refined in consultation with Blink's copywriters.
              </li>
            </ul>

            <h2 className="text-2xl mb-4 font-bold">Scaling Up</h2>

            <p className="mb-4 text-justify">
              When Macalytics became a product, we hired a data engineer, frontend developer, and product manager.
              I onboarded the new team and handed over parts of the codebase, freeing up time to focus on the
              ML features. We narrowed the product scope to Shopify stores, which let us integrate directly
              with the Shopify GraphQL API for better data quality and real-time catalogue updates.
            </p>

            <p className="mb-4 text-justify">
              I stayed involved with the Blink SEO delivery team throughout, running ad-hoc analyses and building
              visualisations for client presentations and investor meetings.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Full-stack ML platform built from scratch over 3 years</li>
                <li>20x productivity improvement for SEO workflows</li>
                <li>50M+ data points processed daily</li>
                <li>Spun out as SaaS product (Macaroni Software)</li>
                <li>Open-sourced <a href="https://pypi.org/project/pygoogalytics/" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">PyGoogalytics</a> library</li>
              </ul>
            </div>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default MacaroniProject
