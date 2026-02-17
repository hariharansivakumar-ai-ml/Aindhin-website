import { useEffect, useState } from 'react';
import {
    Clock, Users, Target, Zap, Award,
    Brain, Code, Cpu, Layers, Briefcase, TrendingUp, CheckCircle, Database
} from 'lucide-react';
import './AIMachineLearningCourse.css';

// Import local images
import AIMLHeroImg from '../assets/ai_ml_hero.jpg';

// Logos
import GoogleLogo from '../assets/google_logo.svg';
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import AmazonLogo from '../assets/amazon_logo.svg';
import IBMLogo from '../assets/ibm_logo.svg';
import TCSLogo from '../assets/tcs_logo.svg';
import AccentureLogo from '../assets/accenture_logo.svg';

import PythonLogo from '../assets/python_logo.svg';
import NumPyLogo from '../assets/numpy_logo.svg';
import PandasLogo from '../assets/pandas_logo.svg';
import ScikitLearnLogo from '../assets/scikit_learn_logo.svg';
import TensorFlowLogo from '../assets/tensorflow_logo.svg';
import PyTorchLogo from '../assets/pytorch_logo.png';
import JupyterLogo from '../assets/jupyter_logo.svg';
import GitHubLogo from '../assets/github_logo.svg';

const AIMachineLearningCourse = () => {

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
        <div className="fs-course" id="top">

            {/* HERO */}
            <section
                className="fs-hero fs-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${AIMLHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">AI &amp; Machine Learning Course</span>
                    <h1 className="fs-hero-title">
                        AI &amp; Machine Learning Course
                    </h1>
                    <p className="fs-hero-sub">
                        Learn the foundations of Artificial Intelligence and Machine Learning. Build skills in
                        Python, statistics, supervised &amp; unsupervised learning, deep learning basics and model
                        deployment to solve real‑world problems.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Python, Stats, ML Algorithms, Deep Learning Basics, Projects</span>
                        <span>Professional Course · Duration as per institution (often 4–6 months)</span>
                        <span>Beginner‑friendly · Ideal for students &amp; professionals · 4.7 / 5 learner feedback</span>
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
                                    This AI &amp; Machine Learning Course is designed to help you understand how computers
                                    learn from data. You start with Python, mathematics and statistics for ML, and
                                    gradually move into core algorithms like regression, classification, clustering and
                                    basic deep learning.
                                </p>
                                <p>
                                    Through hands‑on labs and projects, you will work with real‑world datasets, train and
                                    evaluate models, and present your results clearly. By the end of the course, you’ll
                                    be comfortable implementing ML workflows and prepared for entry‑level AI / ML,
                                    data science or advanced analytics roles, or for further specialised study.
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
                                        <span>Python, Maths &amp; ML Foundations</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Introduction to AI &amp; ML – terminology, applications &amp; workflow</li>
                                        <li>Python for Data Science – NumPy, pandas, Matplotlib / Seaborn</li>
                                        <li>Mathematics for ML – linear algebra &amp; calculus (conceptual focus)</li>
                                        <li>Statistics &amp; Probability for ML – distributions, estimation, tests</li>
                                        <li>Data Pre‑processing – cleaning, encoding, scaling &amp; train‑test splits</li>
                                        <li>Lab: Exploratory Data Analysis (EDA) on a real‑world dataset</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Supervised &amp; Unsupervised Learning</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Regression Algorithms – Linear, Polynomial, Regularised models</li>
                                        <li>Classification Algorithms – Logistic Regression, k‑NN, SVM, Trees</li>
                                        <li>Model Evaluation – accuracy, precision/recall, ROC‑AUC, cross‑validation</li>
                                        <li>Ensemble Methods – Random Forests, Gradient Boosting (intro)</li>
                                        <li>Unsupervised Learning – k‑Means, Hierarchical Clustering, PCA</li>
                                        <li>Lab: Build &amp; compare ML models on structured datasets</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Deep Learning Basics, Deployment &amp; Projects</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Neural Network Fundamentals – perceptron, activation functions, loss</li>
                                        <li>Deep Learning with Keras / TensorFlow (intro) – building simple models</li>
                                        <li>Working with Image / Text Data (conceptual &amp; basic hands‑on)</li>
                                        <li>Model Optimisation – tuning, regularisation, avoiding overfitting</li>
                                        <li>Intro to Model Deployment – saving, loading and using models in apps</li>
                                        <li>Lab: End‑to‑end ML / DL mini‑project with presentation</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Exact modules and tools may vary as per institution and curriculum.
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 3}>
                                <summary onClick={(e) => handleToggle(3, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Projects</span>
                                        <span>Hands‑on Assignments &amp; Capstones</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Regular lab‑based assignments in Python, EDA and model building</li>
                                        <li>Mini‑projects: prediction, classification &amp; clustering case studies</li>
                                        <li>Domain‑based projects (e.g. finance, marketing, healthcare datasets)</li>
                                        <li>Final capstone project: complete ML pipeline from problem to deployment (basic)</li>
                                        <li>Portfolio preparation – GitHub / online profile with your ML projects</li>
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
                                        <span>AI &amp; Machine Learning Course · Duration as per institution (commonly 4–6 months, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><CheckCircle size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Any graduate / final‑year student / working professional with basic programming / maths interest. Prior coding experience helps but is not mandatory.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Python, maths &amp; stats for ML, core ML algorithms, deep learning basics, projects and model deployment concepts.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students and professionals aiming for AI / ML, data science, analytics or product roles where ML is applied.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>4.7 / 5 average rating (concept clarity, practical labs, project‑based learning).</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Course Curriculum &amp; Project Path</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Top Sectors Using AI &amp; Machine Learning</h2>
                    <p>AI &amp; ML skills are used across tech, finance, healthcare, e‑commerce, manufacturing and more.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={IBMLogo} alt="IBM" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={TCSLogo} alt="TCS" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This AI &amp; ML Course</h2>
                            <p>Develop the ability to think in models, work with data and build predictive systems.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Brain size={24} /></div>
                                <h3>Mathematical Thinking</h3>
                                <p>Understand the intuition behind ML algorithms and why they work.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Code size={24} /></div>
                                <h3>Practical Python Skills</h3>
                                <p>Write efficient code to load data, engineer features and train models.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Cpu size={24} /></div>
                                <h3>Core ML Algorithms</h3>
                                <p>Apply regression, classification and clustering to structured data.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Layers size={24} /></div>
                                <h3>Deep Learning Basics</h3>
                                <p>Build and train simple neural networks for images or text (intro level).</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Database size={24} /></div>
                                <h3>Project Experience</h3>
                                <p>Complete end‑to‑end ML projects you can showcase to employers.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build a portfolio and skillset aligned with AI / ML and data roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Model Performance Snapshot</span>
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
                                <span>Accuracy</span>
                                <span>Precision</span>
                                <span>Recall</span>
                                <span>F1‑Score</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Libraries You May Work With</h2>
                    <p>Become comfortable with the core Python ecosystem for AI &amp; Machine Learning.</p>

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
                            <span>TensorFlow / Keras</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PyTorchLogo} alt="PyTorch" />
                            <span>PyTorch (where offered)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={JupyterLogo} alt="Jupyter" />
                            <span>Jupyter Notebook</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GitHubLogo} alt="GitHub" />
                            <span>Git &amp; GitHub</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers &amp; Learning Journey</h2>
                        <p>See how this AI &amp; ML Course builds your skills and prepares you for AI‑driven careers.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Brain size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Fundamentals to Practice</h3>
                                    <p className="fs-more-text">
                                        Move from maths, Python and basic models to end‑to‑end ML projects and
                                        introductory deep learning.
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
                                        Use your projects and portfolio to target AI / ML‑related entry‑level roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">ML Engineer (Junior)</span>
                                <span className="fs-role-tag">Data Scientist (Entry‑level)</span>
                                <span className="fs-role-tag">ML / Data Analyst</span>
                                <span className="fs-role-tag">AI Engineer (with further specialisation)</span>
                                <span className="fs-role-tag">Applied Scientist / Research Intern</span>
                                <span className="fs-role-tag">Product / Business Analyst (AI‑driven)</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><CheckCircle size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your Learning Journey</h3>
                                    <p className="fs-more-text">
                                        A clear, module‑wise roadmap from basics to ML projects and deployment concepts.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Python, maths &amp; stats, EDA &amp; ML foundations.</div>
                                <div className="fs-journey-step">Module 2: Core ML algorithms, evaluation, unsupervised learning.</div>
                                <div className="fs-journey-step">Module 3: Deep learning basics, optimisation, deployment &amp; capstone.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AIMachineLearningCourse;
