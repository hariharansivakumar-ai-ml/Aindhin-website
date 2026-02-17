import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, UserPlus, MessageSquare, TrendingUp, ClipboardList, CheckCircle, MessageCircle, ShieldCheck, Activity, Heart, Briefcase, Map } from 'lucide-react';
import './PeopleManagerCourse.css';

// Import local images
import PeopleManagerHeroImg from '../assets/people_manager_hero.jpg';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.svg';
import TCSLogo from '../assets/tcs_logo.svg';
import WiproLogo from '../assets/wipro_logo.svg';
import DeloitteLogo from '../assets/deloitte_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LinkedInLogo from '../assets/linkedin_logo.svg';

// Tool Logos
import TeamsLogo from '../assets/teams_logo.svg';
import SlackLogo from '../assets/slack_logo.png';
import GoogleDriveLogo from '../assets/google_drive_logo.png';


const PeopleManagerCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${PeopleManagerHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">People Leadership · Management Skills</span>
                    <h1 className="fs-hero-title">
                        The People Manager Course
                    </h1>
                    <p className="fs-hero-sub">
                        Become the manager people want to work with. Learn how to lead teams, give feedback,
                        handle conflict, run effective one‑on‑ones and build a culture of trust, accountability
                        and performance.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Communication, Feedback, Motivation, Performance, Conflict Management</span>
                        <span>Professional Course · Duration as per institution (often 2–4 months)</span>
                        <span>Ideal for new &amp; aspiring managers, team leads and project leads</span>
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
                                    The People Manager Course is designed to help you move from individual contributor
                                    to effective people leader. You will learn the core skills required to manage
                                    individuals and teams: setting expectations, delegating work, coaching, giving
                                    feedback, resolving conflicts and leading through change.
                                </p>
                                <p>
                                    The course blends frameworks, role‑plays and real‑world scenarios. You will practise
                                    conversations like goal‑setting, one‑on‑ones, performance reviews and difficult
                                    feedback. By the end, you will have a practical toolkit you can apply immediately
                                    with your team, whether you are a first‑time manager or an experienced lead
                                    looking to sharpen your skills.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><UserPlus className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Foundations of People Management</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Manager vs. Individual Contributor – mindset shift &amp; responsibilities</li>
                                        <li>Core Skills of a People Manager – clarity, empathy, accountability</li>
                                        <li>Building Psychological Safety &amp; Trust in Teams</li>
                                        <li>Setting Expectations – roles, goals &amp; success measures (SMART goals)</li>
                                        <li>Structuring Effective One‑on‑Ones &amp; Team Meetings</li>
                                        <li>Practice: Designing your first 90 days as a people manager</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><MessageSquare className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Communication, Feedback &amp; Motivation</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Managerial Communication – clarity, tone, listening &amp; questioning</li>
                                        <li>Giving Feedback – SBI model, positive reinforcement, tough conversations</li>
                                        <li>Receiving Feedback – openness, non‑defensiveness, action planning</li>
                                        <li>Motivating Different Personalities – intrinsic vs extrinsic motivators</li>
                                        <li>Recognition, Appreciation &amp; Managing Morale</li>
                                        <li>Role‑play: Feedback &amp; coaching conversations</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><TrendingUp className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Performance, Conflict &amp; Growth</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Performance Management – goal reviews, KPIs &amp; performance dialogs</li>
                                        <li>Handling Under‑Performance – root causes, coaching vs consequences</li>
                                        <li>Conflict Management – difficult conversations, mediation basics</li>
                                        <li>Managing Change – communicating change &amp; dealing with resistance</li>
                                        <li>Developing Your Team – growth plans, delegation &amp; succession thinking</li>
                                        <li>Practice: Case studies of common people‑management situations</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Exact topics and depth may vary as per institution and audience (first‑time managers
                                        vs. experienced leads).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><ClipboardList className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Practice</span>
                                        <span>Role‑Plays, Reflection &amp; Manager Toolkit</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Guided role‑plays for feedback, one‑on‑ones &amp; conflict conversations</li>
                                        <li>Templates: 1:1 agenda, team meeting agenda, performance review notes</li>
                                        <li>Personal leadership values exercise &amp; management philosophy</li>
                                        <li>Creating your “Manager Playbook” for the next 6–12 months</li>
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
                                        <span>The People Manager Course · Duration as per institution (commonly 6–10 weeks, classroom / online / blended, workshop‑style).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>New managers, team leads, project leads, senior individual contributors preparing for a people‑manager role.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Communication, feedback, motivation, performance management, conflict handling, coaching &amp; culture building.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with concrete tools, scripts and templates you can use in your next 1:1, team meeting, feedback conversation or performance review.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Star size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Frequently rated highly for practicality, relevance and confidence‑building for first‑time managers.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Skills Covered &amp; Practice Sessions</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Great People Managers Make a Difference</h2>
                    <p>People management skills are critical in IT, BFSI, manufacturing, services, startups and NGOs – anywhere teams exist.</p>
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
                            <img src={TCSLogo} alt="TCS" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={WiproLogo} alt="Wipro" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={DeloitteLogo} alt="Deloitte" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={LinkedInLogo} alt="LinkedIn" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain as a People Manager</h2>
                            <p>Build confidence, clarity and credibility as a leader of people.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><CheckCircle size={24} /></div>
                                <h3>Clarity &amp; Alignment</h3>
                                <p>Set clear goals and expectations so your team knows what success looks like.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><MessageSquare size={24} /></div>
                                <h3>Communication Mastery</h3>
                                <p>Have structured, honest and empathetic conversations with individuals and teams.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><MessageCircle size={24} /></div>
                                <h3>Feedback &amp; Coaching</h3>
                                <p>Give feedback that is specific, respectful and leads to real behaviour change.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><ShieldCheck size={24} /></div>
                                <h3>Conflict Handling</h3>
                                <p>Address issues early, mediate disagreements and keep relationships productive.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Activity size={24} /></div>
                                <h3>Performance Focus</h3>
                                <p>Run effective one‑on‑ones, reviews and performance conversations with structure.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Heart size={24} /></div>
                                <h3>Team Motivation</h3>
                                <p>Understand what motivates different people and how to recognise their efforts.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Team Health Snapshot</span>
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
                                <span>Engagement</span>
                                <span>Clarity</span>
                                <span>Trust</span>
                                <span>Performance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Work With</h2>
                    <p>Use simple digital tools to support your people‑management routines and communication.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={TeamsLogo} alt="Microsoft Teams" />
                            <span>Microsoft Teams (meetings &amp; chat)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={SlackLogo} alt="Slack" />
                            <span>Slack (team communication)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GoogleDriveLogo} alt="Google Drive" />
                            <span>Google Drive / Docs (shared docs)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MicrosoftLogo} alt="Office 365" />
                            <span>Office 365 apps</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Tools are used as examples to design better meetings, communication and tracking systems –
                        the focus is on people skills, not software complexity.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your People Management Journey</h2>
                        <p>See how this course builds your confidence and skills as a people manager.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><UserPlus size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Peer to Manager</h3>
                                    <p className="fs-more-text">
                                        Learn how to transition from being “one of the team” to leading the team with
                                        clarity and respect, without losing trust.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-tool-logo fs-role-tag">1:1 Templates</span>
                                <span className="fs-tool-logo fs-role-tag">Team Meeting Agendas</span>
                                <span className="fs-tool-logo fs-role-tag">Feedback Scripts</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Strengthen your leadership profile across a wide range of managerial roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Team Lead / Supervisor</span>
                                <span className="fs-role-tag">Project / Program Manager</span>
                                <span className="fs-role-tag">People Manager in IT / Operations</span>
                                <span className="fs-role-tag">Function / Department Manager</span>
                                <span className="fs-role-tag">Startup Founder / Entrepreneur</span>
                                <span className="fs-role-tag">Aspiring First‑time Manager</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step path from fundamentals to confident everyday management.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Understand the role of a manager, set expectations &amp; run basic 1:1s.</div>
                                <div className="fs-journey-step">Module 2: Practise communication, feedback &amp; motivation in real scenarios.</div>
                                <div className="fs-journey-step">Module 3: Handle performance issues, conflict &amp; build growth plans for your team.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PeopleManagerCourse;
