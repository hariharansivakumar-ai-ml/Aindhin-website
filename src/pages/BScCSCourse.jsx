import { useEffect, useState } from 'react';
import {
    Code, Terminal, Brain, BarChart, Cloud,
    Briefcase, CheckCircle, Target, BookOpen, Layers
} from 'lucide-react';
import './BScCSCourse.css';
import BScHeroImg from '../assets/B_sc_scaled.webp';

// Import Logos
import GoogleLogo from '../assets/google_logo.svg';
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import AWSLogo from '../assets/aws_logo.svg';
import IBMLogo from '../assets/ibm_logo.svg';
import MetaLogo from '../assets/meta_logo.webp';
import NetflixLogo from '../assets/netflix_logo.svg';
import InfosysLogo from '../assets/infosys_logo.svg';
import AccentureLogo from '../assets/accenture_logo.svg';
import PythonLogo from '../assets/python_logo.svg';
import NumPyLogo from '../assets/numpy_logo.svg';
import PandasLogo from '../assets/pandas_logo.svg';
import ScikitLearnLogo from '../assets/scikit_learn_logo.svg';
import TensorFlowLogo from '../assets/tensorflow_logo.svg';
import JupyterLogo from '../assets/jupyter_logo.svg';
import PostgreSQLLogo from '../assets/postgresql_logo.svg';
import TableauLogo from '../assets/tableau_logo.webp';
import GitLogo from '../assets/git_logo.svg';

