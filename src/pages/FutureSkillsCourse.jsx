import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, Globe, Bot, Brain, ClipboardList, TrendingUp, Cpu, Sparkles, RefreshCw, Briefcase, Map, Layers } from 'lucide-react';
import './FutureSkillsCourse.css';

// Import local images
import FutureSkillsHeroImg from '../assets/future_skills_hero.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.webp';
import TataLogo from '../assets/tata_logo.webp';

// Tool Logos
import OpenAILogo from '../assets/openai_logo.webp';
import ExcelLogo from '../assets/excel_logo.png';
import MiroLogo from '../assets/miro_logo.webp';
import JiraLogo from '../assets/jira_logo.webp';


const FutureSkillsCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${FutureSkillsHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Work · AI · Automation</span>
                    <h1 className="fs-hero-title">
                        Future Skills &amp; Automation
                    </h1>
                    <p className="fs-hero-sub">
                        Prepare for the next decade of work. Learn the human skills, digital tools and automation
                        mindset that will help you stay relevant, work with AI and bots, and design smarter ways
                        of getting things done.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Future of Work, Automation, AI Assistants, Digital Skills, Workflows, Continuous Learning</span>
                        <span>Professional Course · Duration as per institution (often 4–8 weeks)</span>
                        <span>Ideal for early–mid career professionals, team leads, analysts &amp; operations / service roles</span>
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
                                    The Future Skills &amp; Automation course is about working <em>with</em> technology,
                                    not being replaced by it. You’ll learn which skills are becoming critical, what
                                    automation and AI actually do, and how to redesign your work so you spend more time
                                    on high‑value tasks.
                                </p>
                                <p>
                                    You will explore trends in the future of work, practise using AI assistants and
                                    simple automation tools, and build a personal upskilling plan. By the end, you will
                                    have a practical playbook to keep learning and to shape your role instead of waiting
                                    for change to happen to you.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Globe className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Future of Work &amp; Core Skills</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Future of Work – automation, AI, global teams, platforms &amp; project‑based work</li>
                                        <li>Human Skills that Stand Out – problem solving, communication, systems thinking</li>
                                        <li>Digital Basics – data literacy, collaboration tools, remote work habits</li>
                                        <li>T‑Shaped Skills – combining depth in one area with breadth across others</li>
                                        <li>Learning Mindset – unlearning, relearning, experiments instead of fear</li>
                                        <li>Exercise: Map your current skills and identify future‑ready skill gaps</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Bot className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Automation in Everyday Work</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>What is Automation – from simple rules to RPA, workflows and integrations</li>
                                        <li>Finding Automation Opportunities – repetitive, rules‑based, error‑prone work</li>
                                        <li>Workflow Thinking – triggers, inputs, decisions, outputs and exceptions</li>
                                        <li>Examples – ticket routing, notifications, simple approvals, reports</li>
                                        <li>Working with Bots – roles, limits, hand‑offs between people and automation</li>
                                        <li>Exercise: Analyse a typical week and design 2–3 simple automation ideas</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Sparkles className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 3</span>
                                        <span>AI Assistants, Ethics &amp; Continuous Learning</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>AI Assistants in Plain Language – what tools like ChatGPT / copilots can do</li>
                                        <li>Prompting for Work – writing, analysis, planning, summaries and ideas</li>
                                        <li>Responsible Use – privacy, bias, mistakes, approvals and “human in control”</li>
                                        <li>Building Your Learning System – goals, sources, practice &amp; reflection</li>
                                        <li>Career Portfolios – capturing projects, skills and outcomes, not just job titles</li>
                                        <li>Exercise: Draft a 6–12 month “Future Skills Plan” for your role</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ roles (analysts, operations, service,
                                        marketing, product, consulting, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><ClipboardList className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Practice</span>
                                        <span>Checklists, Templates &amp; Personal Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Automation opportunity checklist and simple workflow templates</li>
                                        <li>Prompt libraries for analysis, writing, planning and learning</li>
                                        <li>Creating your personal “Future Skills &amp; Automation Playbook”</li>
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
                                        <span>Future Skills &amp; Automation Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Analysts, coordinators, operations and service roles, early–mid career professionals, team leaders and anyone who wants to stay relevant as work changes.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Future of work trends, human skills, digital fluency, automation opportunities, AI assistants and continuous learning habits.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with a clearer view of where work is going, how your skills fit in, and how to use automation and AI to upgrade (not replace) your contribution.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Star size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often described as “reassuring and energising” – turning anxiety about automation into concrete actions and experiments.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Modules &amp; Skills Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Future Skills &amp; Automation Matter</h2>
                    <p>Automation and new skills are reshaping roles in IT &amp; services, banking &amp; financial
                        services, BPO / shared services, logistics, manufacturing, retail, consulting and startups.</p>
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
                            <h2>What You Will Gain from Future Skills &amp; Automation</h2>
                            <p>Move from worrying about the future to actively shaping your place in it.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Future Readiness</h3>
                                <p>Understand how work is changing and which skills will help you stay in demand.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Cpu size={24} /></div>
                                <h3>Digital Mindset</h3>
                                <p>Think in systems, workflows and data instead of only individual tasks.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Bot size={24} /></div>
                                <h3>Automation Awareness</h3>
                                <p>Spot practical opportunities to remove manual work and reduce errors.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Sparkles size={24} /></div>
                                <h3>AI Collaboration</h3>
                                <p>Use AI assistants safely for writing, analysis, ideas and everyday support.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><RefreshCw size={24} /></div>
                                <h3>Continuous Learning</h3>
                                <p>Build routines and systems that keep your skills evolving year after year.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Resilience</h3>
                                <p>Develop a portfolio and mindset that help you move across roles and opportunities.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Skills &amp; Automation Board</span>
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
                                <span>Skills</span>
                                <span>Automation</span>
                                <span>AI</span>
                                <span>Career</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Use</h2>
                    <p>Explore tools that support automation, AI assistance, collaboration and learning.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={OpenAILogo} alt="OpenAI / ChatGPT" />
                            <span>ChatGPT / AI Assistants</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MicrosoftLogo} alt="Microsoft" />
                            <span>Microsoft 365 / Power Automate*</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={JiraLogo} alt="Jira" />
                            <span>Jira / Workflows &amp; Tasks</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (Data &amp; Tracking)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / Workflow Mapping</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – concepts focus on skills and patterns you can
                        apply across different platforms.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your Future Skills &amp; Automation Journey</h2>
                        <p>See how this course helps you move from uncertainty to a clear personal roadmap.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Layers size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Tasks to Systems</h3>
                                    <p className="fs-more-text">
                                        Learn to step back from individual tasks, see the bigger workflow, and decide
                                        where skills, automation and AI best fit together.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Skill Maps</span>
                                <span className="fs-role-tag">Automation Ideas</span>
                                <span className="fs-role-tag">Learning Plans</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build future‑ready skills that sit on top of your current domain expertise.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Business / Operations Analyst</span>
                                <span className="fs-role-tag">Service / Support Roles</span>
                                <span className="fs-role-tag">Team Leaders &amp; Supervisors</span>
                                <span className="fs-role-tag">Project / PMO Roles</span>
                                <span className="fs-role-tag">Process &amp; Quality Teams</span>
                                <span className="fs-role-tag">Early–Mid Career Professionals</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step progression from understanding trends to acting on them in your
                                        own work.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Understand the future of work and map your core skills.</div>
                                <div className="fs-journey-step">Module 2: Identify automation opportunities and redesign parts of your work.</div>
                                <div className="fs-journey-step">Module 3: Work with AI assistants and build a personal future‑skills plan.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FutureSkillsCourse;
