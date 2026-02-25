import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, Map, CheckCircle, Shield, MessageSquare, MessageCircle, Globe, Briefcase, UserPlus, FileText } from 'lucide-react';
import './TeamBuilderCourse.css';

// Import local images
import TeamBuilderHeroImg from '../assets/team_builder_hero.jpg';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.png';
import TataLogo from '../assets/tata_logo.png';

// Tool Logos
import SlackLogo from '../assets/slack_logo.png';
import MiroLogo from '../assets/miro_logo.png';
import ConfluenceLogo from '../assets/confluence_logo.png';
import ZoomLogo from '../assets/zoom_logo.jpg';


const TeamBuilderCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${TeamBuilderHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Collaboration · Trust · Results</span>
                    <h1 className="fs-hero-title">
                        The Team Builder
                    </h1>
                    <p className="fs-hero-sub">
                        Learn how to turn a group of individuals into a strong, trusting team. Build clarity on
                        roles, improve collaboration, handle conflict constructively and create habits that
                        help teams deliver together.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Team Dynamics, Roles &amp; Norms, Psychological Safety, Collaboration, Conflict, Remote / Hybrid Teams</span>
                        <span>Professional Course · Duration as per institution (often 4–8 weeks)</span>
                        <span>Ideal for managers, team leads, project leads, scrum masters &amp; facilitators</span>
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
                                    The Team Builder course focuses on how people work together – not just what they
                                    work on. It helps you understand team dynamics, create clarity and build trust so
                                    that your team can perform sustainably, not just in short bursts.
                                </p>
                                <p>
                                    You will learn to define roles, set team norms, encourage healthy debate and
                                    manage conflict. By the end, you’ll have practical tools, rituals and
                                    conversation guides to help your team collaborate better – in person or remotely.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Users className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Team Foundations &amp; Clarity</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>What Makes a Team – shared purpose, interdependence, trust</li>
                                        <li>Team Stages (Concepts) – forming, storming, norming, performing</li>
                                        <li>Roles &amp; Responsibilities – who does what, and where there is overlap</li>
                                        <li>Team Norms – how we communicate, decide, escalate and resolve issues</li>
                                        <li>Psychological Safety – speaking up, asking for help, admitting mistakes</li>
                                        <li>Exercise: Create a simple “Team Charter” for your team</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><MessageSquare className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Collaboration, Feedback &amp; Conflict</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Collaboration Habits – sharing context, asking for input, closing the loop</li>
                                        <li>Feedback Within Teams – peer feedback, appreciation and course‑correction</li>
                                        <li>Healthy Disagreement – separating ideas from people</li>
                                        <li>Conflict Basics – sources of conflict, early signals, simple frameworks</li>
                                        <li>Resolving Issues – 1:1 conversations, mediation, agreeing next steps</li>
                                        <li>Exercise: Practise a team feedback / conflict conversation using scripts</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Globe className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Rituals, Remote Teams &amp; Sustaining Performance</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Team Rituals – stand‑ups, check‑ins, retrospectives, celebrations</li>
                                        <li>Remote / Hybrid Teaming – time zones, communication, inclusion</li>
                                        <li>Decision‑Making – who decides, how we decide, documenting decisions</li>
                                        <li>Measuring Team Health – simple indicators, check‑ins, pulse surveys</li>
                                        <li>Change &amp; New Members – onboarding, role changes, transitions</li>
                                        <li>Exercise: Design 2–3 team rituals for your context (on‑site / remote)</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ contexts (IT, shared services, projects,
                                        operations, sales teams, cross‑functional squads, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><FileText className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Practice</span>
                                        <span>Team Canvases, Scenarios &amp; Builder Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Team charter, roles map, norms and health‑check templates</li>
                                        <li>Scenarios: conflict between functions, low engagement, new joiners</li>
                                        <li>Creating your personal “Team Builder Playbook”</li>
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
                                        <span>The Team Builder Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>People managers, team leaders, project / delivery leads, scrum masters, HRBPs and facilitators who support teams.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Team purpose and roles, norms, collaboration habits, feedback, conflict, team rituals and remote / hybrid teaming.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with concrete tools for running team sessions, setting norms, handling issues early and building a healthier, more collaborative team.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Star size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often appreciated for its practical checklists and exercises that teams can use immediately in retros, offsites and regular meetings.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Modules &amp; Team Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Strong Teams Make the Difference</h2>
                    <p>Team‑building skills are essential in IT &amp; services, banking &amp; financial services,
                        BPO / shared services, logistics, manufacturing, consulting, startups and the public sector.</p>
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
                            <h2>What You Will Gain as a Team Builder</h2>
                            <p>Shift from “putting out fires” to building teams that support each other and deliver.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><CheckCircle size={24} /></div>
                                <h3>Clarity &amp; Alignment</h3>
                                <p>Ensure everyone knows why the team exists, what success looks like and who does what.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Shield size={24} /></div>
                                <h3>Trust &amp; Safety</h3>
                                <p>Help your team feel safe to speak up, ask questions and share concerns early.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><MessageSquare size={24} /></div>
                                <h3>Collaboration</h3>
                                <p>Create habits of sharing information, asking for input and supporting each other.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><MessageCircle size={24} /></div>
                                <h3>Conflict Skills</h3>
                                <p>Turn disagreements into useful discussions instead of politics or silent resistance.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Globe size={24} /></div>
                                <h3>Remote Teaming</h3>
                                <p>Run effective rituals and maintain connection across locations and time zones.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Demonstrate that you can not only manage work, but also build and sustain strong teams.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Team Health Board</span>
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
                                <span>Trust</span>
                                <span>Roles</span>
                                <span>Norms</span>
                                <span>Rituals</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Frameworks You May Use</h2>
                    <p>Use collaboration tools to support better communication, rituals and visibility in teams.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MicrosoftLogo} alt="Microsoft Teams" />
                            <span>Teams / Outlook (communication)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={SlackLogo} alt="Slack" />
                            <span>Slack / Channels &amp; updates</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / Team canvases &amp; retros</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ConfluenceLogo} alt="Confluence" />
                            <span>Confluence / Team pages</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ZoomLogo} alt="Zoom" />
                            <span>Zoom / Remote meetings</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – the emphasis is on team practices and
                        conversations, not any single software.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your Team Builder Journey</h2>
                        <p>See how this course helps you grow from managing tasks to building strong, resilient teams.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><UserPlus size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Group to Team</h3>
                                    <p className="fs-more-text">
                                        Learn how to move from “people who work near each other” to a real team
                                        with shared purpose, norms and trust.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Team Charters</span>
                                <span className="fs-role-tag">Norms &amp; Agreements</span>
                                <span className="fs-role-tag">Health Checks</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build team‑building skills that strengthen your impact in many leadership and
                                        facilitation roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">People Manager</span>
                                <span className="fs-role-tag">Team / Squad Lead</span>
                                <span className="fs-role-tag">Project / Delivery Lead</span>
                                <span className="fs-role-tag">Scrum Master / Agile Coach</span>
                                <span className="fs-role-tag">HRBP / L&amp;D</span>
                                <span className="fs-role-tag">Community / Practice Lead</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step progression from understanding team dynamics to shaping them
                                        deliberately.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Clarify team purpose, roles and norms.</div>
                                <div className="fs-journey-step">Module 2: Build collaboration habits and handle feedback &amp; conflict.</div>
                                <div className="fs-journey-step">Module 3: Design rituals, support remote teaming and sustain team health.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamBuilderCourse;
