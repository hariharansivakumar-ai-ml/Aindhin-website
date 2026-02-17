import { useEffect, useState } from 'react';
import './DataAnalyticsCourse.css';

// Import local images
import DataHeroImg from '../assets/data_analytics.jpg';

// Logos
import ExcelLogo from '../assets/excel_logo.svg';
import PowerBILogo from '../assets/powerbi_logo.svg';
import TableauLogo from '../assets/tableau_logo.svg';
import PythonLogo from '../assets/python_logo.svg';
import RLogo from '../assets/r_logo.svg';
import MySQLLogo from '../assets/mysql_logo.svg';
import JupyterLogo from '../assets/jupyter_logo.svg';
import PandasLogo from '../assets/pandas_logo.svg';

import AccentureLogo from '../assets/accenture_logo.svg';
import DeloitteLogo from '../assets/deloitte_logo.svg';
import MuSigmaLogo from '../assets/musigma_logo.png';
import FractalLogo from '../assets/fractal_logo.png';
import IBMDataLogo from '../assets/ibm_data_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.svg';
import FlipkartLogo from '../assets/flipkart_logo.svg';

import {
    BarChart, PieChart, Database, TrendingUp, Search, FileText, Globe, Server, CheckCircle,
    Clock, Users, Target, Briefcase, Award, Map, Brain
} from 'lucide-react';

