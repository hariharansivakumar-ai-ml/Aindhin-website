import { useEffect, useState } from 'react';
import {
    Briefcase, TrendingUp, Users, Award,
    Target, BarChart, Globe, DollarSign, BookOpen, Layers, Lightbulb, PieChart
} from 'lucide-react';
import './BBACourse.css';
import BBAHeroImg from '../assets/BBA_scaled.jpg';

// Import Logos
import HDFCLogo from '../assets/hdfc_logo.svg';
import InfosysLogo from '../assets/infosys_logo.svg';
import AccentureLogo from '../assets/accenture_logo.svg';
import CapgeminiLogo from '../assets/capgemini_logo.svg';
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AllyFashionLogo from '../assets/allyfashion_logo.webp';
import IBMLogo from '../assets/ibm_logo.svg';
import ExcelLogo from '../assets/excel_logo.png';
import PowerPointLogo from '../assets/powerpoint_logo.svg';
import PowerBILogo from '../assets/power_bi_logo.svg';
import TableauLogo from '../assets/tableau_logo.png';
import GoogleAnalyticsLogo from '../assets/google_analytics_logo.svg';
import SalesforceLogo from '../assets/salesforce_logo.svg';
import SlackLogo from '../assets/slack_logo.png';
import TrelloLogo from '../assets/trello_logo.svg';


