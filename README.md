# Aindhin React Application

A pixel-perfect React clone of the Aindhin e-Learning platform, converted from WordPress. Built with Vite, React Router, Tailwind CSS, and Framer Motion.

## Features

- **Exact Visual Match**: Replicates the original theme's layout, spacing, and colors.
- **Fully Responsive**: Optimized for Desktop, Tablet, and Mobile views.
- **Dynamic Preloader**: Animated GIF loading screen to match the original site's feel.
- **Explore Categories**: Interactive dropdown with flyout submenus for course tracks.
- **Course Catalog**: Filterable course views using React state and URL parameters.
- **Premium Animations**: Smooth scroll-triggered animations and hover effects using Framer Motion.
- **Clean Architecture**: Reusable UI components (Header, Footer, Card, Hero).

## Tech Stack

- **React + Vite**
- **Tailwind CSS** (for styling)
- **Framer Motion** (for animations)
- **Lucide React** (for icons)
- **React Router** (for navigation)

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository or extract the project folder.
2. Navigate to the project directory:

   ```bash
   cd aindhin
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

### Build for Production

To create an optimized production build:

```bash
npm run build
```

## Project Structure

- `src/assets/`: Site images, logos, and favicons.
- `src/components/`: Reusable UI elements (Header, Footer, CourseCard, Hero, Testimonials).
- `src/pages/`: Page-level components (Home, AboutUs, Courses, Blog, ContactUs).
- `src/App.jsx`: Main routing and layout wrapper.
- `src/index.css`: Global styles and Tailwind directives.