const DataAnalyticsCourse = () => {

    const [openModule, setOpenModule] = useState(1);

    const toggleModule = (id) => {
        setOpenModule(openModule === id ? null : id);
    };

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${DataHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Data Analytics Course</span>
                    <h1 className="fs-hero-title">
                        Data Analytics Course
                    </h1>
                    <p className="fs-hero-sub">
                        Master the art of turning raw data into actionable insights. Learn Excel, SQL,
                        Power BI / Tableau and Python / R to analyse trends, build dashboards and drive
                        business decisions.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Excel, SQL, Statistics, Python/R, Power BI / Tableau, Storytelling</span>
                        <span>Professional Course · Duration as per institution (often 4–6 months)</span>
                        <span>Beginner‑friendly · Ideal for students &amp; working professionals · 4.8 / 5 learner feedback</span>
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
                                    This Data Analytics Course takes you from a beginner to a job‑ready analyst. You will
                                    start with the fundamentals of data handling using Excel and SQL, move into
                                    statistical analysis and programming with Python or R, and finally master data
                                    visualisation with Power BI or Tableau.
                                </p>
                                <p>
                                    The curriculum focuses on solving real business problems. You will work on case
                                    studies from retail, finance and marketing, learning how to clean data, uncover
                                    patterns and present your findings effectively to stakeholders. By the end, you’ll
                                    have a portfolio of dashboards and analysis projects.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 1 ? 'active' : ''}`}
                                    onClick={() => toggleModule(1)}
                                >
                                    <div className="fs-module-title">
                                        <BarChart className="fs-module-icon" size={20} />
                                        <span>Module 1: Excel &amp; Statistics Fundamentals</span>
                                    </div>
                                    <span className="fs-module-toggle">{openModule === 1 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="fs-module-content"
                                    style={{
                                        maxHeight: openModule === 1 ? '500px' : '0px',
                                        opacity: openModule === 1 ? 1 : 0,
                                        padding: openModule === 1 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Introduction to Data Analytics – types of analysis, roles &amp; tools</li>
                                        <li>Advanced Excel – Pivot Tables, VLOOKUP, XLOOKUP, conditional formatting</li>
                                        <li>Data Cleaning &amp; Preparation in Excel</li>
                                        <li>Descriptive Statistics – mean, median, mode, variance, standard deviation</li>
                                        <li>Inferential Statistics Concepts – hypothesis testing, distributions (intro)</li>
                                        <li>Hands‑on: Analysing a sales dataset using Excel</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 2 ? 'active' : ''}`}
                                    onClick={() => toggleModule(2)}
                                >
                                    <div className="fs-module-title">
                                        <Database className="fs-module-icon" size={20} />
                                        <span>Module 2: SQL &amp; Data Management</span>
                                    </div>
                                    <span className="fs-module-toggle">{openModule === 2 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="fs-module-content"
                                    style={{
                                        maxHeight: openModule === 2 ? '500px' : '0px',
                                        opacity: openModule === 2 ? 1 : 0,
                                        padding: openModule === 2 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Relational Database Concepts – tables, keys, relationships</li>
                                        <li>SQL Basics – SELECT, FROM, WHERE, ORDER BY, LIMIT</li>
                                        <li>SQL Joins – INNER, LEFT, RIGHT, FULL joins explained</li>
                                        <li>Aggregations &amp; Grouping – GROUP BY, HAVING, aggregate functions</li>
                                        <li>Subqueries &amp; Common Table Expressions (CTEs)</li>
                                        <li>Hands‑on: Querying a customer database to answer business questions</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 3 ? 'active' : ''}`}
                                    onClick={() => toggleModule(3)}
                                >
                                    <div className="fs-module-title">
                                        <PieChart className="fs-module-icon" size={20} />
                                        <span>Module 3: Python/R &amp; Visualisation (Power BI / Tableau)</span>
                                    </div>
                                    <span className="fs-module-toggle">{openModule === 3 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="fs-module-content"
                                    style={{
                                        maxHeight: openModule === 3 ? '500px' : '0px',
                                        opacity: openModule === 3 ? 1 : 0,
                                        padding: openModule === 3 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Introduction to Python / R for Data Analysis (basics of Pandas/NumPy)</li>
                                        <li>Exploratory Data Analysis (EDA) – identifying trends &amp; outliers</li>
                                        <li>Data Visualisation Principles – choosing the right chart</li>
                                        <li>Introduction to Power BI or Tableau – loading data &amp; creating visuals</li>
                                        <li>Building Interactive Dashboards &amp; Stories</li>
                                        <li>Hands‑on: Creating a marketing performance dashboard</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Tool focus (Python/R, Power BI/Tableau) may vary as per institution and curriculum.
                                    </p>
                                </div>
                            </div>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 4 ? 'active' : ''}`}
                                    onClick={() => toggleModule(4)}
                                >
                                    <div className="fs-module-title">
                                        <Brain className="fs-module-icon" size={20} />
                                        <span>Projects: Case Studies &amp; Capstone</span>
                                    </div>
                                    <span className="fs-module-toggle">{openModule === 4 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="fs-module-content"
                                    style={{
                                        maxHeight: openModule === 4 ? '500px' : '0px',
                                        opacity: openModule === 4 ? 1 : 0,
                                        padding: openModule === 4 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Retail Analysis: Identifying top‑selling products and customer segments</li>
                                        <li>Finance: Understanding credit risk (exploratory analysis)</li>
                                        <li>Social Media: Analysing engagement metrics</li>
                                        <li>Capstone Project: End‑to‑end analysis from raw data to dashboard &amp; insights</li>
                                        <li>Portfolio preparation &amp; interview prep</li>
                                    </ul>
                                </div>
                            </div>
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
                                        <span>Data Analytics Course · Duration as per institution (often 4–6 months, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Any graduate / final‑year student / working professional. No prior coding experience required (logic &amp; math basics helpful).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Excel for analytics, SQL querying, statistical thinking, Python/R basics and visualisation (Power BI / Tableau).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Briefcase size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students and professionals wanting to become Data Analysts, Business Analysts or MI Reporting Specialists.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>4.8 / 5 average rating (comprehensive curriculum, hands‑on projects &amp; practical applicability).</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Course Curriculum &amp; Career Path</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Top Companies Hiring Data Analysts</h2>
                    <p>From tech giants to consulting firms, every industry needs data professionals.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={DeloitteLogo} alt="Deloitte" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={MuSigmaLogo} alt="Mu Sigma" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={FractalLogo} alt="Fractal Analytics" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={IBMDataLogo} alt="IBM" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={FlipkartLogo} alt="Flipkart" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This Data Analytics Course</h2>
                            <p>Develop a complete toolkit to extract value from data.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BarChart size={24} /></div>
                                <h3>Data Fluency</h3>
                                <p>Understand data types, structures and how to handle dirty or missing data.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Database size={24} /></div>
                                <h3>SQL Skills</h3>
                                <p>Write efficient queries to extract and manipulate data from relational databases.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Strong Statistical Base</h3>
                                <p>Build a clear understanding of descriptive and inferential statistics for data‑driven decisions.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><PieChart size={24} /></div>
                                <h3>Visual Storytelling</h3>
                                <p>Create compelling dashboards in Power BI or Tableau that stakeholders can understand.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Search size={24} /></div>
                                <h3>Analytical Thinking</h3>
                                <p>Learn how to approach business problems and ask the right questions of your data.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Job Readiness</h3>
                                <p>Build a project portfolio that demonstrates your ability to deliver insights.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Sales Performance Dashboard</span>
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
                                <span>Units</span>
                                <span>Growth</span>
                                <span>Region</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Work With</h2>
                    <p>Become proficient in the industry‑standard stack for data analysis.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Microsoft Excel (Advanced)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MySQLLogo} alt="MySQL" />
                            <span>SQL (MySQL / PostgreSQL)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Microsoft Power BI</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={TableauLogo} alt="Tableau" />
                            <span>Tableau</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PythonLogo} alt="Python" />
                            <span>Python</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PandasLogo} alt="Pandas" />
                            <span>Pandas &amp; NumPy</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={RLogo} alt="R" />
                            <span>R Programming</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={JupyterLogo} alt="Jupyter" />
                            <span>Jupyter Notebooks</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers &amp; Learning Journey</h2>
                        <p>See how this Data Analytics Course builds your skills and prepares you for data careers.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Data to Decisions</h3>
                                    <p className="fs-more-text">
                                        Move from basic spreadsheets to advanced querying, programming and visualisation
                                        to solve complex business problems.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <img className="fs-tool-logo" src={ExcelLogo} alt="Excel" />
                                <img className="fs-tool-logo" src={MySQLLogo} alt="SQL" />
                                <img className="fs-tool-logo" src={PowerBILogo} alt="Power BI" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                                    <p className="fs-more-text">
                                        Use your course projects to showcase your skills for entry‑level data roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Junior Data Analyst</span>
                                <span className="fs-role-tag">Business Analyst</span>
                                <span className="fs-role-tag">MI / Reporting Analyst</span>
                                <span className="fs-role-tag">Operations Analyst</span>
                                <span className="fs-role-tag">Data Quality Associate</span>
                                <span className="fs-role-tag">Pathway to Data Science roles</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your Learning Journey</h3>
                                    <p className="fs-more-text">
                                        A clear module‑wise roadmap from data fundamentals to advanced visualisation.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Excel mastery, data cleaning &amp; statistical basics.</div>
                                <div className="fs-journey-step">Module 2: SQL querying, database concepts &amp; data extraction.</div>
                                <div className="fs-journey-step">Module 3: Visualisation (Power BI/Tableau), Python/R intro &amp; capstone.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DataAnalyticsCourse;
