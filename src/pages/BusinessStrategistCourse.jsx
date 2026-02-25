import { useEffect, useState } from 'react';
import {
    Target, Lightbulb, Map, TrendingDown, Users,
    BarChart, Layers, Globe, Shield, Activity, Briefcase
} from 'lucide-react';
import './BusinessStrategistCourse.css';

// Import local images
import BusinessStrategistHeroImg from '../assets/business_strategist_hero.jpg';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.png';
import TataLogo from '../assets/tata_logo.png';

// Tool Logos
import ExcelLogo from '../assets/excel_logo.png';
import PowerBILogo from '../assets/power_bi_logo.svg';
import MiroLogo from '../assets/miro_logo.png';
import NotionLogo from '../assets/notion_logo.svg';
import PowerPointLogo from '../assets/powerpoint_logo.png';


const BusinessStrategistCourse = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('bs-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const sections = document.querySelectorAll('.bs-section');
        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    const [openModuleIndex, setOpenModuleIndex] = useState(0);

    const handleToggle = (index, e) => {
        e.preventDefault();
        setOpenModuleIndex(openModuleIndex === index ? null : index);
    };

    return (
        <div className="bs-course" id="top">

            {/* HERO */}
            <section
                className="bs-hero bs-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${BusinessStrategistHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="bs-hero-content">
                    <span className="bs-badge">Markets · Strategy · Value</span>
                    <h1 className="bs-hero-title">
                        The Business Strategist
                    </h1>
                    <p className="bs-hero-sub">
                        Learn how to understand markets and customers, analyse your business, and design clear,
                        practical strategies that create value – not just presentations. Turn insight into
                        choices that teams can execute.
                    </p>
                    <div className="bs-hero-meta">
                        <span>Key topics: Strategy Basics, Market &amp; Customer Insight, Business Models, Prioritisation, Metrics, Storytelling</span>
                        <span>Professional Course · Duration as per institution (often 4–8 weeks)</span>
                        <span>Ideal for product &amp; business managers, senior analysts, consultants, PMO / transformation &amp; emerging leaders</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="bs-main bs-section">
                <div className="bs-main-inner">

                    {/* Left side */}
                    <div className="bs-left">

                        {/* About */}
                        <section className="bs-card">
                            <h2>About This Course</h2>
                            <div className="bs-about-text">
                                <p>
                                    The Business Strategist course helps you move from reacting to problems to shaping
                                    where the business should go. It focuses on practical strategy – grounded in
                                    customer and market insight, business models and simple numbers.
                                </p>
                                <p>
                                    You will learn to analyse your business context, define strategic options, choose
                                    where to focus and tell the story in a way that leadership and teams can act on.
                                    By the end, you’ll have a toolkit to structure strategic discussions and shape
                                    roadmaps, not just execute them.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="bs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="bs-module" open={openModuleIndex === 0}>
                                <summary onClick={(e) => handleToggle(0, e)}>
                                    <div className="bs-module-title">
                                        <span className="bs-module-label">Start</span>
                                        <span>Foundations of Strategic Thinking</span>
                                    </div>
                                </summary>
                                <div className="bs-module-content">
                                    <ul>
                                        <li><strong>Strategy Fundamentals:</strong> What is strategy? Difference between strategy and tactics.</li>
                                        <li><strong>Industry Analysis:</strong> Porter’s Five Forces, PESTEL analysis, spotting trends.</li>
                                        <li><strong>Business Models:</strong> Value propositions, customer segments, revenue streams.</li>
                                        <li><strong>Competitive Advantage:</strong> Cost leadership vs. differentiation, VRIO framework.</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="bs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="bs-module-title">
                                        <span className="bs-module-label">Growth</span>
                                        <span>Growth, Innovation & Decision Making</span>
                                    </div>
                                </summary>
                                <div className="bs-module-content">
                                    <ul>
                                        <li><strong>Growth Strategies:</strong> Market penetration, expansion, diversification, M&A basics.</li>
                                        <li><strong>Innovation Strategy:</strong> Disruptive vs. sustaining innovation, Blue Ocean Strategy.</li>
                                        <li><strong>Strategic Decision Making:</strong> Using data, avoiding bias, scenario planning.</li>
                                        <li><strong>Managing Uncertainty:</strong> Risk assessment and mitigation in volatile markets.</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="bs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="bs-module-title">
                                        <span className="bs-module-label">Execution</span>
                                        <span>Strategy Execution & Leadership</span>
                                    </div>
                                </summary>
                                <div className="bs-module-content">
                                    <ul>
                                        <li><strong>Translating Strategy to Action:</strong> OKRs, KPIs, Balanced Scorecard.</li>
                                        <li><strong>Organizational Alignment:</strong> Structure, culture and change management.</li>
                                        <li><strong>Leadership & Communication:</strong> Getting buy‑in, influencing stakeholders.</li>
                                        <li><strong>Capstone Project:</strong> Analyse a company and propose a strategic roadmap.</li>
                                    </ul>
                                </div>
                            </details>
                        </section>
                    </div>

                    {/* Right side */}
                    <aside className="bs-right">
                        <section className="bs-card">
                            <h2>Course Details</h2>
                            <ul className="bs-detail-list">
                                <li className="bs-detail-item">
                                    <div className="bs-detail-icon"><Briefcase size={20} /></div>
                                    <div className="bs-detail-text">
                                        <strong>Course Type & Duration</strong>
                                        <span>The Business Strategist Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="bs-detail-item">
                                    <div className="bs-detail-icon"><Users size={20} /></div>
                                    <div className="bs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Undergraduate/Graduate students, early-career professionals, or entrepreneurs. No strict prerequisite.</span>
                                    </div>
                                </li>
                                <li className="bs-detail-item">
                                    <div className="bs-detail-icon"><Target size={20} /></div>
                                    <div className="bs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Strategic Analysis, Growth Models, Competitive Advantage, Decision Frameworks, Execution.</span>
                                    </div>
                                </li>
                                <li className="bs-detail-item">
                                    <div className="bs-detail-icon"><Globe size={20} /></div>
                                    <div className="bs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Anyone looking to understand "the big picture" of business – consultants, managers, founders.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="bs-cta-btn">View Modules &amp; Strategy Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="bs-companies bs-section">
                <div className="bs-companies-inner">
                    <h2>Where Business Strategists Are in Demand</h2>
                    <p>Strategic skills are needed in technology, banking &amp; financial services, consulting, telecom,
                        manufacturing, healthcare, retail, startups, shared services and the public sector.</p>
                    <div className="bs-logo-row">
                        <div className="bs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="bs-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="bs-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="bs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="bs-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="bs-logo-card">
                            <img src={LandTLogo} alt="L&T" />
                        </div>
                        <div className="bs-logo-card">
                            <img src={TataLogo} alt="Tata Group" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="bs-highlights bs-section">
                <div className="bs-highlights-inner">
                    <div>
                        <div className="bs-highlights-heading">
                            <h2>What You Will Gain as a Business Strategist</h2>
                            <p>Move from reacting to shaping – with a clearer view of where to play and how to win.</p>
                        </div>

                        <div className="bs-highlight-grid">
                            <div className="bs-highlight-card">
                                <div className="bs-highlight-icon"><Target size={24} /></div>
                                <h3>Strategic Clarity</h3>
                                <p>Explain where your business or product stands, and what the real choices are.</p>
                            </div>
                            <div className="bs-highlight-card">
                                <div className="bs-highlight-icon"><Lightbulb size={24} /></div>
                                <h3>Innovation & Growth</h3>
                                <p>Identify new opportunities and business models (Blue Ocean, Disruption) beyond the core.</p>
                            </div>
                            <div className="bs-highlight-card">
                                <div className="bs-highlight-icon"><Map size={24} /></div>
                                <h3>Framework Mastery</h3>
                                <p>Apply SWOT, PESTEL, Porter’s 5 Forces and other tools to solve unstructured problems.</p>
                            </div>
                            <div className="bs-highlight-card">
                                <div className="bs-highlight-icon"><TrendingDown size={24} /></div>
                                <h3>Risk & Decisions</h3>
                                <p>Make better decisions under uncertainty by understanding risk, bias, and trade-offs.</p>
                            </div>
                            <div className="bs-highlight-card">
                                <div className="bs-highlight-icon"><Activity size={24} /></div>
                                <h3>Execution Focus</h3>
                                <p>Learn why strategies fail and how to use OKRs and KPIs to drive actual results.</p>
                            </div>
                            <div className="bs-highlight-card">
                                <div className="bs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Leadership View</h3>
                                <p>Think like a CXO – connecting dots between finance, marketing, and operations.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="bs-highlights-visual">
                        <div className="bs-dashboard">
                            <div className="bs-dashboard-header">
                                <span>Strategy Snapshot Board</span>
                                <div className="bs-dashboard-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className="bs-dashboard-graph">
                                <div className="bs-dashboard-bar"></div>
                                <div className="bs-dashboard-bar"></div>
                                <div className="bs-dashboard-bar"></div>
                                <div className="bs-dashboard-bar"></div>
                                <div className="bs-dashboard-bar"></div>
                            </div>
                            <div className="bs-dashboard-tags">
                                <span>Market</span>
                                <span>Model</span>
                                <span>Options</span>
                                <span>Roadmap</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="bs-tools bs-section">
                <div className="bs-tools-inner">
                    <h2>Tools &amp; Frameworks You May Use</h2>
                    <p>Use analysis and collaboration tools to explore options, numbers and narratives.</p>

                    <div className="bs-tools-grid">
                        <div className="bs-tools-card">
                            <img className="bs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (analysis &amp; scenarios)</span>
                        </div>
                        <div className="bs-tools-card">
                            <img className="bs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / dashboards &amp; KPIs</span>
                        </div>
                        <div className="bs-tools-card">
                            <img className="bs-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / strategy &amp; model maps</span>
                        </div>
                        <div className="bs-tools-card">
                            <img className="bs-tools-logo" src={NotionLogo} alt="Notion" />
                            <span>Notion / strategy docs &amp; hubs</span>
                        </div>
                        <div className="bs-tools-card">
                            <img className="bs-tools-logo" src={PowerPointLogo} alt="PowerPoint" />
                            <span>PowerPoint / decks &amp; narratives</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – the focus is on strategy patterns and frameworks
                        that can be applied in any toolset.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="bs-more bs-section">
                <div className="bs-more-inner">
                    <div className="bs-more-header">
                        <h2>Your Business Strategy Journey</h2>
                        <p>See how this course helps you grow from “good operator” to “strategic partner”.</p>
                    </div>

                    <div className="bs-more-grid">
                        {/* Card 1: Skill overview */}
                        <div className="bs-more-card">
                            <div className="bs-more-top">
                                <div className="bs-more-icon"><Brain size={24} /></div>
                                <div>
                                    <h3 className="bs-more-title">Think Like a CEO</h3>
                                    <p className="bs-more-text">
                                        Move beyond functional silos. Understand how successful companies win, how they pivot,
                                        and how they sustain growth over time.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="bs-more-card">
                            <div className="bs-more-top">
                                <div className="bs-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="bs-more-title">Career Edge</h3>
                                    <p className="bs-more-text">
                                        Valuable for Consulting, BizOps, Product Strategy, and Entrepreneurship roles.
                                    </p>
                                </div>
                            </div>
                            <div className="bs-roles-image">
                                <span className="bs-role-tag">Strategy Analyst</span>
                                <span className="bs-role-tag">Business Consultant</span>
                                <span className="bs-role-tag">Chief of Staff (CoS)</span>
                                <span className="bs-role-tag">Product Strategy</span>
                                <span className="bs-role-tag">Founder / Entrepreneur</span>
                            </div>
                        </div>

                        {/* Card 3: Application */}
                        <div className="bs-more-card">
                            <div className="bs-more-top">
                                <div className="bs-more-icon"><Layers size={24} /></div>
                                <div>
                                    <h3 className="bs-more-title">Applied Learning</h3>
                                    <p className="bs-more-text">
                                        Use real-world case studies (e.g., Netflix, Apple, Tesla) to apply frameworks
                                        and debate strategic choices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BusinessStrategistCourse;
