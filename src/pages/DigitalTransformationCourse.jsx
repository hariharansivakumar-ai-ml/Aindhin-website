import { useEffect } from 'react';
import './DigitalTransformationCourse.css';

// Import local images
import DigitalTransformationHeroImg from '../assets/digital_transformation_hero.jpg';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.svg';
import AccentureLogo from '../assets/accenture_logo.svg'; // Check file extension
import EYLogo from '../assets/ey_logo.svg'; // Check file extension
import LandTLogo from '../assets/l_and_t_logo.png';
import TataLogo from '../assets/tata_logo.png';

// Tool Logos
import JiraLogo from '../assets/jira_logo.png';
import ConfluenceLogo from '../assets/confluence_logo.png';
import ExcelLogo from '../assets/excel_logo.png';
import PowerBILogo from '../assets/power_bi_logo.svg';
import MiroLogo from '../assets/miro_logo.png';


const DigitalTransformationCourse = () => {

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

    return (
        <div className="fs-course" id="top">

            {/* HERO */}
            <section
                className="fs-hero fs-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${DigitalTransformationHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Strategy · Technology · Change</span>
                    <h1 className="fs-hero-title">
                        Digital Transformation
                    </h1>
                    <p className="fs-hero-sub">
                        Turn buzzwords into a clear plan. Learn how to connect business strategy, customer
                        experience, processes, data and technology into a practical roadmap for digital
                        transformation – and how to execute it with your teams.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Digital Strategy, Customer Journeys, Process Digitisation, Data &amp; Cloud, Automation, Change</span>
                        <span>Professional Course · Duration as per institution (often 6–10 weeks)</span>
                        <span>Ideal for business &amp; IT leaders, product owners, operations &amp; transformation teams</span>
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
                                    The Digital Transformation course helps you design and lead change in a structured
                                    way. Instead of scattered projects and tools, you will learn to connect customer
                                    needs, processes, data and technology into a coherent digital roadmap.
                                </p>
                                <p>
                                    You will map customer journeys, identify digital opportunities, think through
                                    process and data impacts, and shape a realistic transformation plan. By the end,
                                    you’ll be able to talk confidently with both business and technology teams and
                                    guide them towards shared outcomes.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Digital Foundations &amp; Customer Journeys</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Why Digital Transformation – customer expectations, competition, technology trends</li>
                                        <li>Digital vs “Just IT Projects” – business models, experiences, ways of working</li>
                                        <li>Customer Journeys – channels, touchpoints, pain points, moments of truth</li>
                                        <li>Digital Opportunities – self‑service, automation, personalisation, analytics</li>
                                        <li>Defining Outcomes – business KPIs, customer metrics, experience goals</li>
                                        <li>Exercise: Map a simple customer journey and list digital opportunities</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Processes, Data &amp; Technology Enablement</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Process Digitisation – workflow, automation, integration, basic RPA concepts</li>
                                        <li>Back‑Office &amp; Front‑Office – how operations support digital experiences</li>
                                        <li>Data Foundations – single source of truth, master data, reporting &amp; dashboards</li>
                                        <li>Cloud &amp; Platforms (Non‑Technical View) – SaaS, APIs, integration basics</li>
                                        <li>Risk, Security &amp; Compliance – what business leaders should watch for</li>
                                        <li>Exercise: Sketch a “before vs after” process &amp; data view for a digital change</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Roadmaps, Change &amp; Governance</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>From Vision to Roadmap – themes, waves, quick wins vs longer bets</li>
                                        <li>Prioritisation – value vs effort, risk, dependencies and capacity</li>
                                        <li>Operating Model Impact – roles, skills, partners, new ways of working</li>
                                        <li>Change Management – stakeholders, communication, training, adoption</li>
                                        <li>Governance &amp; Metrics – steering forums, benefits tracking, course correction</li>
                                        <li>Exercise: Create a one‑page Digital Transformation canvas for your context</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ industries (IT &amp; services, banking,
                                        manufacturing, retail, public sector, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Practice</span>
                                        <span>Templates, Case Studies &amp; DT Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Journey maps, opportunity lists, roadmap &amp; governance templates</li>
                                        <li>Case study: aligning digital initiatives with strategy and capacity</li>
                                        <li>Creating your personal “Digital Transformation Playbook”</li>
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
                                    <div className="fs-detail-icon">D</div>
                                    <div className="fs-detail-text">
                                        <strong>Course Type &amp; Duration</strong>
                                        <span>Digital Transformation Course · Duration as per institution (commonly 6–10 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon">P</div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Business and IT leaders, product owners, business analysts, operations and service managers, project / programme managers and transformation teams.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon">F</div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Digital strategy, customer journeys, process &amp; data impacts, technology enablement, roadmaps, change management and governance.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon">O</div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with a structured way to describe, prioritise and govern digital initiatives – and to keep business and IT aligned on outcomes.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon">★</div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often valued for clarifying “what digital transformation actually means” in practical, non‑jargon language.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Modules &amp; DT Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Digital Transformation Skills Are in Demand</h2>
                    <p>Digital transformation skills are needed in IT &amp; services, banking &amp; financial
                        services, telecom, manufacturing, retail, healthcare, logistics, BPO / shared services
                        and the public sector.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={LandTLogo} alt="L&T" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={TataLogo} alt="Tata Group" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from Digital Transformation</h2>
                            <p>Connect strategy, customer experience, technology and change into one story.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon">SV</div>
                                <h3>Strategic View</h3>
                                <p>Explain clearly why your organisation is transforming and how digital supports the strategy.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon">CX</div>
                                <h3>Customer‑Centricity</h3>
                                <p>See transformation through customer journeys, not only systems and org charts.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon">PT</div>
                                <h3>Process &amp; Tech Alignment</h3>
                                <p>Link front‑end experiences to back‑end processes, data and platforms.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon">DD</div>
                                <h3>Data‑Driven Decisions</h3>
                                <p>Use metrics and dashboards to prioritise, monitor and adjust digital initiatives.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon">EX</div>
                                <h3>Execution Focus</h3>
                                <p>Turn high‑level visions into realistic roadmaps, governance and change plans.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon">CR</div>
                                <h3>Career Readiness</h3>
                                <p>Build artefacts – journeys, roadmaps, canvases – that support leadership and transformation roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Digital Transformation Board</span>
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
                                <span>Customers</span>
                                <span>Processes</span>
                                <span>Data</span>
                                <span>Change</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Use</h2>
                    <p>Get familiar with tools commonly used to plan and run digital transformation.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={JiraLogo} alt="Jira" />
                            <span>Jira / Delivery Backlogs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ConfluenceLogo} alt="Confluence" />
                            <span>Confluence / Wikis &amp; Docs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (Roadmaps)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / Dashboards</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / Journeys &amp; Maps</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – concepts focus on journeys, roadmaps, governance
                        and metrics that can be implemented in many tools.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your Digital Transformation Journey</h2>
                        <p>See how this course helps you move from “projects everywhere” to a coherent transformation story.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon">F</div>
                                <div>
                                    <h3 className="fs-more-title">From Projects to a Path</h3>
                                    <p className="fs-more-text">
                                        Move beyond disconnected initiatives to a clear transformation path with themes,
                                        journeys and measurable outcomes.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Journey Maps</span>
                                <span className="fs-role-tag">Opportunity Backlogs</span>
                                <span className="fs-role-tag">Roadmaps &amp; KPIs</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon">R</div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build digital transformation skills that enhance leadership, product and change roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Digital / Transformation Lead</span>
                                <span className="fs-role-tag">Business &amp; IT Managers</span>
                                <span className="fs-role-tag">Product / Portfolio Owners</span>
                                <span className="fs-role-tag">Business Analysts</span>
                                <span className="fs-role-tag">Project / Programme Managers</span>
                                <span className="fs-role-tag">Operations &amp; Service Leaders</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon">J</div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step progression from understanding digital transformation to shaping and
                                        communicating your own roadmap.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Understand digital transformation and map customer journeys &amp; opportunities.</div>
                                <div className="fs-journey-step">Module 2: Connect experiences to processes, data and technology enablement.</div>
                                <div className="fs-journey-step">Module 3: Build roadmaps, governance and a Digital Transformation Playbook.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DigitalTransformationCourse;
