import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

const BlogPost = ({ post, isPreview = false }) => {
  const { id, title, date, excerpt, content, coverImage, tags } = post

  return (
    <div className="bg-blue-50 shadow rounded-lg overflow-hidden">
      {coverImage && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPreview ? (
            <Link to={`/blog/${id}`} className="hover:text-blue-600 transition-colors">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">{date}</span>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
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
        
        {isPreview ? (
          <>
            <p className="text-gray-700 mb-4">{excerpt}</p>
            <Link 
              to={`/blog/${id}`} 
              className="text-blue-600 hover:text-blue-800 font-semibold inline-block"
            >
              Read more →
            </Link>
          </>
        ) : (
          <div className="prose max-w-none text-gray-700">
            {content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPost 