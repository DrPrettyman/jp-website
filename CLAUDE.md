# Joshua Prettyman Personal Website Project

This is a React-based personal portfolio website built with Vite, showcasing academic background, professional experience, and personal projects.

## Tech Stack & Architecture
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with dark/light theme support
- **Routing**: React Router DOM
- **Content**: React Markdown for rendering markdown content
- **Icons**: Lucide React, React Icons
- **Maps**: React Leaflet for interactive travel maps

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
  - TravelMap component for interactive travel visualization (see details below)
- **Blog System**: Full blog with tag filtering and individual post pages
- **Project Showcases**: Dedicated pages for major projects

### TravelMap Component
Interactive travel visualization using React Leaflet with the following features:

**Core Functionality:**
- Displays geotagged photos as colored chapter-based markers on an OpenStreetMap base layer
- Chronological polyline connecting locations in travel order
- Responsive layout: side panel (landscape) vs bottom panel (portrait)
- Chapter legend showing travel segments with colored markers, dates, and summaries
- Click markers to view photo details with navigation between consecutive photos
- Custom SVG pin markers colored by chapter (12 distinct colors)

**Data Structure:**
- Expects `travelData` prop with: Chapters array (Title, StartDate, EndDate, Summary, Photos), Bounds (North/South/East/West coordinates)
- Photos contain: Latitude, Longitude, Title, Summary, FileName, DateTime, Chapter, Photo number
- Images loaded from `imagePath` prop + lowercase filename

**UI Components:**
- Title pill at top center
- Circular popups with thumbnail images on marker hover
- Info panel showing selected photo with title, formatted date, summary, and prev/next navigation
- Auto-fitting bounds with responsive padding for panel positioning

**Technical Details:**
- Custom Leaflet icon defaults fix for react-leaflet
- MapClickHandler and BoundsUpdater helper components using useMap hook
- Date formatting with ordinal suffixes (1st, 2nd, 3rd, etc.)
- Coordinate correction handling for swapped East/West bounds in metadata

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