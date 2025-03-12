import React, { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import Modal from './Modal'
import { Calendar, Trophy, User, MapPin } from 'lucide-react'

// Import all HTML files from the work-entries directory
const cvEntriesAcademic = import.meta.glob('../assets/cv-academic/*.shtml');
const cvEntriesProfessional = import.meta.glob('../assets/cv-professional/*.shtml');

const CVEntry = ({ 
    title,
    grade,
    company, 
    duration, 
    logo, 
    address,
    headline,
    transparent = false,
    'data-entry-id': entryId
}) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            // Guard against undefined responsibilities
            try {
                setIsLoading(true);
                setError(null);
                
                const pathProfessional = `../assets/cv-professional/${entryId}.shtml`;
                const pathAcademic = `../assets/cv-academic/${entryId}.shtml`;
                console.log('Attempting to load:', `${pathAcademic} or ${pathProfessional}`);
                console.log('Available paths:', Object.keys(cvEntriesAcademic));
                console.log('Available paths:', Object.keys(cvEntriesProfessional));

                let module;
                if (cvEntriesAcademic[pathAcademic]) {
                    module = await cvEntriesAcademic[pathAcademic]();
                } else if (cvEntriesProfessional[pathProfessional]) {
                    module = await cvEntriesProfessional[pathProfessional]();
                } else {
                    throw new Error(`Content file not found: ${pathAcademic} or ${pathProfessional}`);
                }

                const response = await fetch(module.default);
                
                if (!response.ok) {
                    throw new Error(`Failed to load content (${response.status})`);
                }
                
                const text = await response.text();
                console.log('Loaded content:', text.substring(0, 100) + '...');
                setHtmlContent(text);
            } catch (e) {
                console.error('Error loading content:', e);
                setError(e.message);
                setHtmlContent('');
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [entryId]);

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
                    {logo && (
                        <div className="w-20 h-20 flex-shrink-0 dark:bg-gray-100 dark:rounded-lg mr-4 flex items-center justify-center">
                            <a 
                                href={address} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-black dark:text-white font-bold hover:underline w-full h-full flex items-center justify-center"
                            >
                                <img 
                                    src={logo} 
                                    alt={`${company} Logo`} 
                                    className={`${transparent ? 'w-[90%] h-[90%]' : 'w-full h-full object-contain rounded-lg shadow-md'}`} 
                                />
                            </a>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {title}
                        </h2>
                        { grade && (
                            <div className="flex items-center text-gray-600 dark:text-white mb-1">
                                <Trophy className="h-4 w-4 mr-1" />
                                <span className="text-md">{grade}</span>
                            </div>
                        )}
                        <p className="text-md text-gray-700 dark:text-white">
                            <a 
                                href={address} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-black dark:text-white font-bold hover:underline"
                            >
                                {company}
                            </a>
                        </p>
                    </div>
                </div>
                { duration && (
                    <div className="flex items-center text-gray-600 dark:text-white mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{duration}</span>
                    </div>
                )}
                {headline && (
                    <p className="text-gray-800 dark:text-white italic mb-2">
                        {headline}
                    </p>
                )}
            </div>
            
            <div className="flex justify-center">
                <button onClick={handleReadMoreClick} className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500 font-semibold">
                    Read More
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white z-10 shadow-md">
                            <Modal 
                                onClose={handleCloseModal}
                                header={{ logo, title, grade, company, duration, headline }}
                                transparent={transparent}
                            >
                                <div 
                                    className="htmlContent text-gray-800 dark:text-white mr-10
                                        [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2
                                        [&_ul_ul]:list-none [&_ul_ul]:mt-2 [&_ul_ul]:ml-4
                                        [&_ul_ul_li]:relative [&_ul_ul_li]:pl-5 [&_ul_ul_li]:mb-1
                                        [&_ul_ul_li]:before:content-['▷'] [&_ul_ul_li]:before:absolute [&_ul_ul_li]:before:left-0 [&_ul_ul_li]:before:top-0
                                        [&_a]:text-blue-600 [&_a:hover]:text-blue-800 
                                        [&_a]:dark:text-blue-400 [&_a]:dark:hover:text-blue-600
                                        [&_a]:underline
                                        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:dark:text-white [&_h2]:mb-3
                                        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:dark:text-white [&_h3]:mb-2
                                        [&_h5]:font-semibold [&_h5]:text-gray-800 [&_h5]:dark:text-white [&_h5]:mb-2
                                        [&_.row]:flex [&_.row]:flex-wrap [&_.row]:justify-center 
                                        [&_.row]:items-center [&_.row]:gap-2 [&_.row]:my-8
                                        [&_.row]:bg-blue-50 [&_.row]:dark:bg-gray-800
                                        [&_.row]:rounded-lg [&_.row]:ring-1 [&_.row]:ring-gray-200 [&_.row]:p-4
                                        [&_.caption]:rounded-lg [&_.caption]:p-1 
                                        [&_.caption]:font-light 
                                        [&_.caption]:text-gray-700 [&_.caption]:dark:text-white [&_.caption]:text-sm [&_.caption]:text-justify
                                        [&_.column]:flex-1 [&_.column]:min-w-[200px] 
                                        [&_.column]:max-w-[500px] [&_.column]:p-1
                                        [&_.column_img]:w-full 
                                        [&_.column_img]:h-auto 
                                        [&_.column_img]:rounded-lg
                                        [&_.justified]:text-justify"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CVEntry