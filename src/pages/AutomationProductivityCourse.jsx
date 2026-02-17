import { useEffect, useState } from 'react';
import {
    Clock, Users, Target, Zap, Award,
    Clock4, Database, Workflow, MessageSquare, FolderOpen, TrendingUp, CheckCircle, Sliders
} from 'lucide-react';
import './AutomationProductivityCourse.css';

// Import local images
import AutomationHeroImg from '../assets/automation_hero.jpg';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import PowerBILogo from '../assets/power_bi_logo.svg';
import ExcelLogo from '../assets/excel_logo.png';

// New Logos
import Office365Logo from '../assets/office_365_logo.png';
import SlackLogo from '../assets/slack_logo.png';
import PowerpointLogo from '../assets/powerpoint_logo.png';
import PowerAutomateLogo from '../assets/power_automate_logo.png';
import GoogleDriveLogo from '../assets/google_drive_logo.png';

const AutomationProductivityCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${AutomationHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Automation &amp; Productivity Tools</span>
                    <h1 className="fs-hero-title">
                        Automation &amp; Productivity Tools Course
                    </h1>
                    <p className="fs-hero-sub">
                        Work smarter, not harder. Learn how to use automation and productivity tools to save time,
                        reduce manual work and organise your tasks, data and communication more efficiently.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Excel, Power Query, Power BI, Power Automate, Google Workspace, Slack &amp; Office 365</span>
                        <span>Professional Course · Duration as per institution (often 2–4 months)</span>
                        <span>Beginner‑friendly · Ideal for students &amp; working professionals in any domain</span>
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
                                    The Automation &amp; Productivity Tools Course is designed to help you streamline your
                                    daily work. You will learn how to manage data, tasks and communication using tools
                                    like Excel, Power Query, Power BI, Google Workspace, Slack, OneDrive / Google Drive
                                    and cloud‑based automation platforms such as Power Automate.
                                </p>
                                <p>
                                    The focus is on practical, real‑world use cases: automating reports, tracking work,
                                    collaborating with teams, and connecting apps so that information flows automatically.
                                    By the end of the course, you’ll have a toolkit and workflows you can apply
                                    immediately in your job, business or studies to save hours every week.
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
                                        <span>Productivity Fundamentals &amp; Tools</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Principles of productivity – efficiency vs. effectiveness, reducing friction</li>
                                        <li>Task Management – using Trello, Notion, Asana or Microsoft Planner effectively</li>
                                        <li>Communication Tools – Slack / Teams best practices for async work</li>
                                        <li>Document Collaboration – Google Workspace / Office 365 real‑time co‑editing</li>
                                        <li>Time Tracking &amp; Pomodoro Techniques – tools to manage focus</li>
                                        <li>Lab: Set up a personal or team “productivity dashboard”</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 2</span>
                                        <span>No‑Code Automation</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Intro to Automation – triggers, actions and conditions</li>
                                        <li>Zapier / Make (formerly Integromat) basics – connecting apps without code</li>
                                        <li>Automating Emails &amp; Notifications – “If this happens, send an email”</li>
                                        <li>Data Entry Automation – forms to spreadsheets to database syncs</li>
                                        <li>Social Media Automation – scheduling and cross‑posting workflows</li>
                                        <li>Lab: Build a live “Zap” that automates a routine administrative task</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Advanced Workflows &amp; AI Integration</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Multi‑step Workflows – branching logic and filters in automation tools</li>
                                        <li>Integrating AI – using ChatGPT / OpenAI APIs within your workflows</li>
                                        <li>Database Automations – Airtable / Notion databases as central hubs</li>
                                        <li>Error Handling – what happens when an automation breaks?</li>
                                        <li>Process Optimisation – analysing workflows to remove bottlenecks</li>
                                        <li>Lab: End‑to‑end automation project (e.g. detailed lead capture system)</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Tools covered may vary (Zapier, Power Automate, etc.) depending on curriculum.
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 3}>
                                <summary onClick={(e) => handleToggle(3, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Projects</span>
                                        <span>Real‑World Automation Scenarios</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Automate a customer inquiry response system</li>
                                        <li>Build a content publishing pipeline (Draft → Review → Publish)</li>
                                        <li>Create an expense tracking and approval workflow</li>
                                        <li>Capstone: Audit a current manual process and implement a full automation solution</li>
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
                                        <span>Automation &amp; Productivity Course · Duration as per institution (commonly 4–8 weeks, online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><CheckCircle size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Open to anyone interested in saving time – admins, marketers, freelancers, managers, small business owners. No coding required.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Workflow design, no‑code automation tools (Zapier, Make), task management software, AI integration and process efficiency.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Professionals looking to eliminate repetitive tasks and streamline team operations.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Highly rated for “immediate ROI” – learners often save hours per week shortly after starting.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Tools Covered &amp; Use Cases</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Automation &amp; Productivity Skills Are Valued</h2>
                    <p>These skills are useful in almost every role – operations, HR, finance, marketing, sales, analytics and more.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft 365" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={GoogleLogo} alt="Google Workspace" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={SlackLogo} alt="Slack" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={PowerBILogo} alt="Power BI" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={Office365Logo} alt="Office 365" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This Course</h2>
                            <p>Combine the right tools and habits to create your own efficient digital workspace.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Clock4 size={24} /></div>
                                <h3>Save Time Daily</h3>
                                <p>Reclaim hours spent on data entry, file moving and routine emails.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Database size={24} /></div>
                                <h3>No‑Code Skills</h3>
                                <p>Build powerful integrations between apps without writing a single line of code.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Workflow size={24} /></div>
                                <h3>Workflow Design</h3>
                                <p>Learn to map out processes visually and identify where automation fits best.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><MessageSquare size={24} /></div>
                                <h3>Better Communication</h3>
                                <p>Keep teams in sync automatically with notifications and dashboard updates.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><FolderOpen size={24} /></div>
                                <h3>Organised Systems</h3>
                                <p>Replace chaos with structured systems in Notion, Airtable or project tools.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Career Edge</h3>
                                <p>Become the “process expert” who makes the entire team more efficient.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Automated Workflow Snapshot</span>
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
                                <span>Tasks</span>
                                <span>Emails</span>
                                <span>Reports</span>
                                <span>Alerts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Work With</h2>
                    <p>Get hands‑on with the most widely used productivity and automation tools.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Microsoft Excel</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / BI tools</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerpointLogo} alt="PowerPoint" />
                            <span>PowerPoint (report decks)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerAutomateLogo} alt="Power Automate" />
                            <span>Power Automate (flows)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GoogleDriveLogo} alt="Google Drive" />
                            <span>Google Drive / Docs / Sheets</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={SlackLogo} alt="Slack" />
                            <span>Slack (team chat)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={Office365Logo} alt="Office 365" />
                            <span>Office 365 apps</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Actual tools may vary (e.g. alternative cloud automation / collaboration services) based on availability and curriculum.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers &amp; Learning Journey</h2>
                        <p>See how this course builds your skills and changes the way you work every day.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Sliders size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Busy to Productive</h3>
                                    <p className="fs-more-text">
                                        Shift your focus from “admin work” to “high‑value work” by letting tools handle the rest.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Zapier / Make</span>
                                <span className="fs-role-tag">Notion / Airtable</span>
                                <span className="fs-role-tag">Slack / Teams</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Users size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles That Benefit Most</h3>
                                    <p className="fs-more-text">
                                        Anyone who juggles multiple tasks, tools or clients will see immediate benefits.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Operations Manager</span>
                                <span className="fs-role-tag">Virtual Assistant / Admin</span>
                                <span className="fs-role-tag">Digital Marketer</span>
                                <span className="fs-role-tag">Project Manager</span>
                                <span className="fs-role-tag">Small Business Owner</span>
                                <span className="fs-role-tag">Freelancer / Consultant</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your Learning Journey</h3>
                                    <p className="fs-more-text">
                                        Start with organising your tasks, then move to automating them step by step.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Productivity principles &amp; setting up your "stack".</div>
                                <div className="fs-journey-step">Module 2: Building your first automations (triggers &amp; actions).</div>
                                <div className="fs-journey-step">Module 3: Advanced logic, AI, error handling &amp; capstone.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AutomationProductivityCourse;
