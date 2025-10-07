# Joshua Prettyman Personal Website Project

This is a React-based personal portfolio website built with Vite, showcasing academic background, professional experience, and personal projects.

## Tech Stack & Architecture
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with dark/light theme support
- **Routing**: React Router DOM
- **Content**: React Markdown for rendering markdown content
- **Icons**: Lucide React, React Icons

## Project Structure
- `src/pages/`: Main pages (Home, Education, Work, Projects, Blog)
- `src/components/`: Reusable components (CVEntry, ProjectCard, Header, Footer, etc.)
- `src/assets/`: Static assets
- `LaTeX_CV/`: LaTeX files for PDF CV generation
- `markdown/`: Python scripts for markdown CV generation
- `public/documents/`: Generated CV files

## Key Features & Components
- **Responsive Design**: Mobile-first approach with Tailwind
- **Dark Mode**: Toggle between light/dark themes via DarkModeToggle component
- **CV System**: Dual CV generation (LaTeX PDF + Python markdown)
- **Interactive Elements**: 
  - Expandable CVEntry cards
  - Publication modals (PublicationModal component)
  - GraphBuilder component for interactive visualizations
- **Blog System**: Full blog with tag filtering and individual post pages
- **Project Showcases**: Dedicated pages for major projects

## Development Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `python3 -m markdown.generate_cv`: Generate markdown CV

## Code Conventions
- Use existing component patterns and Tailwind classes
- Follow React hooks patterns established in components
- Maintain consistency with current file structure
- Check package.json dependencies before adding new libraries
- Components use standard React patterns with hooks

## Important Files to Reference
- `src/App.jsx`: Main routing configuration
- `src/components/Layout.jsx`: Page layout wrapper
- `package.json`: Dependencies and scripts
- `README.md`: Project documentation and structure details

## Current Branch Status
Working on branch: leaflet
Main branch: main