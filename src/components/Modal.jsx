import React from 'react';
import { Trophy, MapPin, Calendar } from 'lucide-react';

function Modal({ children, onClose, header, transparent = false }) {
    const { logo, title, grade, company, duration, headline } = header;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 dark:ring-1 dark:ring-gray-200 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-700 z-10 shadow-md">
                    <div className="flex justify-between items-start p-4">
                        <div className="flex items-center">
                        {logo && (
                        <div className="w-20 h-20 flex-shrink-0 dark:bg-gray-100 dark:rounded-lg mr-4 flex items-center justify-center">
                            <img 
                                src={logo} 
                                alt={`${company} Logo`} 
                                className={`${transparent ? 'w-[90%] h-[90%]' : 'w-full h-full object-contain rounded-lg shadow-md'}`} 
                            />
                        </div>
                    )}
                            
                            <div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{title}</span>
                                { (grade || company) && (
                                    <div className="flex items-center text-gray-600 dark:text-white mb-1">
                                        {company && (
                                            <>
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span className="text-md">{company}</span>
                                            </>
                                        )}
                                        {company && grade && (
                                            <span className="text-gray-600 mx-3">|</span>
                                        )}
                                        {grade && (
                                            <>
                                                <Trophy className="h-4 w-4 mr-1" />
                                                <span className="text-md">{grade}</span>
                                            </>
                                        )}
                                    </div>
                                )}
                                { duration && (
                                    <div className="flex items-center text-gray-600 dark:text-white mb-1">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span className="text-md">{duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                            &times;
                        </button>
                    </div>
                </div>
                {/* Content */}
                <div className="p-6">
                    {headline && (
                        <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">{headline}</p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal; 