const BBACourse = () => {
    useEffect(() => {
        document.title = "BBA Degree: Bachelor of Business Administration | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Launch your management career with our BBA degree. Master marketing, finance, and entrepreneurship with case studies and industry-led projects.");
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
        <div className="fs-course">

            {/* HERO */}
            <section
                className="fs-hero fs-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${BBAHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">BBA · Bachelor of Business Administration</span>
                    <h1 className="fs-hero-title">
                        BBA Degree: Build Your Business Foundation for Management &amp; Leadership Excellence
                    </h1>
                    <p className="fs-hero-sub">
                        Build a strong foundation in business, management and leadership. Learn marketing, finance,
                        HR, business analytics and entrepreneurship through case studies, projects and presentations.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Program highlights: Marketing, Finance, HR, Business Analytics, Entrepreneurship Projects</span>
                        <span>UG Degree · 3 Years · Full‑time</span>
                        <span>Undergraduate · Ideal foundation for MBA & corporate careers · 4.6 / 5 alumni feedback</span>
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
                            <h2>About This Programme</h2>
                            <div className="fs-about-text">
                                <p>
                                    The BBA programme is designed to give you a comprehensive understanding of how
                                    modern businesses operate. You start with core subjects in management, accounting,
                                    economics and communication, and steadily advance into specialised areas such as
                                    marketing, finance, human resource management and business analytics.
                                </p>
                                <p>
                                    Classroom learning is integrated with case studies, presentations, group projects
                                    and industry exposure. By the end of three years, you will have the skills and
                                    confidence to step into entry‑level corporate roles, join a family business,
                                    start your own venture or pursue an MBA.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open={openModuleIndex === 0}>
                                <summary onClick={(e) => handleToggle(0, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 1</span>
                                        <span>Business & Management Foundations</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Principles of Management & Organizational Behaviour</li>
                                        <li>Business Economics (Micro & Macro)</li>
                                        <li>Financial Accounting & Cost Concepts</li>
                                        <li>Business Mathematics & Statistics Fundamentals</li>
                                        <li>Business Communication & Presentation Skills</li>
                                        <li>IT for Managers & MS Office applications</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 2</span>
                                        <span>Functional Areas & Analytics Basics</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Marketing Management (4Ps, consumer behaviour, branding)</li>
                                        <li>Financial Management & Corporate Finance basics</li>
                                        <li>Human Resource Management & Industrial Relations</li>
                                        <li>Operations & Supply Chain Management</li>
                                        <li>Business Research Methods & Data Analysis</li>
                                        <li>Introduction to Business Analytics & Dashboards</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 3</span>
                                        <span>Strategy, Electives & Entrepreneurship</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Strategic Management & Business Policy</li>
                                        <li>Services Marketing / Digital Marketing*</li>
                                        <li>Investment Management / Banking & Insurance*</li>
                                        <li>Advanced HR Practices / Training & Development*</li>
                                        <li>Business Analytics Applications & Reporting</li>
                                        <li>Entrepreneurship Development & Small Business Management</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Elective titles may vary as per university curriculum and academic regulations.
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 3}>
                                <summary onClick={(e) => handleToggle(3, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Projects</span>
                                        <span>Practical Exposure, Internships & Capstone</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Case study analyses and management games every semester</li>
                                        <li>Field projects in marketing, HR or operations</li>
                                        <li>Financial statement analysis of real‑world companies</li>
                                        <li>Business plan development & pitch presentations</li>
                                        <li>Internship / on‑the‑job training with project report</li>
                                        <li>Final‑year capstone in marketing, finance, HR or analytics</li>
                                    </ul>
                                </div>
                            </details>
                        </section>
                    </div>

                    {/* Right side */}
                    <aside className="fs-right">
                        <section className="fs-card">
                            <h2>Programme Details</h2>
                            <ul className="fs-detail-list">
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Briefcase size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Degree & Duration</strong>
                                        <span>Bachelor of Business Administration (BBA) · 3 years (6 semesters), full‑time</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>As per university norms (typically 10+2 or equivalent in any stream from a recognised board).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Marketing, Finance, Human Resource Management, Operations & Business Analytics.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><TrendingUp size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students aspiring for MBA, corporate careers, family business leadership or entrepreneurship.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Alumni Feedback</strong>
                                        <span>4.6 / 5 average feedback across batches (career support, teaching & campus experience).</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#enquiry" className="fs-cta-btn">View Program Details & Admission Process</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP COMPANIES */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Top Sectors Hiring BBA Graduates</h2>
                    <p>Business graduates are hired across FMCG, IT services, banking, consulting, e‑commerce and startups.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={HDFCLogo} alt="HDFC Bank" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={InfosysLogo} alt="Infosys" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={CapgeminiLogo} alt="Capgemini" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AllyFashionLogo} alt="Retail & FMCG" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={IBMLogo} alt="IBM" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA PROGRAM DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This BBA Programme</h2>
                            <p>Develop business acumen, analytical thinking and leadership skills for tomorrow’s workplaces.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Layers size={24} /></div>
                                <h3>Managerial Mindset</h3>
                                <p>Understand how different functions work together to achieve business goals.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Globe size={24} /></div>
                                <h3>Marketing Edge</h3>
                                <p>Learn branding, digital marketing basics, sales management and customer relationship skills.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><DollarSign size={24} /></div>
                                <h3>Financial Literacy</h3>
                                <p>Interpret financial statements, budgets and investment basics for better decision‑making.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Users size={24} /></div>
                                <h3>People Skills</h3>
                                <p>Gain exposure to recruitment, training, performance appraisal and labour laws.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BarChart size={24} /></div>
                                <h3>Business Analytics</h3>
                                <p>Use spreadsheets and BI tools to analyse data and present clear business insights.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Lightbulb size={24} /></div>
                                <h3>Entrepreneurial Thinking</h3>
                                <p>Develop business plans, study successful ventures and learn how to validate ideas.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Sales & Marketing Dashboard</span>
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
                                <span>Leads</span>
                                <span>Conversion</span>
                                <span>Regions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE PROGRAM (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools & Platforms You May Work With</h2>
                    <p>Become comfortable with the digital tools widely used in business, analytics and presentations.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="MS Excel" />
                            <span>MS Excel</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerPointLogo} alt="PowerPoint" />
                            <span>PowerPoint</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / BI tools</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={TableauLogo} alt="Tableau" />
                            <span>Tableau (visualisation)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GoogleAnalyticsLogo} alt="Google Analytics" />
                            <span>Google Analytics basics</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={SalesforceLogo} alt="Salesforce" />
                            <span>CRM platforms</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={SlackLogo} alt="Slack" />
                            <span>Team collaboration tools</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={TrelloLogo} alt="Trello" />
                            <span>Project management tools</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={IBMLogo} alt="IBM SPSS" />
                            <span>Statistical tools</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers & Learning Journey</h2>
                        <p>See how this BBA programme builds your skills over 3 years and prepares you for business roles.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><BookOpen size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Holistic Business Exposure</h3>
                                    <p className="fs-more-text">
                                        From core management and finance to marketing, HR and analytics, you experience
                                        all key business functions before choosing your area of interest.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <img className="fs-tool-logo" src={ExcelLogo} alt="Excel" />
                                <img className="fs-tool-logo" src={TableauLogo} alt="Tableau" />
                                <img className="fs-tool-logo" src={GoogleAnalyticsLogo} alt="Analytics" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                                    <p className="fs-more-text">
                                        Align your projects and internships to build a profile for high‑growth business roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Marketing Executive</span>
                                <span className="fs-role-tag">Business Development Associate</span>
                                <span className="fs-role-tag">HR Executive / Talent Acquisition</span>
                                <span className="fs-role-tag">Financial / Operations Analyst (Entry)</span>
                                <span className="fs-role-tag">Business Analyst (Junior)</span>
                                <span className="fs-role-tag">Entrepreneur / Family Business</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your 3‑Year Learning Journey</h3>
                                    <p className="fs-more-text">
                                        A semester‑wise roadmap from basic management concepts to strategic decision‑making.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Year 1: Foundations in management, economics, accounting & communication.</div>
                                <div className="fs-journey-step">Year 2: Marketing, finance, HR, operations and analytics basics with projects.</div>
                                <div className="fs-journey-step">Year 3: Strategy, electives, entrepreneurship, internship and capstone project.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BBACourse;
