import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, Compass, PieChart, FlaskConical, ClipboardList, Lightbulb, Puzzle, Settings, Briefcase, Map, Layers } from 'lucide-react';
import './InnovationStrategyCourse.css';

// Import local images
import InnovationStrategyHeroImg from '../assets/innovation_strategy_hero.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.webp';
import TataLogo from '../assets/tata_logo.webp';

// Tool Logos
import MiroLogo from '../assets/miro_logo.webp';
import NotionLogo from '../assets/notion_logo.svg';
import JiraLogo from '../assets/jira_logo.webp';
import ExcelLogo from '../assets/office_365_logo.webp';
import PowerBILogo from '../assets/power_bi_logo.svg';


const InnovationStrategyCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${InnovationStrategyHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Vision · Portfolios · Experiments</span>
                    <h1 className="fs-hero-title">
                        Innovation Strategy
                    </h1>
                    <p className="fs-hero-sub">
                        Move from random ideas to a clear, repeatable innovation system. Learn how to set a
                        direction for innovation, build portfolios of bets, run experiments and scale what works
                        – all while staying connected to your core business.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Innovation Strategy, Portfolios, Business Models, Experiments, Governance, Metrics</span>
                        <span>Professional Course · Duration as per institution (often 6–10 weeks)</span>
                        <span>Ideal for product &amp; business leaders, strategy &amp; innovation teams, senior managers &amp; founders</span>
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
                                    The Innovation Strategy course helps you design how your organisation will create
                                    the next wave of value – not just this quarter, but over the next 2–5 years.
                                </p>
                                <p>
                                    You will learn how to link innovation to strategy, choose focus areas, manage a
                                    portfolio of initiatives, and run disciplined experiments. By the end, you’ll have
                                    a practical playbook for taking ideas from concept to validated bets, and for
                                    deciding what to stop, start or scale.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Compass className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Innovation Foundations &amp; Direction</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Why Innovate – disruption, competition, customer expectations, cost of “no change”</li>
                                        <li>Types of Innovation – product, service, process, business model, ecosystem</li>
                                        <li>Horizon Thinking – core, adjacent and transformational innovation (concepts)</li>
                                        <li>Strategic Themes – linking innovation to company vision and strategy</li>
                                        <li>Problem &amp; Opportunity Spaces – where to play and what to ignore (for now)</li>
                                        <li>Exercise: Define 2–3 strategic innovation themes for your context</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><PieChart className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Portfolios, Pipelines &amp; Business Models</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Innovation Portfolios – balancing risk, return, time horizons and capacity</li>
                                        <li>Idea to Initiative – funnels, stages and simple governance gates</li>
                                        <li>Prioritisation – impact vs effort, strategic fit, risk and learning potential</li>
                                        <li>Business Models – value proposition, customer segments, revenue &amp; cost basics</li>
                                        <li>Lean Business Cases – framing assumptions instead of long documents</li>
                                        <li>Exercise: Map a small innovation portfolio and prioritise a few key bets</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><FlaskConical className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Experiments, Scaling &amp; Governance</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>From Idea to Experiment – hypotheses, testable questions, success criteria</li>
                                        <li>Lean Experiments – prototypes, pilots, A/B tests and staged investments</li>
                                        <li>Metrics &amp; Innovation Accounting – learning metrics vs vanity metrics</li>
                                        <li>Scaling What Works – integration with core, change management, hand‑offs</li>
                                        <li>Governance &amp; Culture – roles, decision forums, incentives, storytelling</li>
                                        <li>Exercise: Design an experiment card for one innovation initiative</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ industries (IT &amp; digital, banking,
                                        manufacturing, services, startups, public sector, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><ClipboardList className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Practice</span>
                                        <span>Canvases, Cases &amp; Innovation Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Innovation canvases – opportunity, experiment, and simple portfolio views</li>
                                        <li>Case study: reshaping an innovation portfolio to fit strategy and capacity</li>
                                        <li>Creating your personal “Innovation Strategy Playbook”</li>
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
                                        <span>Innovation Strategy Course · Duration as per institution (commonly 6–10 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Product &amp; business leaders, strategy and innovation teams, senior managers, PMO / transformation roles and founders / intrapreneurs.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Strategic direction for innovation, portfolios, pipelines, experiments, metrics and governance that fit your organisation’s reality.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with a clearer view of where to innovate, how to choose bets and how to test, learn and scale in a structured way.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Star size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often valued for turning “innovation” from a buzzword into a concrete set of choices, portfolios and routines.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Modules &amp; Innovation Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Innovation Strategy Skills Are Needed</h2>
                    <p>Innovation strategy is relevant in technology, consulting, banking &amp; financial services,
                        telecom, manufacturing, healthcare, retail, startups and public sector programmes.</p>
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
                            <h2>What You Will Gain from Innovation Strategy</h2>
                            <p>Turn scattered initiatives into a focused, learning‑driven innovation system.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Compass size={24} /></div>
                                <h3>Strategic Clarity</h3>
                                <p>Define where innovation should focus – aligned to your organisation’s strategy.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><PieChart size={24} /></div>
                                <h3>Portfolio Thinking</h3>
                                <p>Balance core, adjacent and transformational bets instead of chasing single “big ideas”.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><FlaskConical size={24} /></div>
                                <h3>Experimentation Culture</h3>
                                <p>Use small, fast experiments to reduce risk before committing big budgets.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Puzzle size={24} /></div>
                                <h3>Business Model Insight</h3>
                                <p>Explore how new value propositions, revenue models and channels can work together.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Settings size={24} /></div>
                                <h3>Governance &amp; Metrics</h3>
                                <p>Set up simple decision forums and metrics that support learning, not just reporting.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build artefacts – portfolios, canvases, roadmaps – that support strategy &amp; innovation roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Innovation Portfolio Board</span>
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
                                <span>Core</span>
                                <span>Adjacent</span>
                                <span>Transform</span>
                                <span>Experiments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Use</h2>
                    <p>Work with tools commonly used to map portfolios, design experiments and track progress.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / Portfolio Maps</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={NotionLogo} alt="Notion" />
                            <span>Notion / Playbooks</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={JiraLogo} alt="Jira" />
                            <span>Jira / Initiative Tracking</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (Metrics)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / Dashboards</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – concepts focus on portfolios, experiments and
                        learning loops that can be implemented in many tools.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your Innovation Strategy Journey</h2>
                        <p>See how this course helps you build a practical, leadership‑ready view of innovation.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Layers size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Ideas to a System</h3>
                                    <p className="fs-more-text">
                                        Move beyond suggestion boxes and ad‑hoc pilots to a clear innovation system
                                        with themes, portfolios and learning loops.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Innovation Themes</span>
                                <span className="fs-role-tag">Portfolio Maps</span>
                                <span className="fs-role-tag">Experiment Cards</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build innovation strategy skills that complement leadership, product and
                                        transformation roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Head / Manager – Innovation</span>
                                <span className="fs-role-tag">Strategy &amp; Transformation</span>
                                <span className="fs-role-tag">Product &amp; Portfolio Leaders</span>
                                <span className="fs-role-tag">PMO / Change Leads</span>
                                <span className="fs-role-tag">Senior Business Managers</span>
                                <span className="fs-role-tag">Founders / Intrapreneurs</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step progression from understanding innovation strategy to shaping
                                        portfolios and experiments in your own context.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Set direction – why, where and how you will innovate.</div>
                                <div className="fs-journey-step">Module 2: Design portfolios and pipelines that match strategy and capacity.</div>
                                <div className="fs-journey-step">Module 3: Run experiments, set metrics and build your Innovation Playbook.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InnovationStrategyCourse;
