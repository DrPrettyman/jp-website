import React, { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import PublicationModal from './PublicationModal'
import { Calendar } from 'lucide-react'
// Import all txt files from the publications directory
const publications = import.meta.glob('../assets/publications/*.txt');

const Publication = ({ 
    title,
    date,
    journal,
    link,
    logo,
    authors,
    abstract,
    transparent = false,
    'data-entry-id': entryId
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReadMoreClick = () => {
        console.log("Read More clicked");
        setIsModalOpen(true);
        console.log("Modal state:", isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-blue-50 dark:bg-gray-600 shadow rounded-lg p-4 flex flex-col justify-between h-full" data-entry-id={entryId}>
            <div>
                <div className="flex items-center mb-2">
                    {/* Logo */}
                    <div className="w-20 h-20 flex-shrink-0 dark:bg-gray-100 dark:rounded-lg mr-4 flex items-center justify-center">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black dark:text-white font-bold hover:underline w-full h-full flex items-center justify-center"
                            >
                                <img 
                                    src={logo} 
                                    alt={`${journal} Logo`} 
                                    className={`w-[90%] h-[90%] ${transparent ? '' : 'object-contain rounded-lg shadow-md'}`} 
                                />
                            </a>
                    </div>
                    <div>
                        <div className="flex items-center text-gray-900 dark:text-white mb-1">
                            <a 
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-bold hover:underline">
                                {journal}
                            </a>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-white mb-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">{date}</span>
                        </div>
                    </div>
                </div>
                <p className="text-gray-800 dark:text-white italic mb-2">
                    {title}
                </p>
            </div>
            
            <div className="flex justify-center">
                <button onClick={handleReadMoreClick} className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500 font-semibold">
                    Read Abstract
                </button>
            </div>

            {isModalOpen && (
                <PublicationModal 
                    onClose={handleCloseModal}
                    header={{ logo, journal, title, date, link, authors }}
                    transparent={transparent}
                >
                    <div className="text-gray-800 text-justify">
                        {abstract.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-800 dark:text-white">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </PublicationModal>
            )}
        </div>
    )
}

export default Publication