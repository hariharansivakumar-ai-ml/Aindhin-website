import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, Settings, Activity, TrendingUp, BarChart2, RefreshCw, ClipboardList, Layers, Briefcase, Map } from 'lucide-react';
import './OperationsOptimizerCourse.css';

// Import local images
import OperationsOptimizerHeroImg from '../assets/operations_optimizer_hero.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.webp';
import TataLogo from '../assets/tata_logo.webp';

// Tool Logos
import JiraLogo from '../assets/jira_logo.webp';
import ConfluenceLogo from '../assets/confluence_logo.webp';
import ExcelLogo from '../assets/office_365_logo.webp';
import PowerBILogo from '../assets/power_bi_logo.svg';
import MiroLogo from '../assets/miro_logo.webp';

const OperationsOptimizerCourse = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('oo-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const sections = document.querySelectorAll('.oo-section');
        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="oo-course" id="top">

            {/* HERO */}
            <section
                className="oo-hero oo-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${OperationsOptimizerHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="oo-hero-content">
                    <span className="oo-badge">Processes · KPIs · Improvement</span>
                    <h1 className="oo-hero-title">
                        The Operations Optimizer
                    </h1>
                    <p className="oo-hero-sub">
                        Move from firefighting to predictable performance. Learn how to map operations, track the
                        right KPIs, remove bottlenecks and build routines that keep work flowing smoothly across
                        teams, shifts and locations.
                    </p>
                    <div className="oo-hero-meta">
                        <span>Key topics: Process Mapping, KPIs &amp; SLAs, Capacity, Continuous Improvement, Dashboards, Ops Tools</span>
                        <span>Professional Course · Duration as per institution (often 6–10 weeks)</span>
                        <span>Ideal for operations analysts, team leads, service delivery managers &amp; process improvement roles</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="oo-main oo-section">
                <div className="oo-main-inner">

                    {/* Left side */}
                    <div className="oo-left">

                        {/* About */}
                        <section className="oo-card">
                            <h2>About This Course</h2>
                            <div className="oo-about-text">
                                <p>
                                    The Operations Optimizer course focuses on how work actually flows through your
                                    organisation – from request to delivery – and how to make that flow more reliable,
                                    faster and less wasteful.
                                </p>
                                <p>
                                    You will learn to map processes, define KPIs and SLAs, analyse capacity and queues,
                                    and run practical improvement cycles. By the end, you’ll be able to design simple
                                    dashboards, standard operating procedures (SOPs) and routines that keep operations
                                    stable and continuously improving.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="oo-card">
                            <h2>Syllabus Overview</h2>

                            <details className="oo-module" open>
                                <summary>
                                    <div className="oo-module-title">
                                        <span className="mr-2 flex items-center"><Activity className="w-5 h-5 text-blue-600" /></span>
                                        <span className="oo-module-label">Module 1</span>
                                        <span>Operations Foundations &amp; KPIs</span>
                                    </div>
                                </summary>
                                <div className="oo-module-content">
                                    <ul>
                                        <li>The role of Operations – from customer promise to day‑to‑day execution</li>
                                        <li>Value Streams &amp; Customer Journeys – how work really flows end‑to‑end</li>
                                        <li>KPIs, SLAs &amp; Targets – choosing what to measure (and what to ignore)</li>
                                        <li>Basics of Flow, Bottlenecks &amp; Capacity – queues, wait times, utilisation</li>
                                        <li>Daily Control – checklists, huddles, visual boards (concepts)</li>
                                        <li>Exercise: Design a simple KPI &amp; SLA scorecard for an operations team</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="oo-module">
                                <summary>
                                    <div className="oo-module-title">
                                        <span className="mr-2 flex items-center"><Settings className="w-5 h-5 text-blue-600" /></span>
                                        <span className="oo-module-label">Module 2</span>
                                        <span>Process Mapping &amp; Improvement</span>
                                    </div>
                                </summary>
                                <div className="oo-module-content">
                                    <ul>
                                        <li>Process Mapping – SIPOC, swimlanes, AS‑IS / TO‑BE views (concepts)</li>
                                        <li>Finding Waste – rework, hand‑offs, delays, failure points</li>
                                        <li>Root Cause Thinking – 5 Whys, simple cause‑and‑effect diagrams</li>
                                        <li>Standard Work &amp; SOPs – creating clear, usable instructions</li>
                                        <li>Change Impact – people, systems, risks and controls</li>
                                        <li>Exercise: Map a real process and identify 3–5 concrete improvement ideas</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="oo-module">
                                <summary>
                                    <div className="oo-module-title">
                                        <span className="mr-2 flex items-center"><BarChart2 className="w-5 h-5 text-blue-600" /></span>
                                        <span className="oo-module-label">Module 3</span>
                                        <span>Data, Dashboards &amp; Execution</span>
                                    </div>
                                </summary>
                                <div className="oo-module-content">
                                    <ul>
                                        <li>Operations Data – tickets, orders, calls, transactions, defects</li>
                                        <li>Simple Analysis – volumes, trends, seasonality, backlog &amp; ageing</li>
                                        <li>Dashboards &amp; Reports – turning data into decisions and actions</li>
                                        <li>Running Cadences – daily / weekly reviews, action tracking, follow‑through</li>
                                        <li>Ops Documentation – SOPs, run‑books, playbooks, shift‑hand‑over notes</li>
                                        <li>Exercise: Build a one‑page “Operations Control Board” concept</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ industries (IT services, banking
                                        operations, logistics, manufacturing, shared services, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="oo-module">
                                <summary>
                                    <div className="oo-module-title">
                                        <span className="mr-2 flex items-center"><ClipboardList className="w-5 h-5 text-blue-600" /></span>
                                        <span className="oo-module-label">Practice</span>
                                        <span>Templates, Case Studies &amp; Ops Playbook</span>
                                    </div>
                                </summary>
                                <div className="oo-module-content">
                                    <ul>
                                        <li>Process map samples, KPI scorecards, SOP and checklist templates</li>
                                        <li>Case study: stabilising a “firefighting” operation with simple routines</li>
                                        <li>Creating your personal “Operations Optimization Playbook”</li>
                                    </ul>
                                </div>
                            </details>
                        </section>
                    </div>

                    {/* Right side */}
                    <aside className="oo-right">
                        <section className="oo-card">
                            <h2>Course Details</h2>
                            <ul className="oo-detail-list">
                                <li className="oo-detail-item">
                                    <div className="oo-detail-icon"><Clock size={20} /></div>
                                    <div className="oo-detail-text">
                                        <strong>Course Type &amp; Duration</strong>
                                        <span>The Operations Optimizer Course · Duration as per institution (commonly 6–10 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="oo-detail-item">
                                    <div className="oo-detail-icon"><Users size={20} /></div>
                                    <div className="oo-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Operations analysts, team leaders, service delivery managers, process excellence / improvement roles and professionals running day‑to‑day operations.</span>
                                    </div>
                                </li>
                                <li className="oo-detail-item">
                                    <div className="oo-detail-icon"><Target size={20} /></div>
                                    <div className="oo-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Mapping processes, defining KPIs &amp; SLAs, analysing capacity and queues, running improvement cycles and standardising work.</span>
                                    </div>
                                </li>
                                <li className="oo-detail-item">
                                    <div className="oo-detail-icon"><Zap size={20} /></div>
                                    <div className="oo-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with practical tools to visualise operations, reduce firefighting, improve turnaround times and keep teams aligned on the right metrics.</span>
                                    </div>
                                </li>
                                <li className="oo-detail-item">
                                    <div className="oo-detail-icon"><Star size={20} /></div>
                                    <div className="oo-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often valued for its “real‑floor” focus – checklists, examples and routines that match actual day‑to‑day operations work.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="oo-cta-btn">View Modules &amp; Ops Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="oo-companies oo-section">
                <div className="oo-companies-inner">
                    <h2>Where Operations Skills Are in Demand</h2>
                    <p>Operations optimisation skills are needed in IT services, banking operations, logistics, BPO / shared services, manufacturing, retail, healthcare and more.</p>
                    <div className="oo-logo-row">
                        <div className="oo-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="oo-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="oo-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="oo-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="oo-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="oo-logo-card">
                            <img src={LandTLogo} alt="L&T" />
                        </div>
                        <div className="oo-logo-card">
                            <img src={TataLogo} alt="Tata Group" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="oo-highlights oo-section">
                <div className="oo-highlights-inner">
                    <div>
                        <div className="oo-highlights-heading">
                            <h2>What You Will Gain as an Operations Optimizer</h2>
                            <p>Shift from just “keeping things running” to actively designing how work flows.</p>
                        </div>

                        <div className="oo-highlight-grid">
                            <div className="oo-highlight-card">
                                <div className="oo-highlight-icon"><Layers size={24} /></div>
                                <h3>Process Clarity</h3>
                                <p>See how work really moves across teams and systems, not just how it “should” work.</p>
                            </div>
                            <div className="oo-highlight-card">
                                <div className="oo-highlight-icon"><Target size={24} /></div>
                                <h3>KPI Discipline</h3>
                                <p>Choose a small set of KPIs &amp; SLAs that drive behaviour and highlight issues early.</p>
                            </div>
                            <div className="oo-highlight-card">
                                <div className="oo-highlight-icon"><RefreshCw size={24} /></div>
                                <h3>Continuous Improvement</h3>
                                <p>Use simple improvement cycles to reduce defects, delays and rework over time.</p>
                            </div>
                            <div className="oo-highlight-card">
                                <div className="oo-highlight-icon"><BarChart2 size={24} /></div>
                                <h3>Data‑Driven Actions</h3>
                                <p>Translate raw operations data into practical dashboards and decisions.</p>
                            </div>
                            <div className="oo-highlight-card">
                                <div className="oo-highlight-icon"><Activity size={24} /></div>
                                <h3>Cross‑Functional Flow</h3>
                                <p>Improve hand‑offs between teams, shifts and locations with clear ownership.</p>
                            </div>
                            <div className="oo-highlight-card">
                                <div className="oo-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build artefacts – maps, SOPs, dashboards – that support ops and improvement roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="oo-highlights-visual">
                        <div className="oo-dashboard">
                            <div className="oo-dashboard-header">
                                <span>Operations Control Board</span>
                                <div className="oo-dashboard-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className="oo-dashboard-graph">
                                <div className="oo-dashboard-bar"></div>
                                <div className="oo-dashboard-bar"></div>
                                <div className="oo-dashboard-bar"></div>
                                <div className="oo-dashboard-bar"></div>
                                <div className="oo-dashboard-bar"></div>
                            </div>
                            <div className="oo-dashboard-tags">
                                <span>Throughput</span>
                                <span>SLAs</span>
                                <span>Queues</span>
                                <span>Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="oo-tools oo-section">
                <div className="oo-tools-inner">
                    <h2>Tools &amp; Platforms You May Use</h2>
                    <p>Get comfortable with tools commonly used to track work, analyse performance and share SOPs.</p>

                    <div className="oo-tools-grid">
                        <div className="oo-tools-card">
                            <img className="oo-tools-logo" src={JiraLogo} alt="Jira" />
                            <span>Jira / Ticket Queues</span>
                        </div>
                        <div className="oo-tools-card">
                            <img className="oo-tools-logo" src={ConfluenceLogo} alt="Confluence" />
                            <span>Confluence / SOP Wikis</span>
                        </div>
                        <div className="oo-tools-card">
                            <img className="oo-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (Ops Data)</span>
                        </div>
                        <div className="oo-tools-card">
                            <img className="oo-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / Dashboards</span>
                        </div>
                        <div className="oo-tools-card">
                            <img className="oo-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / Process Maps</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – concepts focus on measurement, improvement and communication that can be applied in any tool.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="oo-more oo-section">
                <div className="oo-more-inner">
                    <div className="oo-more-header">
                        <h2>Your Operations Optimization Journey</h2>
                        <p>See how this course helps you grow into a confident, structured operations leader.</p>
                    </div>

                    <div className="oo-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="oo-more-card">
                            <div className="oo-more-top">
                                <div className="oo-more-icon"><TrendingUp size={20} /></div>
                                <div>
                                    <h3 className="oo-more-title">From Firefighting to Flow</h3>
                                    <p className="oo-more-text">
                                        Move beyond chasing escalations to designing processes, KPIs and routines that
                                        keep work flowing predictably day after day.
                                    </p>
                                </div>
                            </div>
                            <div className="oo-tool-logos">
                                <span className="oo-role-tag">Process Maps</span>
                                <span className="oo-role-tag">KPI Scorecards</span>
                                <span className="oo-role-tag">SOPs &amp; Checklists</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="oo-more-card">
                            <div className="oo-more-top">
                                <div className="oo-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="oo-more-title">Roles This Course Supports</h3>
                                    <p className="oo-more-text">
                                        Build skills relevant for core and adjacent operations and improvement roles.
                                    </p>
                                </div>
                            </div>
                            <div className="oo-roles-image">
                                <span className="oo-role-tag">Operations Analyst</span>
                                <span className="oo-role-tag">Service Delivery Manager</span>
                                <span className="oo-role-tag">Team Lead / Supervisor</span>
                                <span className="oo-role-tag">Process Excellence / CI</span>
                                <span className="oo-role-tag">Business / Ops Analyst</span>
                                <span className="oo-role-tag">PMO / Ops Coordinator</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="oo-more-card">
                            <div className="oo-more-top">
                                <div className="oo-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="oo-more-title">Course Journey</h3>
                                    <p className="oo-more-text">
                                        A step‑by‑step progression from understanding operations to leading improvement
                                        across teams.
                                    </p>
                                </div>
                            </div>
                            <div className="oo-journey">
                                <div className="oo-journey-step">Module 1: Understand your operations, value streams and KPIs &amp; SLAs.</div>
                                <div className="oo-journey-step">Module 2: Map and improve processes, reduce waste and standardise work.</div>
                                <div className="oo-journey-step">Module 3: Build dashboards, cadences and an Operations Playbook you can use on the job.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OperationsOptimizerCourse;
