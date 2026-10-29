import { useEffect, useState } from 'react';
import {
    Clock, Users, Code, Briefcase, Award,
    Layout, Server, Database, Cloud, GitBranch,
    Map
} from 'lucide-react';
import './FullStackDevelopmentCourse.css';

// Import local images
import FullStackHeroImg from '../assets/full_stack_hero.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AccentureLogo from '../assets/accenture_logo.svg'; // Check file extension
import TCSLogo from '../assets/tcs_logo.svg'; // Check file extension
import WiproLogo from '../assets/wipro_logo.svg'; // Check file extension
import DeloitteLogo from '../assets/deloitte_logo.svg'; // Check file extension
import AmazonLogo from '../assets/amazon_logo.webp'; // Check file extension
import EYLogo from '../assets/ey_logo.svg'; // Check file extension

// Tech Logos
import HTML5Logo from '../assets/html5_logo.svg';
import CSS3Logo from '../assets/css3_logo.svg';
import JSLogo from '../assets/javascript_logo.svg';
import ReactLogo from '../assets/react_logo.svg';
import NodeLogo from '../assets/node_logo.svg';
import MySQLLogo from '../assets/mysql_logo.svg';
import GitHubLogo from '../assets/github_logo.svg';
import VSCodeLogo from '../assets/vscode_logo.svg';

