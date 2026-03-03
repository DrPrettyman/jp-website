import React from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import ContentBlock from '../../components/ContentBlock';
import { Workflow } from 'lucide-react';

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

const JobMasterProject = () => {
  return (
    <Layout>
      <SEO title="JobMaster" description="A Python job queue framework for triggering and tracking long-running tasks from a web frontend." path="/projects/jobmaster" />
      <ContentBlock title="JobMaster" icon={Workflow} githubUrl="https://github.com/DrPrettyman/jobmaster" maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">The Problem</h2>

            <p className="mb-4 text-justify">
              While building <em>Macaroni</em> at Blink SEO, we needed a way to trigger long-running Python tasks from
              our Retool frontend. Click a button in the web app, and somewhere a Python script starts processing data.
              But the existing solutions were either overkill (Celery with Redis/RabbitMQ) or too limited for our needs.
            </p>

            <p className="mb-4 text-justify">
              We already had PostgreSQL as our database, so I wondered: could the database itself serve as the job queue?
              The answer was JobMaster: a lightweight job-queue system that uses PostgreSQL for persistence and coordination,
              with a decorator to turn any function into a queueable task:
            </p>

            <CodeBlock title="Basic task definition">
{`from jobmaster import task

@task
def generate_report(client_id: int, month: str, format: str = 'pdf'):
    """Generate a monthly report for a client."""
    # Your business logic here
    report = create_report(client_id, month)
    export_report(report, format)
    return f"Report generated: {client_id}_{month}.{format}"`}
            </CodeBlock>

            <p className="mb-8 text-justify">
              That's it. Add the decorator, and the function becomes a queueable task. JobMaster inspects the signature
              to register parameters and their types, which are validated when jobs are inserted.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Architecture</h2>

            <p className="mb-4 text-justify">
              It turns out we didn't need a separate message broker. PostgreSQL's transactional guarantees
              and row-level locking are perfect for job coordination. Add some stored procedures for atomic job insertion
              and retrieval, and you have a robust queue without the operational complexity of managing additional infrastructure.
            </p>

            <p className="mb-4 text-justify">
              JobMaster has three main components: the <strong>database schema</strong> (tables and stored procedures),
              the <strong>task decorator</strong> (which registers Python functions as tasks), and the <strong>JobMaster
              class</strong> (which coordinates job execution).
            </p>

            <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                <strong>Terminology:</strong> A <em>task</em> is a registered function definition (like a class).
                A <em>job</em> is a specific invocation of that task with arguments (like an instance).
              </p>
            </div>

            <p className="mb-4 text-justify">
              Your web application calls a stored procedure to insert a job into the queue.
              Separately, a Python worker process polls the queue, pops jobs, and executes them. The database handles
              all the coordination, so no race conditions or lost jobs.
            </p>

            <CodeBlock title="Inserting a job from your web app">
{`-- Call this from Retool, your API, or anywhere with DB access
CALL jobmaster.insert_job(
    'reports',           -- type_key (module name)
    'generate_monthly',  -- task_key (function name)
    10,                  -- priority (higher = sooner)
    '{"client_id": 42, "month": "2024-01"}'::json
);`}
            </CodeBlock>

            <h2 className="text-2xl mb-4 font-bold">Advanced Task Options</h2>

            <p className="mb-4 text-justify">
              JobMaster uses type hints to validate arguments and generate the database schema. If someone tries to insert a job with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">client_id="abc"</code>,
              it will be rejected.
            </p>

            <h3 className="text-xl mb-3 font-semibold">Select-From Parameters</h3>

            <p className="mb-4 text-justify">
              For parameters with a fixed set of valid values, you can specify them directly in the type hint.
              This creates an enum-like constraint enforced at the database level:
            </p>

            <CodeBlock title="Constrained parameter values">
{`@task
def export_data(client_id: int, format: ['csv', 'json', 'parquet']):
    """Export client data in the specified format."""
    # format is guaranteed to be one of: 'csv', 'json', 'parquet'
    ...`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Write-All Parameters</h3>

            <p className="mb-4 text-justify">
              Sometimes you want to run a task for <em>all</em> valid values of a parameter, like exporting data in
              every format at once. The <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">write_all</code> option
              enables this:
            </p>

            <CodeBlock title="Batch job insertion">
{`@task(write_all=['format'])
def export_data(client_id: int, format: ['csv', 'json', 'parquet']):
    ...

# Then insert with 'ALL' to create three separate jobs:
# CALL jobmaster.insert_job('exports', 'export_data', 10,
#      '{"client_id": 42, "format": "ALL"}'::json)
#
# This creates jobs for: csv, json, and parquet`}
            </CodeBlock>

            <h2 className="text-2xl mb-4 font-bold">Task Dependencies</h2>

            <p className="mb-4 text-justify">
              Real-world workflows often have dependencies: you can't send a report until it's generated, and you can't
              generate it until the data is refreshed. JobMaster handles this with the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Dependency</code> class:
            </p>

            <CodeBlock title="Defining task dependencies">
{`from jobmaster import task, Dependency, same

@task
def refresh_data(client_id: int):
    """Pull latest data from APIs."""
    ...

@task
def generate_report(client_id: int, month: str):
    """Generate report from refreshed data."""
    ...

@task(
    dependencies=Dependency(
        generate_report,  # This task must complete first
        hours=2,          # Within the last 2 hours
        client_id=same    # With the same client_id
    )
)
def send_report(client_id: int, email: str):
    """Send the generated report via email."""
    ...`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              The <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">same</code> keyword
              means "use the same value as this job." When JobMaster pops a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">send_report</code> job
              from the queue, it checks if <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">generate_report</code> has
              completed for that client in the last 2 hours. If not, it automatically inserts the dependency job and re-queues
              the original.
            </p>

            <p className="mb-8 text-justify">
              This creates a self-healing workflow: you can just insert the final job you want, and JobMaster will
              work backwards to ensure all prerequisites are satisfied.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Resource Management</h2>

            <p className="mb-4 text-justify">
              Not all tasks are equal. Some are lightweight API calls; others load gigabytes of data into memory.
              JobMaster uses "process units" to prevent resource exhaustion:
            </p>

            <CodeBlock title="Resource-aware task definition">
{`# Configure total available resources (e.g., MB of RAM)
jobmaster = JobMaster(
    db_engine=engine,
    system_process_units=8000  # 8GB available
)

@task(process_units=100)  # Light task: 100MB
def quick_check(client_id: int):
    ...

@task(process_units=2000)  # Heavy task: 2GB
def full_data_refresh(client_id: int):
    ...`}
            </CodeBlock>

            <p className="mb-8 text-justify">
              When popping jobs, JobMaster sums the process units of all currently running jobs and only picks up
              new jobs that fit within the remaining capacity. This prevents the common problem of multiple heavy
              jobs starting simultaneously and crashing the worker.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Database Schema</h2>

            <p className="mb-4 text-justify">
              Running <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jobmaster.deploy()</code> creates
              a dedicated schema with tables for tasks, parameters, and jobs. The key tables are:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Table</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">task_types</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Module-level groupings (type_key)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">tasks</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Registered task definitions</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">task_params</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Parameter definitions with types and constraints</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">jobs</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Job queue with status, priority, arguments</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-8 text-justify">
              Jobs move through statuses: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">waiting</code> →
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">running</code> →
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">complete</code> (or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">failed</code>).
              The stored procedures use row-level locking to ensure exactly-once execution, even with multiple workers.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Running the Worker</h2>

            <p className="mb-4 text-justify">
              The worker script just needs to import your tasks (to register them) and call <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">jobmaster.run()</code>:
            </p>

            <CodeBlock title="Worker script">
{`# worker.py
import sqlalchemy
from jobmaster import JobMaster

# Import all modules containing @task decorators
from myapp import reports, exports, notifications

# Create engine and JobMaster instance
engine = sqlalchemy.create_engine("postgresql+pg8000://...")
jobmaster = JobMaster(db_engine=engine)

# Run until queue is empty
if __name__ == '__main__':
    jobs_run = jobmaster.run()
    print(f"Completed {jobs_run} jobs")`}
            </CodeBlock>

            <p className="mb-8 text-justify">
              In production, we ran this on a cron every few minutes. For near-real-time processing, you could run
              it in a loop with a short sleep between iterations. The database handles all the coordination, so
              you can safely run multiple workers in parallel.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>PostgreSQL-backed job queue (no Redis or RabbitMQ needed)</li>
                <li>Simple <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">@task</code> decorator with automatic parameter validation</li>
                <li>Declarative task dependencies with automatic prerequisite execution</li>
                <li>Resource management via process units</li>
                <li>Batch job insertion with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">write_all</code></li>
                <li>Published to <a href="https://pypi.org/project/jobmaster/" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">PyPI</a></li>
              </ul>
            </div>

            <h2 className="text-2xl mt-8 mb-4 font-bold">Takeaways</h2>

            <p className="mb-4 text-justify">
              JobMaster solved our specific problem at Blink SEO: bridging the gap between a low-code frontend
              and Python data processing. Using PostgreSQL as the message broker meant one fewer system to maintain, and we got
              transactional guarantees for free.
            </p>

            <p className="mb-4 text-justify">
              The dependency system was probably the most valuable feature in practice. Instead of carefully
              orchestrating job sequences, we could just define "this task needs that task to have run recently"
              and let JobMaster figure out the execution order.
            </p>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default JobMasterProject
