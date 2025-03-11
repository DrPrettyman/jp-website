import React from 'react';
import { Calendar, User, Users, Link, BookOpen } from 'lucide-react';

function PublicationModal({ children, onClose, header, transparent = false }) {
    const { logo, journal, title, date, link, authors } = header;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 dark:ring-1 dark:ring-gray-200 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-700 z-10 shadow-md">
                    <div className="flex justify-between items-start p-4">
                        <div className="flex items-center">
                            {logo && (
                                <div className="w-20 h-20 flex-shrink-0 dark:bg-gray-100 dark:rounded-lg mr-4 flex items-center justify-center">
                                    <img 
                                        src={logo} 
                                        alt={`${journal} journal logo`} 
                                        className={`w-[90%] h-[90%] ${transparent ? '' : 'object-contain rounded-lg shadow-md'}`} 
                                    />
                                </div>
                            )}

                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                    {title}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-500 dark:text-white hover:text-gray-700">
                            &times;
                        </button>
                    </div>
                </div>
                <div className="sticky top-0 bg-white dark:bg-gray-700 z-9 shadow-md">
                    <div className="flex justify-between items-start p-4">
                        <div className="flex items-center">
                            <div className="flex flex-col text-gray-600 dark:text-white">
                                <div className="flex items-center mb-2">
                                    <Users className="h-4 w-4 mr-2" />
                                    <span className="text-sm">{authors.join(", ")}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    <span className="text-sm">{journal}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span className="text-sm">{date}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Link className="h-4 w-4 mr-2" />
                                    <span className="text-sm"><a href={link} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">{link}</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div className="px-4 py-4 text-gray-800 dark:text-white">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PublicationModal; 