import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, Map, Layout, Scale, FileText, Compass, BarChart, Layers, ShieldAlert, MessageCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import './StrategicDecisionMakerCourse.css';

// Import local images
import StrategicDecisionHeroImg from '../assets/strategic_decision_maker_hero.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.webp';
import TataLogo from '../assets/tata_logo.webp';

// Tool Logos
import ConfluenceLogo from '../assets/confluence_logo.webp';
import ExcelLogo from '../assets/office_365_logo.webp';
import MiroLogo from '../assets/miro_logo.webp';
import PowerBILogo from '../assets/power_bi_logo.svg';


const StrategicDecisionMakerCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${StrategicDecisionHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Strategy · Decisions · Risk</span>
                    <h1 className="fs-hero-title">
                        The Strategic Decision‑Maker
                    </h1>
                    <p className="fs-hero-sub">
                        Help leaders move beyond instinct and opinion. Learn to frame problems clearly, analyse
                        data and risks, weigh options and communicate decisions that teams can understand,
                        support and execute.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Strategic Thinking, Problem Framing, Data‑Driven Insight, Risk &amp; Trade‑offs, Stakeholders, Decision Communication</span>
                        <span>Professional Course · Duration as per institution (often 4–8 weeks)</span>
                        <span>Ideal for managers, team leads, product &amp; project leaders, analysts &amp; aspiring decision‑makers</span>
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
                                    The Strategic Decision‑Maker course focuses on one core question: how do you make
                                    better decisions when the stakes are high and the information is incomplete?
                                </p>
                                <p>
                                    You will learn to frame problems, gather and interpret data, explore options,
                                    understand risks and communicate decisions with clarity. By the end, you’ll have a
                                    practical toolkit to move conversations from “I think” to “Here’s the case and the
                                    trade‑offs we’re choosing.”
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Map className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Strategic Thinking &amp; Problem Framing</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Decisions at Different Levels – operational, tactical, strategic</li>
                                        <li>Strategy vs Execution – connecting day‑to‑day choices to the bigger picture</li>
                                        <li>Problem Framing – symptom vs root cause, clarifying the real question</li>
                                        <li>Decision Context – constraints, time horizons, stakeholders and success criteria</li>
                                        <li>Cognitive Biases – common traps (confirmation, anchoring, groupthink)</li>
                                        <li>Exercise: Turn a vague problem into a clear decision brief with options</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Layout className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Structured Analysis &amp; Options</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Using Data in Decisions – what to measure, basic trends &amp; comparisons</li>
                                        <li>Simple Frameworks – SWOT‑style views, impact vs effort, priority matrices</li>
                                        <li>Option Building – generating, grouping and refining possible paths</li>
                                        <li>Trade‑offs &amp; Criteria – cost, risk, benefit, time, capability</li>
                                        <li>Scenario Thinking – “what if” views and guardrails for downside risk</li>
                                        <li>Exercise: Build a simple options‑and‑criteria table for a key decision</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Scale className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Risk, Stakeholders &amp; Decision Execution</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Risk Identification – what can go wrong, likelihood, impact</li>
                                        <li>Mitigation &amp; Contingency – reducing risk and planning “Plan B / C”</li>
                                        <li>Stakeholder Mapping – who is affected, who decides, who must be informed</li>
                                        <li>Decision Communication – crisp narratives, visuals and “why we chose this”</li>
                                        <li>Execution Discipline – decision logs, follow‑ups and learning from outcomes</li>
                                        <li>Exercise: Prepare a short decision note with context, choice and next steps</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ contexts (IT, operations, sales,
                                        product, projects, shared services, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><FileText className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Practice</span>
                                        <span>Decision Canvases, Cases &amp; Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Decision brief and decision log templates</li>
                                        <li>Case study: choosing between competing initiatives with limited capacity</li>
                                        <li>Creating your personal “Strategic Decision‑Making Playbook”</li>
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
                                        <span>The Strategic Decision‑Maker Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>People managers, team leads, product &amp; project leaders, business analysts, operations managers and aspiring leaders responsible for decisions.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Strategic thinking, problem framing, data‑informed analysis, evaluation of options, risk management and decision communication.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with practical tools to structure decisions, involve the right people, and document clear choices, trade‑offs and next steps.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Star size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often appreciated for making “strategy and decisions” feel concrete, with templates that can be used immediately in real meetings.</span>
                                    </div>
                                </li>
                            </ul>

                            <Link to="/contact-us" className="fs-cta-btn">View Modules &amp; Decision Toolkit</Link>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Strategic Decision‑Makers Are Needed</h2>
                    <p>Strategic decision‑making skills are valuable in technology, banking &amp; financial services,
                        consulting, manufacturing, retail, telecom, shared services and the public sector.</p>
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
                            <h2>What You Will Gain as a Strategic Decision‑Maker</h2>
                            <p>Move from “gut feel and slides” to structured, transparent decision‑making.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Compass size={24} /></div>
                                <h3>Problem Framing</h3>
                                <p>Turn messy, ambiguous situations into clear decision questions with context.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BarChart size={24} /></div>
                                <h3>Data‑Aware Insight</h3>
                                <p>Use simple analysis and visuals to support your recommendations and trade‑offs.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Layers size={24} /></div>
                                <h3>Option Thinking</h3>
                                <p>Generate, compare and refine options instead of jumping to the first idea.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><ShieldAlert size={24} /></div>
                                <h3>Risk Balance</h3>
                                <p>Make choices that balance opportunity and risk, with clear mitigation plans.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><MessageCircle size={24} /></div>
                                <h3>Stakeholder Trust</h3>
                                <p>Explain the “why” behind decisions in a way that increases buy‑in and clarity.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build decision artefacts that demonstrate readiness for leadership roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Decision Overview Board</span>
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
                                <span>Context</span>
                                <span>Options</span>
                                <span>Risk</span>
                                <span>Decision</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Frameworks You May Use</h2>
                    <p>Get comfortable with practical tools to visualise data, options and decisions.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (analysis)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / dashboards</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / strategy maps</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ConfluenceLogo} alt="Confluence" />
                            <span>Confluence / decision logs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MicrosoftLogo} alt="Office tools" />
                            <span>Slides &amp; docs (narratives)</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – concepts focus on decision structure and
                        communication that can be applied in any tool.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your Strategic Decision‑Making Journey</h2>
                        <p>See how this course helps you grow into a calm, structured decision‑maker.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Noise to Clarity</h3>
                                    <p className="fs-more-text">
                                        Move from long, circular discussions to crisp decision briefs with context,
                                        options and recommendations.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Decision Briefs</span>
                                <span className="fs-role-tag">Option Matrices</span>
                                <span className="fs-role-tag">Risk Maps</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build decision‑making skills that strengthen your impact in many roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">People Manager</span>
                                <span className="fs-role-tag">Team / Function Lead</span>
                                <span className="fs-role-tag">Product / Project Manager</span>
                                <span className="fs-role-tag">Business Analyst</span>
                                <span className="fs-role-tag">Operations / Service Manager</span>
                                <span className="fs-role-tag">Aspiring Leader</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step progression from understanding decisions to leading them.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Learn strategic thinking and frame decisions clearly.</div>
                                <div className="fs-journey-step">Module 2: Use data, frameworks and options to structure choices.</div>
                                <div className="fs-journey-step">Module 3: Manage risk, align stakeholders and communicate decisions with confidence.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StrategicDecisionMakerCourse;