const FullStackDevelopmentCourse = () => {
    useEffect(() => {
        document.title = "Full Stack Web Development Course | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Learn front end, back end and databases, and build a complete web app. Online and self-paced.");
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fs-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const sections = document.querySelectorAll('.fs-section');
        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    const [openModuleIndex, setOpenModuleIndex] = useState(0);

    const handleToggle = (index, e) => {
        e.preventDefault();
        setOpenModuleIndex(openModuleIndex === index ? null : index);
    };

    return (
        <div className="fs-course" id="top">

            {/* HERO */}
            <section
                className="fs-hero fs-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${FullStackHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Full Stack Development Course</span>
                    <h1 className="fs-hero-title">
                        Become a Job-Ready Full Stack Developer: Build Complete Web Applications from Scratch
                    </h1>
                    <p className="fs-hero-sub">
                        Learn to build complete web applications from scratch. Master front‑end and back‑end
                        development, databases, APIs and deployment to become a job‑ready full stack developer.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: HTML, CSS, JavaScript, Front‑end Frameworks, Node.js, Databases, APIs</span>
                        <span>Professional Course · Duration as per institution (often 4–6 months)</span>
                        <span>Beginner‑friendly · Ideal for students &amp; professionals · Project‑based learning</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="fs-main fs-section">
                <div className="fs-main-inner">

                    {/* Left side */}
                    <div className="fs-left">

                        {/* About */}
                        <section className="fs-card">
                            <h2>About This Course</h2>
                            <div className="fs-about-text">
                                <p>
                                    The Full Stack Development Course teaches you how to build modern web applications
                                    end‑to‑end. You begin with the fundamentals of HTML, CSS and JavaScript, then move on
                                    to front‑end frameworks, back‑end development, databases and deployment.
                                </p>
                                <p>
                                    Through hands‑on projects and assignments, you will design user interfaces, build APIs,
                                    connect to databases and deploy applications to the cloud. By the end of the course,
                                    you will have a portfolio of full stack projects and the confidence to apply for
                                    developer roles or work on your own ideas.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open={openModuleIndex === 0}>
                                <summary onClick={(e) => handleToggle(0, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Web Fundamentals (Front‑end Basics)</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Web Basics – how the web works, client‑server model, HTTP</li>
                                        <li>HTML5 – structure, forms, semantic tags, accessibility basics</li>
                                        <li>CSS3 – layout, flexbox, grid, responsive design, basic animations</li>
                                        <li>JavaScript Fundamentals – syntax, DOM, events, ES6+ features</li>
                                        <li>Version Control with Git &amp; GitHub – commits, branches, pull requests</li>
                                        <li>Project: Build a responsive multi‑page static website</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Front‑end Framework &amp; API Integration</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Modern Front‑end Concepts – SPA, components, state management (overview)</li>
                                        <li>React / Similar Framework – components, props, state, hooks (as per institute)</li>
                                        <li>Routing, Forms &amp; Validation on the Front‑end</li>
                                        <li>Working with REST APIs – fetch / Axios, JSON, error handling</li>
                                        <li>Project: Front‑end SPA that consumes a public or custom API</li>
                                        <li>Intro to Testing &amp; Debugging Tools in the Browser</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Back‑end, Databases &amp; Deployment</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Back‑end Basics – Node.js &amp; Express (or equivalent stack)</li>
                                        <li>Building RESTful APIs – routes, controllers, middleware</li>
                                        <li>Databases – SQL (MySQL / PostgreSQL) or NoSQL (MongoDB) concepts</li>
                                        <li>Authentication &amp; Authorisation – sessions / JWT, secure password storage</li>
                                        <li>Deployment – hosting front‑end &amp; back‑end, environment variables, build tools</li>
                                        <li>Project: Complete full stack application with auth &amp; CRUD operations</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Exact technologies (React / Angular / Vue, Node / other back‑end) may vary as per institution and curriculum.
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 3}>
                                <summary onClick={(e) => handleToggle(3, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Projects</span>
                                        <span>Hands‑on Assignments &amp; Portfolio Building</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Responsive static website (HTML, CSS, JS)</li>
                                        <li>Front‑end SPA consuming an external API</li>
                                        <li>Full stack CRUD application with database &amp; authentication</li>
                                        <li>Optional mini‑projects (e‑commerce, blog, task manager, etc.)</li>
                                        <li>Portfolio preparation – host your projects and link your GitHub profile</li>
                                    </ul>
                                </div>
                            </details>
                        </section>
                    </div>

                    {/* Right side */}
                    <aside className="fs-right">
                        <section className="fs-card">
                            <h2>Course Details</h2>
                            <ul className="fs-detail-list">
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Clock size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Course Type &amp; Duration</strong>
                                        <span>Full Stack Development Course · Duration as per institution (commonly 4–6 months, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Any graduate / final‑year student / working professional with basic computer usage. Prior coding experience helps but is not mandatory.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Code size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Front‑end (HTML, CSS, JS, frameworks), back‑end (Node.js / similar), APIs, databases, deployment and best practices.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Briefcase size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students and professionals who want to become full stack web developers, front‑end / back‑end developers or build their own web products.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Highly rated for practical projects, mentor support and placement‑oriented training (ratings vary by institution).</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Curriculum &amp; Project Roadmap</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Top Sectors Hiring Full Stack Developers</h2>
                    <p>Full stack skills are in demand across product companies, IT services, startups, e‑commerce and more.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={TCSLogo} alt="TCS" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={WiproLogo} alt="Wipro" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={DeloitteLogo} alt="Deloitte" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This Full Stack Development Course</h2>
                            <p>Learn to build complete applications that users can access from any device.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Layout size={24} /></div>
                                <h3>Front‑end Skills</h3>
                                <p>Design and code responsive, user‑friendly interfaces using HTML, CSS and JavaScript.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Server size={24} /></div>
                                <h3>Back‑end Logic</h3>
                                <p>Implement APIs, business logic and database interactions on the server side.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Database size={24} /></div>
                                <h3>Database Knowledge</h3>
                                <p>Work with SQL / NoSQL databases to store and query application data efficiently.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Cloud size={24} /></div>
                                <h3>Deployment Skills</h3>
                                <p>Host and maintain full stack applications on cloud / hosting platforms.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><GitBranch size={24} /></div>
                                <h3>Collaboration Tools</h3>
                                <p>Use Git, GitHub and common developer tools to work in real‑world teams.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build a portfolio of projects aligned with full stack developer job requirements.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Full Stack App Architecture Snapshot</span>
                                <div className="fs-dashboard-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className="fs-dashboard-graph">
                                <div className="fs-dashboard-bar"></div>
                                <div className="fs-dashboard-bar"></div>
                                <div className="fs-dashboard-bar"></div>
                                <div className="fs-dashboard-bar"></div>
                                <div className="fs-dashboard-bar"></div>
                            </div>
                            <div className="fs-dashboard-tags">
                                <span>UI</span>
                                <span>API</span>
                                <span>DB</span>
                                <span>Deploy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Technologies You May Work With</h2>
                    <p>Get hands‑on experience with popular technologies across the full stack.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={HTML5Logo} alt="HTML5" />
                            <span>HTML5</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={CSS3Logo} alt="CSS3" />
                            <span>CSS3</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={JSLogo} alt="JavaScript" />
                            <span>JavaScript (ES6+)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ReactLogo} alt="React" />
                            <span>React / Front‑end Frameworks*</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={NodeLogo} alt="Node.js" />
                            <span>Node.js &amp; Express*</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MySQLLogo} alt="MySQL" />
                            <span>MySQL / MongoDB*</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GitHubLogo} alt="GitHub" />
                            <span>Git &amp; GitHub</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={VSCodeLogo} alt="VS Code" />
                            <span>VS Code / IDEs</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact framework / back‑end / database stack may differ as per institution.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers &amp; Learning Journey</h2>
                        <p>See how this Full Stack Development Course builds your skills and prepares you for developer careers.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Code size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">End‑to‑End Development Skills</h3>
                                    <p className="fs-more-text">
                                        Learn to design, code, test and deploy complete web applications using modern
                                        front‑end and back‑end technologies.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <img className="fs-tool-logo" src={HTML5Logo} alt="HTML5" />
                                <img className="fs-tool-logo" src={ReactLogo} alt="React" />
                                <img className="fs-tool-logo" src={NodeLogo} alt="Node.js" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Users size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                                    <p className="fs-more-text">
                                        Use your projects and portfolio to apply for high‑growth web development roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Full Stack Developer (Junior)</span>
                                <span className="fs-role-tag">Front‑end Developer</span>
                                <span className="fs-role-tag">Back‑end Developer</span>
                                <span className="fs-role-tag">Web Application Developer</span>
                                <span className="fs-role-tag">Software Engineer (Web)</span>
                                <span className="fs-role-tag">Freelance Web Developer / Startup Founder</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your Learning Journey</h3>
                                    <p className="fs-more-text">
                                        A clear module‑wise roadmap from basic web pages to full stack apps and deployment.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Web fundamentals (HTML, CSS, JS, Git) &amp; static site project.</div>
                                <div className="fs-journey-step">Module 2: Front‑end framework, APIs &amp; SPA project.</div>
                                <div className="fs-journey-step">Module 3: Back‑end, database, auth, deployment &amp; full stack capstone.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FullStackDevelopmentCourse;
