import { useEffect, useState } from 'react';
import {
    Clock, Users, Target, Zap, Award,
    TrendingUp, BarChart, PieChart, Globe, BookOpen, Calculator, Landmark
} from 'lucide-react';
import './BAEconomicsCourse.css';
import BAHeroImg from '../assets/B_A_scaled.jpg';

// Import all logos
import RBILogo from '../assets/rbi_logo.svg';
import WorldBankLogo from '../assets/world_bank_logo.svg';
import IMFLogo from '../assets/imf_logo.svg';
import DeloitteLogo from '../assets/deloitte_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import IBMLogo from '../assets/ibm_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import PythonLogo from '../assets/python_logo.svg';
import RLogo from '../assets/r_logo.svg';
import RStudioLogo from '../assets/rstudio_logo.svg';
import ExcelLogo from '../assets/excel_logo.png';
import PowerBILogo from '../assets/power_bi_logo.svg';
import TableauLogo from '../assets/tableau_logo.png';
import JupyterLogo from '../assets/jupyter_logo.svg';

const BAEconomicsCourse = () => {
    useEffect(() => {
        document.title = "B.A. Economics with Data Analytics: Master Economic Science | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Earn your B.A. in Economics with a specialized focus on Data Analytics. Learn to interpret market trends and drive policy decisions with data-backed insights.");
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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${BAHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">B.A. · Economics with Data Analytics</span>
                    <h1 className="fs-hero-title">
                        B.A. Economics with Data Analytics: Master Economic Theory &amp; Data-Driven Decision Making
                    </h1>
                    <p className="fs-hero-sub">
                        Learn how economies work and how data shapes decisions. Build a strong foundation in micro
                        and macroeconomics, statistics, data analysis and policy studies, with a focus on the Indian
                        and global economy.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Program highlights: Micro & Macro Economics, Statistics, Data Analysis, Indian Economy, Policy Studies</span>
                        <span>UG Degree · 3 Years · Full‑time</span>
                        <span>Undergraduate · Ideal for policy, research & analytics careers · 4.7 / 5 student reviews</span>
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
                                    The B.A. Economics with Data Analytics programme blends rigorous economic theory with
                                    practical quantitative and data skills. You begin with foundations in microeconomics,
                                    macroeconomics, mathematics and statistics, and then move into econometrics, data
                                    analysis and policy‑oriented courses.
                                </p>
                                <p>
                                    Alongside studying the Indian and global economy, you learn how to work with real‑world
                                    datasets using tools such as spreadsheets and statistical software (R / Python / similar),
                                    interpret evidence and communicate insights. This makes you well‑prepared for careers in
                                    policy, research, analytics, consulting and higher studies in economics or public policy.
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
                                        <span>Micro &amp; Macro Economics</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Microeconomics – supply, demand, consumer behaviour &amp; market structures</li>
                                        <li>Macroeconomics – GDP, inflation, fiscal &amp; monetary policy</li>
                                        <li>Economic Indicators – reading and interpreting real‑world economic data</li>
                                        <li>Game Theory Basics – strategic decision making in business</li>
                                        <li>International Trade – comparative advantage, exchange rates &amp; globalisation</li>
                                        <li>Case Studies: Analysing recent economic events (e.g. recessions, policy shifts)</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Data Analysis &amp; Econometrics</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Introduction to Statistics – mean, median, mode, variance &amp; probability</li>
                                        <li>Econometrics – regression analysis to find relationships in data</li>
                                        <li>Data Tools – using Excel and basic Python / R for economic analysis</li>
                                        <li>Forecasting – time series analysis to predict future trends</li>
                                        <li>Data Visualisation – presenting economic insights clearly to stakeholders</li>
                                        <li>Lab: Analyse a public dataset (e.g. World Bank data) and present findings</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Financial Economics &amp; Policy</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Money &amp; Banking – central banks, commercial banks &amp; interest rates</li>
                                        <li>Public Finance – taxation, government spending &amp; budget deficits</li>
                                        <li>Development Economics – growth, inequality &amp; poverty reduction strategies</li>
                                        <li>Environmental Economics – cost‑benefit analysis of green policies</li>
                                        <li>Policy Analysis – evaluating the impact of government regulations</li>
                                        <li>Project: Write a policy brief or financial report on a current issue</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Curriculum aligns with standard B.A. Economics requirements with added data skills.
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 3}>
                                <summary onClick={(e) => handleToggle(3, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Career Skills</span>
                                        <span>Applying Economics in the Real World</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Economic writing and reporting for business audiences</li>
                                        <li>Understanding financial markets and investment basics</li>
                                        <li>Preparing for roles in banking, consulting, policy or data analysis</li>
                                        <li>Mock interviews and resume building for economics graduates</li>
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
                                    <div className="fs-detail-icon"><Clock size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Course Type &amp; Duration</strong>
                                        <span>B.A. Economics with Data Analytics · 3‑Year Undergraduate Degree (Semester System).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>10+2 (Higher Secondary) pass from any stream (Commerce / Science / Arts) with minimum qualifying marks. Maths / Stats background is a plus but not mandatory.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Core economic theory, econometrics, data analysis (Excel/R/Python), financial markets and policy research.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students interested in finance, policy, data science, consulting or detailed market analysis.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Students appreciate the “modern mix” of traditional theory with practical data skills needed in today’s job market.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Program Details & Admission Process</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Economics & Data Skills Are Valued</h2>
                    <p>Graduates can work with policy institutions, research organisations, consulting firms and analytics teams across sectors.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={RBILogo} alt="Reserve Bank of India" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={WorldBankLogo} alt="World Bank" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={IMFLogo} alt="IMF" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={DeloitteLogo} alt="Deloitte" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={IBMLogo} alt="Analytics & Tech Firms" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={GoogleLogo} alt="Tech & Data Companies" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Corporate Analytics Teams" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA PROGRAM DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This B.A. Economics with Data Analytics</h2>
                            <p>Develop the ability to think like an economist and work like a data analyst.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Landmark size={24} /></div>
                                <h3>Economic Foundations</h3>
                                <p>Master the principles of micro and macroeconomics that drive global markets.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BarChart size={24} /></div>
                                <h3>Data Analytics</h3>
                                <p>Learn to analyse trends and make forecasts using real‑world data tools.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Globe size={24} /></div>
                                <h3>Global Perspective</h3>
                                <p>Understand international trade, development and how economies interact.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Calculator size={24} /></div>
                                <h3>Financial Literacy</h3>
                                <p>Deep dive into banking, money markets and public finance.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BookOpen size={24} /></div>
                                <h3>Policy Analysis</h3>
                                <p>Learn to evaluate government policies and their impact on society.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Career Versatility</h3>
                                <p>Open doors to banking, government, research, NGOs and corporate strategy.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Economic Indicators Dashboard</span>
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
                                <span>GDP</span>
                                <span>Inflation</span>
                                <span>Employment</span>
                                <span>Trade</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools & Software You May Work With</h2>
                    <p>Gain exposure to widely‑used tools in economics, research and analytics.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PythonLogo} alt="Python" />
                            <span>Python (data analysis)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={RLogo} alt="R" />
                            <span>R (statistics & econometrics)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={RStudioLogo} alt="RStudio" />
                            <span>RStudio / IDEs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>MS Excel (spreadsheets)</span>
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
                            <img className="fs-tools-logo" src={JupyterLogo} alt="Jupyter" />
                            <span>Jupyter Notebook</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers & Learning Journey</h2>
                        <p>See how this programme builds your skills over 3 years and opens doors to policy, research and analytics roles.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><TrendingUp size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Theory Meets Practice</h3>
                                    <p className="fs-more-text">
                                        Don't just learn economic models; learn to test them with data and apply them to real business problems.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Excel</span>
                                <span className="fs-role-tag">R / Python Intro</span>
                                <span className="fs-role-tag">Economic Modelling</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Users size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Paths for Graduates</h3>
                                    <p className="fs-more-text">
                                        Economics graduates are highly valued for their analytical and critical thinking skills.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Financial Analyst</span>
                                <span className="fs-role-tag">Data Analyst</span>
                                <span className="fs-role-tag">Policy Researcher</span>
                                <span className="fs-role-tag">Market Research Analyst</span>
                                <span className="fs-role-tag">Banking Professional</span>
                                <span className="fs-role-tag">Consultant</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">3‑Year Roadmap</h3>
                                    <p className="fs-more-text">
                                        A structured journey from foundational concepts to advanced analysis and policy.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Year 1: Micro, Macro, Stats &amp; Maths for Economics.</div>
                                <div className="fs-journey-step">Year 2: Econometrics, Public Finance, Development &amp; Data Tools.</div>
                                <div className="fs-journey-step">Year 3: International Economics, Environmental Policy &amp; Research Project.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BAEconomicsCourse;
