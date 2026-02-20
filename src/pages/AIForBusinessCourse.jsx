import { useEffect, useState } from 'react';
import {
    Clock, Users, Target, Zap, Award,
    MessageSquare, BrainCircuit, Workflow, BarChart, ShieldCheck, TrendingUp
} from 'lucide-react';
import './AIForBusinessCourse.css';

// Import local images
import AIHeroImg from '../assets/ai_for_business_hero.jpg';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.svg';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.png';
import TataLogo from '../assets/tata_logo.png';

// Tool Logos
import OpenAILogo from '../assets/openai_logo.png';
import ExcelLogo from '../assets/excel_logo.png';
import PowerBILogo from '../assets/power_bi_logo.svg';


const AIForBusinessCourse = () => {
    useEffect(() => {
        document.title = "AI for Business: Master Practical AI & Automation | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Scale your business with AI. Learn practical prompt engineering, workflow automation, and data-driven decision making in our AI for Business course.");
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
        <div className="fs-course" id="top">

            {/* HERO */}
            <section
                className="fs-hero fs-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${AIHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Data · Automation · Decisions</span>
                    <h1 className="fs-hero-title">
                        Lead with AI: Practical AI for Business &amp; Workflow Automation
                    </h1>
                    <p className="fs-hero-sub">
                        Learn how to turn AI into a practical assistant for your daily work. Understand what
                        AI can and cannot do, design useful prompts, and build simple workflows that save time,
                        improve decisions and unlock new ideas.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Generative AI, Prompting, Automation, Analytics, Use Cases, Ethics</span>
                        <span>Professional Course · Duration as per institution (often 4–8 weeks)</span>
                        <span>Ideal for managers, analysts, product &amp; operations teams, marketers &amp; consultants</span>
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
                                    The AI for Business course is designed for non‑technical professionals who want to
                                    use AI confidently at work – without needing to become data scientists or coders.
                                </p>
                                <p>
                                    You will learn how modern AI (especially generative AI and copilots) works in plain
                                    language, how to design effective prompts, and how to apply AI to real tasks like
                                    analysis, content creation, reporting, decision support and process improvement.
                                    By the end, you’ll have a personal “AI assistant” toolkit tailored to your role.
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
                                        <span>AI Foundations for Business</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>What AI is (and isn’t) – from rules to machine learning to generative AI</li>
                                        <li>Everyday AI in business – examples across marketing, ops, HR, finance &amp; CX</li>
                                        <li>Large Language Models (LLMs) in simple terms – why tools like ChatGPT work</li>
                                        <li>Prompting Basics – roles, context, constraints, step‑by‑step thinking</li>
                                        <li>Dealing with Hallucinations – verification, references and controls</li>
                                        <li>Exercise: Turn a business task into an “AI‑ready” brief and first prompt set</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Applied AI Use Cases &amp; Workflows</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>AI for Thinking &amp; Writing – brainstorming, outlining, drafting &amp; editing</li>
                                        <li>AI for Analysis – summarising docs, extracting insights, comparing options</li>
                                        <li>AI for Customers – emails, FAQs, responses, scripts (human‑in‑the‑loop)</li>
                                        <li>AI for Operations – checklists, SOP drafts, meeting notes, follow‑ups</li>
                                        <li>Designing AI Workflows – when to use AI, when not to, and how to review output</li>
                                        <li>Exercise: Design a simple “AI‑assisted” workflow for your role / team</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Tools, Data, Ethics &amp; Change</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Types of AI Tools – chatbots, copilots in Office tools, document &amp; email assistants</li>
                                        <li>AI + Data – using spreadsheets, reports and dashboards with AI safely</li>
                                        <li>Responsible AI – privacy, bias, security, approvals and “human in control”</li>
                                        <li>Working with IT / Data Teams – access, guardrails, pilots and adoption</li>
                                        <li>Building Team Guidelines – dos / don’ts, prompts, review standards</li>
                                        <li>Exercise: Draft a one‑page “AI for My Team” starter guideline</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ industries (consulting, IT services,
                                        banking, startups, operations, marketing, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 3}>
                                <summary onClick={(e) => handleToggle(3, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Practice</span>
                                        <span>Prompt Libraries, Mini‑Projects &amp; AI Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Prompt templates for analysis, communication, planning and reporting</li>
                                        <li>Case study: redesign a weekly task (e.g. report or campaign) using AI</li>
                                        <li>Creating your personal “AI for Business” Playbook</li>
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
                                        <span>AI for Business Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Managers, analysts, consultants, product &amp; operations teams, marketing &amp; sales professionals, and anyone who works with information and decisions.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Generative AI basics, prompting, business use cases, simple automations, responsible use and change adoption.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with a set of tested prompts, workflows and guidelines you can apply immediately in your current role and share with your team.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often valued for its “hands‑on” orientation – less theory, more real tasks done faster and better using AI.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Modules &amp; AI Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where AI for Business Skills Are in Demand</h2>
                    <p>AI skills are now expected in technology, consulting, banking &amp; financial services,
                        BPO / shared services, retail, manufacturing, startups and public sector organisations.</p>
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
                            <h2>What You Will Gain from AI for Business</h2>
                            <p>Use AI as a practical co‑pilot for thinking, writing, analysis and decisions.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><MessageSquare size={24} /></div>
                                <h3>AI Fluency</h3>
                                <p>Talk confidently about AI with colleagues, vendors and customers in plain language.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BrainCircuit size={24} /></div>
                                <h3>Prompting Skills</h3>
                                <p>Write prompts that deliver clearer, more accurate and more useful AI outputs.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Workflow size={24} /></div>
                                <h3>Real Use Cases</h3>
                                <p>Apply AI directly to your emails, reports, analysis, planning and customer work.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BarChart size={24} /></div>
                                <h3>Data‑Aware Decisions</h3>
                                <p>Combine spreadsheets, dashboards and AI to explore scenarios and options quickly.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><ShieldCheck size={24} /></div>
                                <h3>Responsible Adoption</h3>
                                <p>Use AI with the right guardrails around privacy, bias, security and approvals.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build a portfolio of prompts, workflows and guidelines that showcase your AI skills.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>AI Idea &amp; Insight Board</span>
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
                                <span>Ideas</span>
                                <span>Content</span>
                                <span>Analysis</span>
                                <span>Automation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Use</h2>
                    <p>Get comfortable with the kinds of tools that bring AI into everyday business work.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={OpenAILogo} alt="OpenAI / ChatGPT" />
                            <span>ChatGPT / AI Assistants</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MicrosoftLogo} alt="Microsoft" />
                            <span>Microsoft Copilot / 365</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GoogleLogo} alt="Google" />
                            <span>Google Workspace &amp; AI</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>Excel / Sheets (data &amp; AI)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>Power BI / Dashboards</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – the focus is on prompts, workflows and decision
                        patterns you can apply across different AI platforms.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your AI for Business Journey</h2>
                        <p>See how this course helps you move from curiosity to confident, everyday AI use.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><BrainCircuit size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Curiosity to Confidence</h3>
                                    <p className="fs-more-text">
                                        Move beyond “trying AI once or twice” to building reliable, repeatable ways of
                                        using AI in your weekly work and projects.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Prompt Libraries</span>
                                <span className="fs-role-tag">AI‑Assisted Workflows</span>
                                <span className="fs-role-tag">Team Guidelines</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Users size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build AI‑enabled skills that sit on top of your existing domain expertise.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Business Analyst</span>
                                <span className="fs-role-tag">Operations / Service Lead</span>
                                <span className="fs-role-tag">Product / Project Manager</span>
                                <span className="fs-role-tag">Marketing / Content</span>
                                <span className="fs-role-tag">Consultant / Pre‑Sales</span>
                                <span className="fs-role-tag">Team Lead / People Manager</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step path from understanding AI concepts to leading AI‑assisted work
                                        in your team.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Understand AI in business and learn the basics of prompting.</div>
                                <div className="fs-journey-step">Module 2: Apply AI to real use cases and design your own AI workflows.</div>
                                <div className="fs-journey-step">Module 3: Choose tools, set guardrails and create an AI Playbook for your team.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AIForBusinessCourse;
