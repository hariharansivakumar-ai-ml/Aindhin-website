import { useEffect } from 'react';
import { Ear, MessageSquare, MonitorPlay, ClipboardList, Clock, Users, Target, Zap, Star, Lightbulb, Shield, Edit3, Briefcase, Map } from 'lucide-react';
import './EffectiveCommunicatorCourse.css';

// Import local images
import EffectiveCommunicatorHeroImg from '../assets/effective_communicator_hero.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.webp';
import TataLogo from '../assets/tata_logo.webp';

// Tool Logos
// import OutlookLogo from '../assets/outlook_logo.webp'; // Assuming not available, using standard text or just the list provided.
// The user provided standard logos. I will try to map them to existing assets or download if missing.
// Tool logos provided: Microsoft (Teams/Outlook), Google (Gmail/Meet), Excel (PowerPoint/Excel), Zoom, Miro.
// I have Microsoft, Google, Miro.
// Do I have Zoom? checking list_dir... I saw zoom_logo.webp in step 2827 imports (VisionaryLeaderCourse).
// Do I have Excel? Yes (PeopleManagerCourse).
// Microsoft Office Excel?
// I will use existing logo variables.

import ZoomLogo from '../assets/zoom_logo.webp';
import MiroLogo from '../assets/miro_logo.webp';
// For Microsoft and Google tools, reusing the main company logos or checking for specifics.
// I'll reuse the main logos for the tools section as placeholders if specific tool logos are missing, 
// or I can check for 'excel_logo.png' etc.

import ExcelLogo from '../assets/excel_logo.png';
// I don't have PowerPoint logo explicitly loaded in previous steps? 
// Step 2826 (FinSavvy) imported PowerPointLogo from '../assets/powerpoint_logo.webp'. So it exists.
import PowerPointLogo from '../assets/powerpoint_logo.webp';

