import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const NotFound = () => (
  <Layout>
    <SEO title="404 — Page Not Found" description="This page does not exist." />
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Page not found.</p>
      <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">Go home</Link>
    </div>
  </Layout>
)

export default NotFound
