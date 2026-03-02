import { useEffect } from 'react';
import { Clock, Users, Target, Zap, Star, Map, Lightbulb, Compass, Megaphone, Heart, TrendingUp, Briefcase, FileText, ArrowUp } from 'lucide-react';
import './VisionaryLeaderCourse.css';

// Import local images
import VisionaryLeaderHeroImg from '../assets/visionary_leader_hero.webp';

// Logos
import MicrosoftLogo from '../assets/microsoft_logo.svg';
import GoogleLogo from '../assets/google_logo.svg';
import AmazonLogo from '../assets/amazon_logo.webp';
import AccentureLogo from '../assets/accenture_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import LandTLogo from '../assets/l_and_t_logo.webp';
import TataLogo from '../assets/tata_logo.webp';

// Tool Logos
import MiroLogo from '../assets/miro_logo.webp';
import NotionLogo from '../assets/notion_logo.svg';
import ConfluenceLogo from '../assets/confluence_logo.webp';
import ZoomLogo from '../assets/zoom_logo.webp';


const VisionaryLeaderCourse = () => {

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${VisionaryLeaderHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Vision · Strategy · Influence</span>
                    <h1 className="fs-hero-title">
                        The Visionary Leader
                    </h1>
                    <p className="fs-hero-sub">
                        Learn how to craft a compelling vision, translate it into clear direction, and mobilise
                        people across functions to move in the same direction – even when the future is uncertain.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Vision &amp; Story, Strategic Direction, Alignment, Influence, Culture, Change</span>
                        <span>Professional Course · Duration as per institution (often 4–8 weeks)</span>
                        <span>Ideal for senior managers, emerging leaders, product &amp; business heads, founders &amp; change leaders</span>
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
                                    The Visionary Leader course is about setting direction and inspiring movement –
                                    not through slogans, but through clear choices, stories and everyday leadership
                                    behaviours that people can feel.
                                </p>
                                <p>
                                    You will learn how to shape a vision rooted in reality, connect it to strategy,
                                    communicate it in simple language and align teams and stakeholders around it. By
                                    the end, you’ll have practical tools to lead with a clearer “north star” in your
                                    role, function or organisation.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open>
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Lightbulb className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 1</span>
                                        <span>Vision, Strategy &amp; Story</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>What Vision Really Is – picture of a better future, not just targets</li>
                                        <li>From Vision to Strategy – choices about where to play and how to win</li>
                                        <li>Leader as Storyteller – making strategy understandable and memorable</li>
                                        <li>Crafting a Leadership Narrative – past, present and desired future</li>
                                        <li>Signals from the Outside – customers, competitors, technology, trends</li>
                                        <li>Exercise: Draft a one‑page vision &amp; narrative for your team or area</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Users className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 2</span>
                                        <span>Alignment, Influence &amp; Stakeholders</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Translating Vision into Objectives – themes, priorities, focus areas</li>
                                        <li>Stakeholder Mapping – allies, sceptics, decision‑makers and influencers</li>
                                        <li>Influence without Authority – framing, listening, negotiation basics</li>
                                        <li>Leadership Communication – townhalls, team meetings, 1:1s</li>
                                        <li>Dealing with Resistance – understanding concerns, adapting the story</li>
                                        <li>Exercise: Map key stakeholders and plan simple alignment conversations</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><Compass className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Module 3</span>
                                        <span>Culture, Change &amp; Everyday Leadership</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Culture as “How We Do Things Here” – behaviours, symbols, routines</li>
                                        <li>Leading Change – setting pace, sequencing, quick wins and guardrails</li>
                                        <li>Role Modelling – decisions, trade‑offs and how you show up</li>
                                        <li>Empowering Others – creating space for ideas, ownership and risk‑taking</li>
                                        <li>Learning Loops – feedback, retrospectives, course correction</li>
                                        <li>Exercise: Identify 3–5 leadership behaviours you will start / stop / continue</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Examples are adapted based on learners’ contexts (product, operations, sales,
                                        IT services, shared services, startups, etc.).
                                    </p>
                                </div>
                            </details>

                            <details className="fs-module">
                                <summary>
                                    <div className="fs-module-title">
                                        <span className="mr-2 flex items-center"><FileText className="w-5 h-5 text-blue-600" /></span>
                                        <span className="fs-module-label">Practice</span>
                                        <span>Vision Canvases, Communication Plans &amp; Leadership Playbook</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Vision &amp; narrative canvases, priority maps, stakeholder plans</li>
                                        <li>Case study: re‑focusing a team or function around a new direction</li>
                                        <li>Creating your personal “Visionary Leader Playbook”</li>
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
                                        <span>The Visionary Leader Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal Participants</strong>
                                        <span>Senior managers, emerging leaders, product &amp; business heads, founders &amp; change leaders responsible for direction and alignment.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Vision and strategy, storytelling, stakeholder alignment, influence, culture‑shaping and leading change.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Zap size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Outcomes</strong>
                                        <span>Leave with a clarified vision for your area, a leadership narrative, and concrete next‑step actions to align and energise your teams and stakeholders.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Star size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>Often valued for turning “vision and leadership” into specific tools, conversations and behaviours leaders can practise immediately.</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Modules &amp; Leadership Toolkit</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Where Visionary Leaders Are Needed</h2>
                    <p>Visionary leadership is critical in technology, banking &amp; financial services, consulting,
                        telecom, manufacturing, healthcare, startups, shared services and the public sector.</p>
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
                            <h2>What You Will Gain as a Visionary Leader</h2>
                            <p>Combine clear thinking, compelling stories and everyday actions that move people.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Lightbulb size={24} /></div>
                                <h3>Vision &amp; Story</h3>
                                <p>Craft a vision and narrative that people can remember, repeat and act on.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Compass size={24} /></div>
                                <h3>Alignment</h3>
                                <p>Translate high‑level direction into clear priorities and focus for teams.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Megaphone size={24} /></div>
                                <h3>Influence</h3>
                                <p>Bring stakeholders on board, even when you don’t have formal authority over them.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Heart size={24} /></div>
                                <h3>Culture Impact</h3>
                                <p>Shape how work gets done – through the behaviours and routines you encourage.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Change Leadership</h3>
                                <p>Guide people through uncertainty with empathy, clarity and consistency.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build artefacts and examples that demonstrate readiness for larger leadership roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Vision &amp; Strategy Board</span>
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
                                <span>Vision</span>
                                <span>Priorities</span>
                                <span>Stakeholders</span>
                                <span>Culture</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS & PLATFORMS SECTION */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Frameworks You May Use</h2>
                    <p>Use visual and collaboration tools to clarify and communicate your vision and strategy.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MicrosoftLogo} alt="Microsoft 365" />
                            <span>PowerPoint / Word (narratives)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro / Vision &amp; Strategy Maps</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={NotionLogo} alt="Notion" />
                            <span>Notion / Leadership Docs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ConfluenceLogo} alt="Confluence" />
                            <span>Confluence / Strategy Hubs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ZoomLogo} alt="Zoom" />
                            <span>Zoom / Townhalls &amp; All‑hands</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '11px', marginTop: '8px', color: '#6b7280' }}>
                        *Exact tools may vary by institution – the emphasis is on the leadership conversations
                        and frameworks, not on any specific software.
                    </p>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Your Visionary Leadership Journey</h2>
                        <p>See how this course helps you grow from managing the present to shaping the future.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><ArrowUp size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Manager to Visionary</h3>
                                    <p className="fs-more-text">
                                        Learn how to step beyond day‑to‑day operations and lead with a clearer, longer‑term
                                        view – without losing grip on execution.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <span className="fs-role-tag">Vision Canvases</span>
                                <span className="fs-role-tag">Leadership Narratives</span>
                                <span className="fs-role-tag">Stakeholder Maps</span>
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Roles This Course Supports</h3>
                                    <p className="fs-more-text">
                                        Build visionary leadership skills that strengthen your impact in senior and
                                        emerging leadership roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Business / Function Head</span>
                                <span className="fs-role-tag">Senior Manager / Director</span>
                                <span className="fs-role-tag">Product / Portfolio Leader</span>
                                <span className="fs-role-tag">Transformation / Change Lead</span>
                                <span className="fs-role-tag">Founder / Entrepreneur</span>
                                <span className="fs-role-tag">High‑Potential Leader</span>
                            </div>
                        </div>

                        {/* Card 3: Journey timeline */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={20} /></div>
                                <div>
                                    <h3 className="fs-more-title">Course Journey</h3>
                                    <p className="fs-more-text">
                                        A step‑by‑step progression from clarifying your vision to aligning people and
                                        leading change around it.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Shape a clear vision and leadership narrative.</div>
                                <div className="fs-journey-step">Module 2: Align stakeholders and teams around priorities and focus.</div>
                                <div className="fs-journey-step">Module 3: Lead culture and change through everyday leadership behaviours.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisionaryLeaderCourse;
