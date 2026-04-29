import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, DollarSign, PieChart, BarChart2, ClipboardList, ShieldCheck, Scale, Briefcase, Map, TrendingUp } from 'lucide-react';
import './FinanciallySavvyLeaderCourse.css';

// Import local images
import FinanciallySavvyHeroImg from '../assets/financially_savvy.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.webp';
import TataLogo from '../assets/tata_logo.webp';

// Tool Logos
import ExcelLogo from '../assets/office_365_logo.webp';
import PowerBILogo from '../assets/power_bi_logo.svg';
import PowerPointLogo from '../assets/powerpoint_logo.webp';
import NotionLogo from '../assets/notion_logo.svg';
import SAPLogo from '../assets/sap_logo.svg';


const FinanciallySavvyLeaderCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${FinanciallySavvyHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Numbers · Insight · Decisions</span>
                    <h1 className="fs-hero-title">
                        The Financially Savvy Leader
                    </h1>
                    <p className="fs-hero-sub">
                        Understand the story behind the numbers. Learn to read financial statements, speak the
                        language of finance and use simple analysis to make better decisions for your team,
                        product or business unit.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: P&amp;L, Balance Sheet, Cash Flow, KPIs, Budgets, Business Cases, ROI, Cost &amp; Value</span>
                        <span>Professional Course · Duration as per institution (often 4–8 weeks)</span>
                        <span>Ideal for managers, product &amp; business leaders, senior analysts, project / operations leads &amp; aspiring leaders</span>
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
                                    The Financially Savvy Leader course is designed for non‑finance professionals who
                                    need to make decisions that affect revenue, cost and profitability. It focuses on
                                    “business finance” – not accounting exams.
                                </p>
                                <p>
                                    You will learn how to read basic financial statements, understand key metrics, ask
                                    better questions and build simple business cases. By the end, you’ll feel more
                                    confident discussing numbers with finance, leadership and your own team.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><DollarSign className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Financial Fundamentals for Leaders</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Why Finance Matters for Non‑Finance Leaders – decisions, trade‑offs, accountability</li>
                                        <li>The Three Core Statements – P&amp;L, Balance Sheet, Cash Flow (concepts &amp; links)</li>
                                        <li>Key Concepts – revenue, gross margin, operating expenses, profit, assets, liabilities, equity</li>
                                        <li>Cash vs Profit – timing, working capital, basic cash‑flow thinking</li>
                                        <li>Reading a Simple P&amp;L – spotting trends, asking questions</li>
                                        <li>Exercise: Interpret a simplified P&amp;L and list 3–5 observations / questions</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><PieChart className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 2</span>
                                        <span>KPIs, Budgets &amp; Financial Decisions</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Financial KPIs – growth, margins, productivity, unit economics (concepts)</li>
                                        <li>Budgets &amp; Forecasts – how they’re built, what leaders should review</li>
                                        <li>Cost Thinking – fixed vs variable, direct vs indirect, simple cost allocation ideas</li>
                                        <li>Investment Decisions – payback, ROI, NPV (conceptual, non‑formula heavy)</li>
                                        <li>Project / Initiative Economics – benefits, costs, risks and assumptions</li>
                                        <li>Exercise: Build a simple “mini business case” for an initiative in your area</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Users className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Partnering with Finance &amp; Telling the Story</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Working with Finance – roles, expectations, how to prepare for discussions</li>
                                        <li>Variance Explanations – “what happened” vs “what we planned”</li>
                                        <li>Scenario &amp; Sensitivity Thinking – simple “what if” views for leaders</li>
                                        <li>Risk &amp; Controls – what leaders should watch for (conceptual)</li>
                                        <li>Financial Storytelling – turning tables into simple charts, bullets and asks</li>
                                        <li>Exercise: Prepare a one‑page financial “story” for your team / project / product</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ contexts (IT &amp; digital, banking
                                        operations, manufacturing, services, shared services, startups, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><ClipboardList className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Practice</span>
                                        <span>Templates, Cases &amp; Finance Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Statement “cheat sheets”, KPI scorecards and mini business case templates</li>
                                        <li>Case study: prioritising initiatives under budget constraints</li>
                                        <li>Creating your personal “Financially Savvy Leader Playbook”</li>
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
                                        <span>The Financially Savvy Leader Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Managers, product &amp; business leaders, senior analysts, project / programme managers, operations leaders and professionals who own budgets or financial outcomes.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Financial basics, reading statements, KPIs, budgeting, investment thinking, partnering with finance and telling the financial story.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with confidence to read simple financial reports, ask sharper questions, build mini business cases and connect day‑to‑day decisions to financial impact.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Star size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often valued for making “finance” accessible – no heavy formulas, just practical concepts and templates leaders can use.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Modules &amp; Finance Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Financially Savvy Leaders Are Needed</h2>
                    <p>Financially savvy leaders are in demand across technology, banking &amp; financial services,
                        consulting, telecom, manufacturing, retail, logistics, shared services and the public sector.</p>
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
                            <h2>What You Will Gain as a Financially Savvy Leader</h2>
                            <p>Use numbers as a decision tool, not a fear factor.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><ShieldCheck size={24} /></div>
                                <h3>Financial Confidence</h3>
                                <p>Feel more comfortable in discussions that involve revenue, cost, margins and budgets.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BarChart2 size={24} /></div>
                                <h3>Metric Literacy</h3>
                                <p>Know which KPIs matter for your area and how to interpret them at a glance.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Target size={24} /></div>
                                <h3>Decision Value</h3>
                                <p>Support decisions with simple numbers and assumptions, not just intuition.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Scale size={24} /></div>
                                <h3>Risk &amp; Frugality</h3>
                                <p>Balance ambition with cost, risk and cash‑flow awareness.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Users size={24} /></div>
                                <h3>Partnering with Finance</h3>
                                <p>Have better conversations with finance and leadership around plans and results.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Demonstrate that you can connect operations and strategy to financial impact.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Financial Snapshot</span>
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
                                <span>Revenue</span>
                                <span>Costs</span>
                                <span>Profit</span>
                                <span>Cash</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Frameworks You May Use</h2>
                    <p>Use simple tools to analyse numbers, track KPIs and communicate financial stories.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (P&amp;L &amp; KPIs)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / Dashboards</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerPointLogo} alt="PowerPoint" />
                            <span>PowerPoint / Financial Stories</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={NotionLogo} alt="Notion" />
                            <span>Notion / Playbooks &amp; Docs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={SAPLogo} alt="SAP" />
                            <span>ERP / Finance Systems*</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Actual finance / ERP tools vary by organisation. The course focuses on concepts that
                        apply regardless of specific software.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your Financial Savviness Journey</h2>
                        <p>See how this course helps you move from “numbers anxiety” to informed leadership.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><TrendingUp size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Fear to Fluency</h3>
                                    <p className="fs-more-text">
                                        Move beyond avoiding spreadsheets to using them as a simple tool for clarity
                                        and decision support.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Statement Cheat Sheets</span>
                                <span className="fs-role-tag">KPI Scorecards</span>
                                <span className="fs-role-tag">Mini Business Cases</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build financial acumen that enriches leadership, product, operations and
                                        transformation roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">People / Function Managers</span>
                                <span className="fs-role-tag">Product / Business Owners</span>
                                <span className="fs-role-tag">Senior Analysts</span>
                                <span className="fs-role-tag">Project / Programme Managers</span>
                                <span className="fs-role-tag">Operations / Service Leaders</span>
                                <span className="fs-role-tag">Aspiring Leaders</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step progression from understanding the basics to using finance as a
                                        lens for decisions.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Learn financial fundamentals and read simple statements.</div>
                                <div className="fs-journey-step">Module 2: Work with KPIs, budgets and investments in your context.</div>
                                <div className="fs-journey-step">Module 3: Partner with finance and tell clear financial stories.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FinanciallySavvyLeaderCourse;
