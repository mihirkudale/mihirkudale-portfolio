# Personal Portfolio

A modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS. Showcasing professional experience, projects, skills, certifications, and education.

**Live Site:** [mihirkudale.vercel.app](https://mihirkudale.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Sections](#sections)
- [Customization](#customization)
- [Deployment](#deployment)
- [License](#license)

## Overview

This is a professional portfolio website that serves as a centralized hub for showcasing work experience, projects, technical skills, certifications, and educational background. The portfolio is designed to be fast, accessible, and optimized for both desktop and mobile devices.

## Features

- ⚡ **Fast Performance** - Built with Vite for optimized production builds
- 📱 **Responsive Design** - Fully responsive layout that works on all devices
- 🎨 **Modern UI** - Clean and professional design with smooth animations
- 📊 **Multiple Sections** - Home, About Me, Projects, Skills, Certifications, Education, and Contact
- 🎯 **Scroll Animations** - Elements reveal on scroll for enhanced user experience
- ♿ **Accessible** - Built with accessibility best practices
- 🚀 **SEO Optimized** - Meta tags and structured content for better search visibility
- 📧 **Contact Form** - Easy way for visitors to get in touch

## Tech Stack

- **Frontend Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, CSS Modules
- **State Management:** React Hooks
- **Animation:** CSS animations and JavaScript scroll events
- **Linting:** ESLint
- **Deployment:** Vercel

## Project Structure

```
src/
├── assets/              # Images, icons, and other static files
├── components/
│   ├── sections/       # Page sections (Home, About, Projects, etc.)
│   │   ├── AboutMe.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── Navbar.jsx      # Navigation component
│   └── RevealOnScroll.jsx  # Scroll animation component
├── constants/
│   └── index.js        # Data for experiences, projects, skills, etc.
├── App.jsx             # Main application component
├── App.css             # Global styles
├── index.css           # CSS reset and base styles
└── main.jsx            # Application entry point

public/
├── assets/             # Public static files
index.html             # Main HTML file
vite.config.js         # Vite configuration
package.json           # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mihirkudale/mihirkudale-portfolio.git
   cd mihirkudale-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Available Scripts

- **`npm run dev`** - Start development server with hot module replacement
- **`npm run build`** - Create optimized production build
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## Sections

### Home

The landing section with a professional introduction and quick links to key sections.

### About Me

A brief introduction about background, expertise, and professional journey.

### Experience

Detailed work experience including:
- Current: **Software Developer** at Integrated Consultancy Services (Aug 2024 - Nov 2025)
- **Data Analyst** at Amazon (Aug 2023 - Jan 2024)
- **Data Scientist Intern** at iNeuron (Nov 2022 - Feb 2023)
- Multiple internships and early-career roles

### Projects

Showcasing key projects with descriptions and links to repositories or live demos.

### Skills

Technical skills organized by categories:
- Programming Languages
- Data Science & ML
- Web Technologies
- Tools & Platforms

### Certifications

Professional certifications and credentials earned.

### Education

Educational background and degrees.

### Contact

Contact form and social media links for visitors to reach out.

## Customization

### Update Personal Information

Edit `src/constants/index.js` to update:
- Work experiences
- Projects
- Skills
- Certifications
- Education

### Modify Styles

- Global styles: `src/index.css` and `src/App.css`
- Tailwind CSS configuration: `tailwind.config.js`
- Component-specific styles: CSS files in each component directory

### Add New Sections

1. Create a new component in `src/components/sections/`
2. Import and add to `App.jsx`
3. Update constants as needed

## Deployment

This portfolio is deployed on **Vercel** with automatic deployments from the main branch.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect Vite configuration and deploy

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
```
Then deploy the `dist` folder.

**Other Hosting:**
Build the project and upload the `dist` folder to your hosting provider.

## Performance Optimization

- **Code Splitting:** Vite automatically optimizes chunks
- **Image Optimization:** Consider using optimized image formats
- **CSS Purging:** Tailwind CSS automatically purges unused styles
- **Minification:** Production builds are automatically minified

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contact

- **Website:** [mihirkudale.vercel.app](https://mihirkudale.vercel.app/)
- **GitHub:** [@mihirkudale](https://github.com/mihirkudale)
- **LinkedIn:** Connect via portfolio site

---

**Note:** This is a personal portfolio project. Feel free to fork, modify, and use as inspiration for your own portfolio!
