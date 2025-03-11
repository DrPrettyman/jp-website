import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import BlogPost from '../components/BlogPost'
import { Search, BookOpen } from 'lucide-react'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { tag } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use a dummy data array
    const fetchPosts = async () => {
      try {
        // In production, replace with actual API call:
        // const response = await fetch('/api/blog-posts')
        // const data = await response.json()
        
        const data = [
          {
            id: 'getting-started-with-react',
            title: 'Getting Started with React',
            date: 'June 15, 2023',
            excerpt: 'React is a popular JavaScript library for building user interfaces. In this post, we\'ll explore the basics of React and how to get started.',
            content: 'React is a popular JavaScript library for building user interfaces. Developed by Facebook, it\'s now used by countless developers around the world.\n\nTo get started with React, you\'ll need a basic understanding of JavaScript, HTML, and CSS. React allows you to create reusable UI components that efficiently update when your data changes.\n\nOne of the core concepts in React is the virtual DOM. Instead of directly manipulating the browser\'s DOM, React creates a virtual representation of it in memory and only updates the actual DOM when necessary, which improves performance significantly.\n\nTo create a new React project, you can use Create React App, a command-line tool that sets up a new React project with a good default configuration. Just run:\n\n`npx create-react-app my-app`\n\nThis will create a new React project in a directory called "my-app". After navigating to that directory, you can start the development server with:\n\n`npm start`\n\nAnd that\'s it! You\'re now ready to start building your React application.',
            coverImage: '/images/blog/react.png',
            tags: ['react', 'javascript', 'frontend']
          },
          {
            id: 'tailwind-css-intro',
            title: 'Introduction to Tailwind CSS',
            date: 'July 22, 2023',
            excerpt: 'Tailwind CSS is a utility-first CSS framework that speeds up your development process. Learn how to use it in your projects.',
            content: 'Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.\n\nUnlike other CSS frameworks like Bootstrap or Bulma, Tailwind doesn\'t provide pre-designed components. Instead, it gives you low-level utility classes that let you build completely custom designs without ever leaving your HTML.\n\nTo install Tailwind CSS, you can use npm:\n\n`npm install tailwindcss`\n\nThen, you\'ll need to create a configuration file:\n\n`npx tailwindcss init`\n\nAfter setting up your configuration, you\'ll need to include Tailwind in your CSS:\n\n```css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n```\n\nTailwind\'s utility classes make it incredibly easy to create responsive designs. For example, to make an element that\'s full-width on mobile but half-width on larger screens, you can use:\n\n`<div class="w-full md:w-1/2">Content</div>`\n\nThe `md:` prefix means "apply this class at the medium breakpoint and above."',
            coverImage: '/images/blog/tailwind.png',
            tags: ['tailwind', 'css', 'frontend']
          },
          {
            id: 'data-visualization-react',
            title: 'Data Visualization in React with Recharts',
            date: 'August 10, 2023',
            excerpt: 'Learn how to create beautiful charts and graphs in your React applications using the Recharts library.',
            content: 'Data visualization is a powerful way to communicate complex information clearly and efficiently. In React applications, one of the best libraries for creating charts is Recharts.\n\nRecharts is a redefined chart library built with React and D3. It provides a collection of React components for different chart types, making it easy to integrate into your React projects.\n\nTo install Recharts, run:\n\n`npm install recharts`\n\nLet\'s create a simple bar chart as an example:\n\n```jsx\nimport { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from \'recharts\';\n\nconst data = [\n  { name: \'Jan\', value: 400 },\n  { name: \'Feb\', value: 300 },\n  { name: \'Mar\', value: 600 },\n  { name: \'Apr\', value: 800 },\n  { name: \'May\', value: 500 },\n];\n\nfunction MyChart() {\n  return (\n    <BarChart width={600} height={300} data={data}>\n      <CartesianGrid strokeDasharray="3 3" />\n      <XAxis dataKey="name" />\n      <YAxis />\n      <Tooltip />\n      <Legend />\n      <Bar dataKey="value" fill="#8884d8" />\n    </BarChart>\n  );\n}\n```\n\nRecharts is highly customizable and supports many chart types including line charts, area charts, pie charts, and more. It\'s also responsive and works well with Tailwind CSS and other styling frameworks.',
            coverImage: '/images/blog/data-viz.png',
            tags: ['react', 'data-visualization', 'recharts']
          }
        ]
        
        setPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }
    
    fetchPosts()
  }, [])
  
  useEffect(() => {
    if (tag) {
      setFilteredPosts(posts.filter(post => post.tags.includes(tag)))
    } else if (searchTerm) {
      setFilteredPosts(posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      ))
    } else {
      setFilteredPosts(posts)
    }
  }, [posts, tag, searchTerm])
  
  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/blog')
    // Search is handled by the effect above
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 rounded-lg px-8 py-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-gray-700 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">
                {tag ? `Blog Posts Tagged #${tag}` : 'Blog'}
              </h1>
            </div>
            
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>
          
          {tag && (
            <div className="mb-6">
              <button 
                onClick={() => navigate('/blog')}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                ← Back to all posts
              </button>
            </div>
          )}
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No posts found</h2>
              <p className="text-gray-600">
                {searchTerm ? `No posts match your search for "${searchTerm}"` : 
                 tag ? `No posts with the tag #${tag}` : 'There are no blog posts yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <BlogPost key={post.id} post={post} isPreview={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Blog 