const BScCSCourse = () => {
    useEffect(() => {
        document.title = "B.Sc. Computer Science with AI & Data Science | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${BScHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">B.Sc. · Computer Science with AI & Data Science</span>
                    <h1 className="fs-hero-title">
                        B.Sc. Computer Science: Specialise in AI &amp; Data Science for the Digital Future
                    </h1>
                    <p className="fs-hero-sub">
                        Build strong computer science fundamentals while specialising in artificial intelligence
                        and data science. Learn Python, data structures, machine learning, analytics and cloud
                        concepts through labs, projects and an industry‑oriented capstone.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Program highlights: Python, Data Structures, Machine Learning, Data Analytics, Cloud Basics, Capstone Projects</span>
                        <span>UG Degree · 3 Years · Full‑time (as per Indian university norms)</span>
                        <span>NAAC‑accredited Indian University · 4.8 / 5 student satisfaction</span>
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
                                    The B.Sc. Computer Science with AI & Data Science programme blends core computer
                                    science with modern AI and analytics. You begin with strong foundations in programming,
                                    data structures, algorithms, databases, operating systems and computer networks.
                                </p>
                                <p>
                                    As you progress, you move into statistics, machine learning, deep learning, data
                                    visualisation and cloud fundamentals. Throughout the 3 years, you work on lab
                                    exercises, mini‑projects and a capstone project that demonstrates your ability to
                                    solve real‑world data and AI problems.
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
                                        <span>Programming & CS Foundations</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Problem solving and programming in Python</li>
                                        <li>Data Structures & Algorithms (arrays, lists, stacks, queues, trees, graphs)</li>
                                        <li>Discrete Mathematics & Linear Algebra foundations</li>
                                        <li>Computer Organisation & Operating System basics</li>
                                        <li>Relational Databases & SQL (design, queries, normalisation)</li>
                                        <li>Laboratory courses with weekly coding practice</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 2</span>
                                        <span>Data Science & Software Engineering</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Probability, Statistics & Exploratory Data Analysis</li>
                                        <li>Python for Data Science (NumPy, pandas, data wrangling)</li>
                                        <li>Data Visualisation using tools and libraries</li>
                                        <li>Object‑oriented programming & software engineering principles</li>
                                        <li>Web technologies and APIs for data‑driven applications</li>
                                        <li>Mini‑projects using real‑world datasets</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 3</span>
                                        <span>AI, Machine Learning & Advanced Analytics</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Supervised & unsupervised Machine Learning with Python</li>
                                        <li>Introduction to Deep Learning concepts</li>
                                        <li>Data Mining & Predictive Analytics</li>
                                        <li>Cloud & Big Data basics (concepts and commonly used services)</li>
                                        <li>AI ethics, security and responsible use of data</li>
                                        <li>Domain electives (e.g. NLP, Computer Vision, Business Analytics)*</li>
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
                                        <span>Labs, Mini‑Projects & Capstone</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Structured programming labs every semester</li>
                                        <li>Data analysis mini‑projects using public datasets</li>
                                        <li>Model building and evaluation assignments (classification, regression, clustering)</li>
                                        <li>Group project integrating data engineering, ML models and dashboards</li>
                                        <li>Final‑year capstone project with presentation and documentation</li>
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
                                        <span>Bachelor of Science (B.Sc.) in Computer Science with AI & Data Science · 3 years (6 semesters), full‑time</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>University & Accreditation</strong>
                                        <span>Offered by a NAAC‑accredited Indian university; curriculum aligned with current industry needs.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><CheckCircle size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>As per university norms (typically 10+2 or equivalent with Mathematics / relevant stream).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><BookOpen size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learning Mode</strong>
                                        <span>On‑campus classroom sessions, labs, tutorials and project‑based learning.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Strong CS fundamentals, AI & data science skills, cloud basics and a portfolio of projects.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#enquiry" className="fs-cta-btn">Enquire About Admissions & Fees</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP COMPANIES */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Top Companies Hiring for AI, Data & Software Roles</h2>
                    <p>Graduates with strong CS and data skills are in demand across product companies, IT services, startups and analytics firms.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AWSLogo} alt="AWS" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={IBMLogo} alt="IBM" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={MetaLogo} alt="Meta" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={NetflixLogo} alt="Netflix" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={InfosysLogo} alt="Infosys" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA PROGRAM DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Learn in This B.Sc. Programme</h2>
                            <p>Graduate with a balanced mix of computer science depth and practical AI & data skills.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Code size={24} /></div>
                                <h3>Strong CS Foundations</h3>
                                <p>Build expertise in programming, data structures, algorithms, OS, DBMS and computer networks.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Terminal size={24} /></div>
                                <h3>Python for Data</h3>
                                <p>Use Python and key libraries to clean, transform and analyse structured and unstructured data.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Brain size={24} /></div>
                                <h3>Machine Learning</h3>
                                <p>Understand core ML algorithms, model training, evaluation and deployment‑ready workflows.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BarChart size={24} /></div>
                                <h3>Analytics & BI</h3>
                                <p>Create dashboards and visual reports that turn raw data into business insights and decisions.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Cloud size={24} /></div>
                                <h3>Cloud Basics</h3>
                                <p>Learn cloud concepts, managed services and how AI and data solutions are deployed at scale.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Develop communication, teamwork and project skills needed for internships and placements.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Analytics Dashboard Snapshot</span>
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
                                <span>Data</span>
                                <span>Models</span>
                                <span>Accuracy</span>
                                <span>Insights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE PROGRAM (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools & Technologies You Will Use</h2>
                    <p>Get hands‑on with industry‑standard tools used in AI, data science and software development.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PythonLogo} alt="Python" />
                            <span>Python</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={NumPyLogo} alt="NumPy" />
                            <span>NumPy</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PandasLogo} alt="pandas" />
                            <span>pandas</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ScikitLearnLogo} alt="scikit-learn" />
                            <span>scikit‑learn</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={TensorFlowLogo} alt="TensorFlow" />
                            <span>TensorFlow (intro)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={JupyterLogo} alt="Jupyter" />
                            <span>Jupyter Notebook</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PostgreSQLLogo} alt="PostgreSQL" />
                            <span>SQL Databases</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={TableauLogo} alt="Tableau" />
                            <span>BI / Visualisation</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GitLogo} alt="Git" />
                            <span>Git & GitHub</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers & Learning Journey</h2>
                        <p>See how this B.Sc. programme builds your skills over 3 years and maps to in‑demand roles.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Tech stack overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Layers size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Integrated AI & Data Stack</h3>
                                    <p className="fs-more-text">
                                        Learn the modern stack for AI and data: Python, data processing, machine learning,
                                        model deployment concepts and dashboards for decision‑making.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <img className="fs-tool-logo" src={PythonLogo} alt="Python" />
                                <img className="fs-tool-logo" src={ScikitLearnLogo} alt="scikit-learn" />
                                <img className="fs-tool-logo" src={TensorFlowLogo} alt="TensorFlow" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                                    <p className="fs-more-text">
                                        Build a profile suitable for technical, analytics and AI‑focused entry‑level roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Data Analyst (Entry‑level)</span>
                                <span className="fs-role-tag">Machine Learning Engineer (Junior)</span>
                                <span className="fs-role-tag">Business Intelligence Analyst</span>
                                <span className="fs-role-tag">AI / Data Science Engineer</span>
                                <span className="fs-role-tag">Software Engineer – Data Platforms</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your 3‑Year Learning Journey</h3>
                                    <p className="fs-more-text">
                                        A semester‑wise roadmap from CS fundamentals to applied AI and analytics projects.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Year 1: Programming in Python, data structures, maths and CS fundamentals.</div>
                                <div className="fs-journey-step">Year 2: Databases, statistics, data science tools and software engineering.</div>
                                <div className="fs-journey-step">Year 3: Machine learning, AI topics, cloud basics and capstone project.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BScCSCourse;
