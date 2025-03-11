import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'
import { ArrowLeft, Calendar, User } from 'lucide-react'

const BlogPostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        
        // In production, this would be a real API call
        // For now, we'll simulate with dummy data
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // This would normally be: const response = await fetch(`/api/blog/${id}`)
        const dummyPosts = [
          {
            id: 'getting-started-with-react',
            title: 'Getting Started with React',
            date: 'June 15, 2023',
            excerpt: 'React is a popular JavaScript library for building user interfaces. In this post, we\'ll explore the basics of React and how to get started.',
            content: 'React is a popular JavaScript library for building user interfaces. Developed by Facebook, it\'s now used by countless developers around the world.\n\nTo get started with React, you\'ll need a basic understanding of JavaScript, HTML, and CSS. React allows you to create reusable UI components that efficiently update when your data changes.\n\nOne of the core concepts in React is the virtual DOM. Instead of directly manipulating the browser\'s DOM, React creates a virtual representation of it in memory and only updates the actual DOM when necessary, which improves performance significantly.\n\nTo create a new React project, you can use Create React App, a command-line tool that sets up a new React project with a good default configuration. Just run:\n\n`npx create-react-app my-app`\n\nThis will create a new React project in a directory called "my-app". After navigating to that directory, you can start the development server with:\n\n`npm start`\n\nAnd that\'s it! You\'re now ready to start building your React application.',
            coverImage: '/images/blog/react.png',
            tags: ['react', 'javascript', 'frontend'],
            author: 'Joshua Prettyman'
          },
          {
            id: 'tailwind-css-intro',
            title: 'Introduction to Tailwind CSS',
            date: 'July 22, 2023',
            excerpt: 'Tailwind CSS is a utility-first CSS framework that speeds up your development process. Learn how to use it in your projects.',
            content: 'Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.\n\nUnlike other CSS frameworks like Bootstrap or Bulma, Tailwind doesn\'t provide pre-designed components. Instead, it gives you low-level utility classes that let you build completely custom designs without ever leaving your HTML.\n\nTo install Tailwind CSS, you can use npm:\n\n`npm install tailwindcss`\n\nThen, you\'ll need to create a configuration file:\n\n`npx tailwindcss init`\n\nAfter setting up your configuration, you\'ll need to include Tailwind in your CSS:\n\n```css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n```\n\nTailwind\'s utility classes make it incredibly easy to create responsive designs. For example, to make an element that\'s full-width on mobile but half-width on larger screens, you can use:\n\n`<div class="w-full md:w-1/2">Content</div>`\n\nThe `md:` prefix means "apply this class at the medium breakpoint and above."',
            coverImage: '/images/blog/tailwind.png',
            tags: ['tailwind', 'css', 'frontend'],
            author: 'Joshua Prettyman'
          },
          {
            id: 'data-visualization-react',
            title: 'Data Visualization in React with Recharts',
            date: 'August 10, 2023',
            excerpt: 'Learn how to create beautiful charts and graphs in your React applications using the Recharts library.',
            content: 'Data visualization is a powerful way to communicate complex information clearly and efficiently. In React applications, one of the best libraries for creating charts is Recharts.\n\nRecharts is a redefined chart library built with React and D3. It provides a collection of React components for different chart types, making it easy to integrate into your React projects.\n\nTo install Recharts, run:\n\n`npm install recharts`\n\nLet\'s create a simple bar chart as an example:\n\n```jsx\nimport { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from \'recharts\';\n\nconst data = [\n  { name: \'Jan\', value: 400 },\n  { name: \'Feb\', value: 300 },\n  { name: \'Mar\', value: 600 },\n  { name: \'Apr\', value: 800 },\n  { name: \'May\', value: 500 },\n];\n\nfunction MyChart() {\n  return (\n    <BarChart width={600} height={300} data={data}>\n      <CartesianGrid strokeDasharray="3 3" />\n      <XAxis dataKey="name" />\n      <YAxis />\n      <Tooltip />\n      <Legend />\n      <Bar dataKey="value" fill="#8884d8" />\n    </BarChart>\n  );\n}\n```\n\nRecharts is highly customizable and supports many chart types including line charts, area charts, pie charts, and more. It\'s also responsive and works well with Tailwind CSS and other styling frameworks.',
            coverImage: '/images/blog/data-viz.png',
            tags: ['react', 'data-visualization', 'recharts'],
            author: 'Joshua Prettyman'
          }
        ]
        
        const foundPost = dummyPosts.find(p => p.id === id)
        
        if (foundPost) {
          setPost(foundPost)
        } else {
          setError('Post not found')
        }
      } catch (error) {
        console.error('Error fetching blog post:', error)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [id])
  
  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse bg-gray-100 h-96 rounded-lg"></div>
        </div>
      </Layout>
    )
  }
  
  if (error || !post) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>{error || 'Post not found'}</p>
            <button 
              onClick={() => navigate('/blog')}
              className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link 
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all posts
          </Link>
        </div>
        
        <article className="bg-gray-100/75 rounded-lg overflow-hidden">
          {post.coverImage && (
            <div className="w-full h-64 sm:h-80 overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              {post.author && (
                <div className="flex items-center mr-6 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  <span className="text-sm">{post.author}</span>
                </div>
              )}
              
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">{post.date}</span>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/blog/tag/${tag}`}
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="prose max-w-none text-gray-800">
              {post.content.split('\n\n').map((paragraph, idx) => {
                // Check if paragraph is a code block
                if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                  const code = paragraph.slice(3, -3)
                  return (
                    <pre key={idx} className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  )
                }
                
                // Check if paragraph is an inline code
                if (paragraph.startsWith('`') && paragraph.endsWith('`')) {
                  const code = paragraph.slice(1, -1)
                  return (
                    <code key={idx} className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded">
                      {code}
                    </code>
                  )
                }
                
                // Regular paragraph
                return <p key={idx} className="mb-4">{paragraph}</p>
              })}
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default BlogPostPage 