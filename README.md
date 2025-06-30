# [joshua.prettyman.me](https://joshua.prettyman.me)

My personal website. Built with React and Vite.

A [markdown version](/public/documents/JPrettymanCV.md) can be compiled using some python functions in the `/markdown` folder.

A pdf-format CV is compiled using LaTeX and is included in the `/public/documents` folder.  

## Development

```bash
npm install
npm run dev
```

# Structure

- `src/pages` contains the main pages of the website.
- `src/components` contains reusable components.
- `src/assets` contains static assets.
- `LaTeX_CV` contains files to compile a pdf-format cv.
- `markdown` contains pythion functions to compile a markdown cv ([here](/public/documents/JPrettymanCV.md)) using the text from the website.
  - run `python3 -m markdown.generate_cv` from the top directory.

## Pages:

- `Home`
  - A landing page with a short introduction.
- `Education`
  - Includes a list of degrees and publications.
- `Work`
  - Includes a list of jobs with a card component for each.
- `Projects`
  - Includes a list of projects with a card component for each.


## Components:

- `CVEntry`
  - A component for displaying a single CV entry as an expandable card.
- `ProjectCard`
  - A card component for projects.
- `DarkModeToggle`
  - A component for toggling the dark mode theme.
- `Footer`
  - A component for the footer of the website.
- `Header`
  - A component for the header of the website.
- `Layout`
  - A component for the layout of the website.