const EffectiveCommunicatorCourse = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ec-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const sections = document.querySelectorAll('.ec-section');
        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="ec-course" id="top">

            {/* HERO */}
            <section
                className="ec-hero ec-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${EffectiveCommunicatorHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="ec-hero-content">
                    <span className="ec-badge">Listening · Clarity · Influence</span>
                    <h1 className="ec-hero-title">
                        The Effective Communicator
                    </h1>
                    <p className="ec-hero-sub">
                        Learn how to listen actively, structure your message and adapt your communication style
                        so that your ideas land clearly with colleagues, customers and leaders – in meetings,
                        emails and presentations.
                    </p>
                    <div className="ec-hero-meta">
                        <span>Key topics: Active Listening, Clear Messaging, Stakeholder Communication, Difficult Conversations, Email &amp; Slides, Virtual Communication</span>
                        <span>Professional Course · Duration as per institution (often 3–6 weeks)</span>
                        <span>Ideal for analysts, team members, managers, project leads &amp; anyone who works in cross‑functional teams</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="ec-main ec-section">
                <div className="ec-main-inner">

                    {/* Left side */}
                    <div className="ec-left">

                        {/* About */}
                        <section className="ec-card">
                            <h2>About This Course</h2>
                            <div className="ec-about-text">
                                <p>
                                    The Effective Communicator course helps you move from “explaining again and again”
                                    to being understood the first time. It focuses on core skills that cut across roles:
                                    listening, asking better questions, structuring your message and choosing the right
                                    channel.
                                </p>
                                <p>
                                    You will practise communicating with different audiences – peers, managers,
                                    customers and cross‑functional teams – in spoken and written formats. By the end,
                                    you’ll have practical frameworks and examples you can apply immediately in your
                                    emails, meetings, updates and presentations.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="ec-card">
                            <h2>Syllabus Overview</h2>

                            <details className="ec-module" open>
                                <summary>
                                    <div className="ec-module-title">
                                        <span className="mr-2 flex items-center"><Ear className="w-5 h-5 text-blue-600" /></span>
                                        <span className="ec-module-label">Module 1</span>
                                        <span>Foundations: Listening, Clarity &amp; Audience</span>
                                    </div>
                                </summary>
                                <div className="ec-module-content">
                                    <ul>
                                        <li>What Makes Communication “Effective” – outcomes, not just speaking</li>
                                        <li>Active Listening – questions, paraphrasing, checking understanding</li>
                                        <li>Audience‑Centric Thinking – who, what they care about, what they need to know</li>
                                        <li>Message Structure – context, key point, reasons, ask (simple frameworks)</li>
                                        <li>Choosing the Right Channel – chat, email, call, meeting, document</li>
                                        <li>Exercise: Turn a scattered update into a clear 2‑minute message</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="ec-module">
                                <summary>
                                    <div className="ec-module-title">
                                        <span className="mr-2 flex items-center"><MessageSquare className="w-5 h-5 text-blue-600" /></span>
                                        <span className="ec-module-label">Module 2</span>
                                        <span>Day‑to‑Day Communication &amp; Difficult Messages</span>
                                    </div>
                                </summary>
                                <div className="ec-module-content">
                                    <ul>
                                        <li>Effective Emails &amp; Chats – subject lines, structure, tone and brevity</li>
                                        <li>Meeting Communication – preparing, speaking up, summarising decisions</li>
                                        <li>Giving &amp; Receiving Feedback – simple models and practical phrases</li>
                                        <li>Managing Up – keeping managers informed and aligned</li>
                                        <li>Handling Difficult Conversations – disagreement, bad news, pushback</li>
                                        <li>Exercise: Draft a clear email and a short script for a tough conversation</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="ec-module">
                                <summary>
                                    <div className="ec-module-title">
                                        <span className="mr-2 flex items-center"><MonitorPlay className="w-5 h-5 text-blue-600" /></span>
                                        <span className="ec-module-label">Module 3</span>
                                        <span>Presentations, Virtual &amp; Cross‑Functional Communication</span>
                                    </div>
                                </summary>
                                <div className="ec-module-content">
                                    <ul>
                                        <li>Storytelling Basics – start with why, structure, simple visuals</li>
                                        <li>Slides that Support Your Message – not too much text, clear flow</li>
                                        <li>Virtual Communication – video calls, screen‑sharing, engagement tips</li>
                                        <li>Cross‑Functional Communication – tech vs business, internal vs client</li>
                                        <li>Personal Communication Plan – strengths, blind spots, practice ideas</li>
                                        <li>Exercise: Create a short “update” deck / outline and present in brief</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ contexts (IT services, operations, sales,
                                        support, projects, shared services, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="ec-module">
                                <summary>
                                    <div className="ec-module-title">
                                        <span className="mr-2 flex items-center"><ClipboardList className="w-5 h-5 text-blue-600" /></span>
                                        <span className="ec-module-label">Practice</span>
                                        <span>Templates, Scenarios &amp; Communication Playbook</span>
                                    </div>
                                </summary>
                                <div className="ec-module-content">
                                    <ul>
                                        <li>Email &amp; chat templates for updates, requests and clarifications</li>
                                        <li>Structures for short presentations, status updates and stakeholder summaries</li>
                                        <li>Creating your personal “Effective Communication Playbook”</li>
                                    </ul>
                                </div>
                            </details>
                        </section>
                    </div>

                    {/* Right side */}
                    <aside className="ec-right">
                        <section className="ec-card">
                            <h2>Course Details</h2>
                            <ul className="ec-detail-list">
                                <li className="ec-detail-item">
                                    <div className="ec-detail-icon"><Clock size={20} /></div>
                                    <div className="ec-detail-text">
                                        <strong>Course Type &amp; Duration</strong>
                                        <span>The Effective Communicator Course · Duration as per institution (commonly 3–6 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="ec-detail-item">
                                    <div className="ec-detail-icon"><Users size={20} /></div>
                                    <div className="ec-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Analysts, coordinators, team members, project leads, managers and professionals who regularly work with clients, stakeholders or cross‑functional teams.</span>
                                    </div>
                                </li>
                                <li className="ec-detail-item">
                                    <div className="ec-detail-icon"><Target size={20} /></div>
                                    <div className="ec-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Listening, message clarity, everyday communication (email, chat, meetings), difficult conversations, virtual and cross‑functional communication.</span>
                                    </div>
                                </li>
                                <li className="ec-detail-item">
                                    <div className="ec-detail-icon"><Zap size={20} /></div>
                                    <div className="ec-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with practical phrases, frameworks and habits that help you communicate more clearly, reduce rework and build stronger professional relationships.</span>
                                    </div>
                                </li>
                                <li className="ec-detail-item">
                                    <div className="ec-detail-icon"><Star size={20} /></div>
                                    <div className="ec-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often described as “immediately useful” – participants report changes in how they write emails, run meetings and handle tough conversations.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="ec-cta-btn">View Modules &amp; Communication Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="ec-companies ec-section">
                <div className="ec-companies-inner">
                    <h2>Where Communication Skills Are Critical</h2>
                    <p>Effective communication is essential in IT &amp; services, banking &amp; financial services,
                        BPO / shared services, logistics, manufacturing, retail, consulting, startups and the public sector.</p>
                    <div className="ec-logo-row">
                        <div className="ec-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="ec-logo-card">
                            <img src={GoogleLogo} alt="Google" />
                        </div>
                        <div className="ec-logo-card">
                            <img src={AmazonLogo} alt="Amazon" />
                        </div>
                        <div className="ec-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="ec-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="ec-logo-card">
                            <img src={LandTLogo} alt="L&T" />
                        </div>
                        <div className="ec-logo-card">
                            <img src={TataLogo} alt="Tata Group" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="ec-highlights ec-section">
                <div className="ec-highlights-inner">
                    <div>
                        <div className="ec-highlights-heading">
                            <h2>What You Will Gain as an Effective Communicator</h2>
                            <p>Turn ideas into messages that others understand, remember and act on.</p>
                        </div>

                        <div className="ec-highlight-grid">
                            <div className="ec-highlight-card">
                                <div className="ec-highlight-icon"><Ear size={24} /></div>
                                <h3>Listening &amp; Understanding</h3>
                                <p>Hear what others are really saying – and what they are not – before you respond.</p>
                            </div>
                            <div className="ec-highlight-card">
                                <div className="ec-highlight-icon"><Lightbulb size={24} /></div>
                                <h3>Clarity</h3>
                                <p>Structure your thoughts so your main point is easy to grasp and repeat.</p>
                            </div>
                            <div className="ec-highlight-card">
                                <div className="ec-highlight-icon"><Target size={24} /></div>
                                <h3>Influence</h3>
                                <p>Adapt your message to different stakeholders and build support for your ideas.</p>
                            </div>
                            <div className="ec-highlight-card">
                                <div className="ec-highlight-icon"><Shield size={24} /></div>
                                <h3>Confidence</h3>
                                <p>Speak up in meetings, present updates and handle questions with more ease.</p>
                            </div>
                            <div className="ec-highlight-card">
                                <div className="ec-highlight-icon"><Edit3 size={24} /></div>
                                <h3>Written Impact</h3>
                                <p>Write emails and updates that are shorter, clearer and easier to respond to.</p>
                            </div>
                            <div className="ec-highlight-card">
                                <div className="ec-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Showcase communication skills that are visible to managers, peers and clients.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="ec-highlights-visual">
                        <div className="ec-dashboard">
                            <div className="ec-dashboard-header">
                                <span>Communication Snapshot</span>
                                <div className="ec-dashboard-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <div className="ec-dashboard-graph">
                                <div className="ec-dashboard-bar"></div>
                                <div className="ec-dashboard-bar"></div>
                                <div className="ec-dashboard-bar"></div>
                                <div className="ec-dashboard-bar"></div>
                                <div className="ec-dashboard-bar"></div>
                            </div>
                            <div className="ec-dashboard-tags">
                                <span>Listening</span>
                                <span>Message</span>
                                <span>Medium</span>
                                <span>Impact</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="ec-tools ec-section">
                <div className="ec-tools-inner">
                    <h2>Tools &amp; Platforms You May Use</h2>
                    <p>Use common tools more thoughtfully to support clear, effective communication.</p>

                    <div className="ec-tools-grid">
                        <div className="ec-tools-card">
                            <img className="ec-tools-logo" src={MicrosoftLogo} alt="Microsoft 365" />
                            <span>Outlook / Teams (email &amp; chat)</span>
                        </div>
                        <div className="ec-tools-card">
                            <img className="ec-tools-logo" src={GoogleLogo} alt="Google" />
                            <span>Gmail / Meet (communication)</span>
                        </div>
                        <div className="ec-tools-card">
                            <img className="ec-tools-logo" src={PowerPointLogo} alt="Slides / Docs" />
                            <span>PowerPoint / Docs (slides &amp; docs)</span>
                        </div>
                        <div className="ec-tools-card">
                            <img className="ec-tools-logo" src={ZoomLogo} alt="Zoom" />
                            <span>Zoom / Calls &amp; meetings</span>
                        </div>
                        <div className="ec-tools-card">
                            <img className="ec-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / Whiteboarding</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – the focus is on communication principles and
                        patterns that can be applied in any toolset.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="ec-more ec-section">
                <div className="ec-more-inner">
                    <div className="ec-more-header">
                        <h2>Your Effective Communication Journey</h2>
                        <p>See how this course helps you grow from “explaining” to truly connecting and influencing.</p>
                    </div>

                    <div className="ec-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="ec-more-card">
                            <div className="ec-more-top">
                                <div className="ec-more-icon"><Users size={20} /></div>
                                <div>
                                    <h3 className="ec-more-title">From Talking to Connecting</h3>
                                    <p className="ec-more-text">
                                        Move beyond just sharing information to creating shared understanding and
                                        agreement on what happens next.
                                    </p>
                                </div>
                            </div>
                            <div className="ec-tool-logos">
                                <span className="ec-role-tag">Message Structures</span>
                                <span className="ec-role-tag">Email Templates</span>
                                <span className="ec-role-tag">Meeting Summaries</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="ec-more-card">
                            <div className="ec-more-top">
                                <div className="ec-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="ec-more-title">Roles This Course Supports</h3>
                                    <p className="ec-more-text">
                                        Build communication skills that strengthen your impact in any knowledge‑work role.
                                    </p>
                                </div>
                            </div>
                            <div className="ec-roles-image">
                                <span className="ec-role-tag">Business / Operations Analyst</span>
                                <span className="ec-role-tag">Service / Support Roles</span>
                                <span className="ec-role-tag">Project / PMO Roles</span>
                                <span className="ec-role-tag">Team Members &amp; Leads</span>
                                <span className="ec-role-tag">Pre‑Sales / Client‑Facing Roles</span>
                                <span className="ec-role-tag">Early–Mid Career Professionals</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="ec-more-card">
                            <div className="ec-more-top">
                                <div className="ec-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="ec-more-title">Course Journey</h3>
                                    <p className="ec-more-text">
                                        A step‑by‑step progression from core foundations to confident, everyday practice.
                                    </p>
                                </div>
                            </div>
                            <div className="ec-journey">
                                <div className="ec-journey-step">Module 1: Strengthen listening, clarity and audience‑aware messaging.</div>
                                <div className="ec-journey-step">Module 2: Practise day‑to‑day communication and difficult conversations.</div>
                                <div className="ec-journey-step">Module 3: Improve presentations, virtual and cross‑functional communication, and build a personal communication plan.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EffectiveCommunicatorCourse;
