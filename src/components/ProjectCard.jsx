import React, { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'

const ProjectCard = ({ 
    title,
    description,
    link,
    date = null,
    tags = null,
    image,
    transparent = false
}) => {
    return (
        <div className="bg-blue-50 dark:bg-gray-600 shadow rounded-lg p-4 flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center mb-4">
                    {/* Logo */}
                    <div className="w-20 h-20 flex-shrink-0 mr-4">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black font-bold hover:underline"
                        >
                            <img 
                                src={image} 
                                alt={title}
                                className={`w-full h-full bg-white ${transparent ? '' : 'object-contain rounded-lg shadow-md'}`} 
                            />
                        </a>
                    </div>
                    <div>
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black font-bold hover:underline"
                        >
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {title}
                        </h2>
                        </a>
                        { date && (
                            <div className="flex items-center text-gray-700 dark:text-white mb-2">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="text-sm">{date}</span>
                            </div>
                        )}
                    </div>
                </div>
                {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    
                        <p className="text-gray-800 dark:text-white italic mb-2">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ProjectCard