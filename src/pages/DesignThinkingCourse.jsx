import { useEffect, useState } from 'react';
import './DesignThinkingCourse.css';

// Import local images
import DesignThinkingHeroImg from '../assets/design_thinking.webp';

// Logos
// Logos
import IBMDesignLogo from '../assets/courses/logos/ibm.svg';
import GoogleDesignLogo from '../assets/courses/logos/google.svg';
import MicrosoftLogo from '../assets/courses/logos/microsoft.svg';
import AccentureLogo from '../assets/courses/logos/accenture.svg';
import EYLogo from '../assets/courses/logos/ey.svg';
import InfosysLogo from '../assets/courses/logos/infosys.svg';

import FigmaLogo from '../assets/figma_logo.svg';
import MiroLogo from '../assets/miro_logo.webp';
import CanvaLogo from '../assets/courses/logos/canva.svg';


import {
    Lightbulb, Users, Target, Zap, Layout, ArrowRight, CheckCircle,
    Clock, BookOpen, Award, Briefcase, Map, Brain
} from 'lucide-react';

const DesignThinkingCourse = () => {

    const [openModule, setOpenModule] = useState(1);

    const toggleModule = (id) => {
        setOpenModule(openModule === id ? null : id);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('dt-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const sections = document.querySelectorAll('.dt-section');
        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="dt-course" id="top">

            {/* HERO */}
            <section
                className="dt-hero dt-section"
                style={{
                    background: `linear-gradient(120deg,rgba(0,0,0,0.8),rgba(235,37,147,0.5)), url(${DesignThinkingHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="dt-hero-content">
                    <span className="dt-badge">Design Thinking Course</span>
                    <h1 className="dt-hero-title">
                        Design Thinking Course
                    </h1>
                    <p className="dt-hero-sub">
                        Unlock innovation by understanding users. Learn the 5-step process—Empathise,
                        Define, Ideate, Prototype, Test—to solve complex problems creatively.
                    </p>
                    <div className="dt-hero-meta">
                        <span>Key topics: User Research, Ideation, Prototyping, Testing, Innovation</span>
                        <span>Professional Course · Duration as per institution (commonly 4–8 weeks)</span>
                        <span>Beginner-friendly · Ideal for product managers, designers &amp; leaders · 4.8 / 5 learner feedback</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="dt-main dt-section">
                <div className="dt-main-inner">

                    {/* Left side */}
                    <div className="dt-left">

                        {/* About */}
                        <section className="dt-card">
                            <h2>About This Course</h2>
                            <div className="dt-about-text">
                                <p>
                                    This Design Thinking Course teaches you a human-centred approach to innovation.
                                    You will learn to look at problems through the eyes of the user, uncover
                                    unmet needs and generate creative solutions that are desirable, feasible and
                                    viable.
                                </p>
                                <p>
                                    Through hands-on workshops and real-world challenges, you will practice the
                                    entire design thinking cycle. From conducting user interviews to building
                                    low-fidelity prototypes and gathering feedback, you’ll gain the mindset and
                                    tools to drive meaningful change in any organisation.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="dt-card">
                            <h2>Syllabus Overview</h2>

                            <div className="dt-module">
                                <div
                                    className={`dt-module-header ${openModule === 1 ? 'active' : ''}`}
                                    onClick={() => toggleModule(1)}
                                >
                                    <div className="dt-module-title">
                                        <Users className="dt-module-icon" size={20} />
                                        <span>Module 1: Empathy &amp; Definition</span>
                                    </div>
                                    <span className="dt-module-toggle">{openModule === 1 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="dt-module-content"
                                    style={{
                                        maxHeight: openModule === 1 ? '500px' : '0px',
                                        opacity: openModule === 1 ? 1 : 0,
                                        padding: openModule === 1 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Introduction to Design Thinking – mindset &amp; principles</li>
                                        <li>Empathise Phase – observation, interviewing &amp; empathy maps</li>
                                        <li>Define Phase – synthesizing insights &amp; framing the problem</li>
                                        <li>Creating User Personas and Journey Maps</li>
                                        <li>"How Might We" questions to spark innovation</li>
                                        <li>Hands-on: Conducting user research for a challenge</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="dt-module">
                                <div
                                    className={`dt-module-header ${openModule === 2 ? 'active' : ''}`}
                                    onClick={() => toggleModule(2)}
                                >
                                    <div className="dt-module-title">
                                        <Lightbulb className="dt-module-icon" size={20} />
                                        <span>Module 2: Ideation &amp; Creativity</span>
                                    </div>
                                    <span className="dt-module-toggle">{openModule === 2 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="dt-module-content"
                                    style={{
                                        maxHeight: openModule === 2 ? '500px' : '0px',
                                        opacity: openModule === 2 ? 1 : 0,
                                        padding: openModule === 2 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Ideate Phase – brainstorming rules &amp; techniques</li>
                                        <li>SCAMPER, Crazy 8s and other creative exercises</li>
                                        <li>Selecting &amp; prioritising ideas for development</li>
                                        <li>Concept development &amp; storytelling</li>
                                        <li>Fostering a culture of innovation</li>
                                        <li>Hands-on: Facilitating an ideation session</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="dt-module">
                                <div
                                    className={`dt-module-header ${openModule === 3 ? 'active' : ''}`}
                                    onClick={() => toggleModule(3)}
                                >
                                    <div className="dt-module-title">
                                        <Layout className="dt-module-icon" size={20} />
                                        <span>Module 3: Prototyping &amp; Testing</span>
                                    </div>
                                    <span className="dt-module-toggle">{openModule === 3 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="dt-module-content"
                                    style={{
                                        maxHeight: openModule === 3 ? '500px' : '0px',
                                        opacity: openModule === 3 ? 1 : 0,
                                        padding: openModule === 3 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Prototype Phase – why prototype? fidelity levels</li>
                                        <li>Paper prototyping, digital wireframes &amp; role-playing</li>
                                        <li>Test Phase – planning user tests &amp; gathering feedback</li>
                                        <li>Iterating based on insights – the "fail fast" approach</li>
                                        <li>Final presentation of the solution</li>
                                        <li>Hands-on: Building and testing a prototype</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="dt-module">
                                <div
                                    className={`dt-module-header ${openModule === 4 ? 'active' : ''}`}
                                    onClick={() => toggleModule(4)}
                                >
                                    <div className="dt-module-title">
                                        <Zap className="dt-module-icon" size={20} />
                                        <span>Projects: Innovation Challenge</span>
                                    </div>
                                    <span className="dt-module-toggle">{openModule === 4 ? '−' : '+'}</span>
                                </div>
                                <div
                                    className="dt-module-content"
                                    style={{
                                        maxHeight: openModule === 4 ? '500px' : '0px',
                                        opacity: openModule === 4 ? 1 : 0,
                                        padding: openModule === 4 ? '16px 20px' : '0 20px'
                                    }}
                                >
                                    <ul>
                                        <li>Group Project: Applying the 5-step process to a real problem</li>
                                        <li>Developing a solution for a local community issue</li>
                                        <li>Redesigning a product or service experience</li>
                                        <li>Creating a pitch deck for the final solution</li>
                                        <li>Peer review and feedback</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right side */}
                    <aside className="dt-right">
                        <section className="dt-card">
                            <h2>Course Details</h2>
                            <ul className="dt-detail-list">
                                <li className="dt-detail-item">
                                    <div className="dt-detail-icon"><Clock size={20} /></div>
                                    <div className="dt-detail-text">
                                        <strong>Course Type &amp; Duration</strong>
                                        <span>Design Thinking Course · Duration as per institution (commonly 4–8 weeks, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="dt-detail-item">
                                    <div className="dt-detail-icon"><Briefcase size={20} /></div>
                                    <div className="dt-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Open to all. No design background required. Great for engineers, managers, marketers and entrepreneurs.</span>
                                    </div>
                                </li>
                                <li className="dt-detail-item">
                                    <div className="dt-detail-icon"><Target size={20} /></div>
                                    <div className="dt-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>User empathy, problem definition, creative ideation, rapid prototyping and user testing.</span>
                                    </div>
                                </li>
                                <li className="dt-detail-item">
                                    <div className="dt-detail-icon"><Users size={20} /></div>
                                    <div className="dt-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Anyone wanting to improve problem-solving skills and drive innovation in their field.</span>
                                    </div>
                                </li>
                                <li className="dt-detail-item">
                                    <div className="dt-detail-icon"><Award size={20} /></div>
                                    <div className="dt-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>4.8 / 5 average rating (engaging workshops, practical tools &amp; mindset shift).</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="dt-cta-btn">View Course Curriculum &amp; Career Path</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP ORGANISATIONS */}
            <section className="dt-companies dt-section">
                <div className="dt-companies-inner">
                    <h2>Design-Led Organisations</h2>
                    <p>Companies that use design thinking to innovate and lead their markets.</p>
                    <div className="dt-logo-row">
                        <div className="dt-logo-card">
                            <img src={IBMDesignLogo} alt="IBM Design" />
                        </div>
                        <div className="dt-logo-card">
                            <img src={GoogleDesignLogo} alt="Google Design" />
                        </div>
                        <div className="dt-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="dt-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="dt-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="dt-logo-card">
                            <img src={InfosysLogo} alt="Infosys" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS */}
            <section className="dt-highlights dt-section">
                <div className="dt-highlights-inner">
                    <div>
                        <div className="dt-highlights-heading">
                            <h2>What You Will Gain from This Design Thinking Course</h2>
                            <p>Master the toolkit for user-centric innovation.</p>
                        </div>

                        <div className="dt-highlight-grid">
                            <div className="dt-highlight-card">
                                <div className="dt-highlight-icon"><Users size={24} /></div>
                                <h3>Empathy &amp; User Focus</h3>
                                <p>Develop a deep understanding of user needs and perspectives.</p>
                            </div>
                            <div className="dt-highlight-card">
                                <div className="dt-highlight-icon"><Target size={24} /></div>
                                <h3>Problem Solving</h3>
                                <p>Learn to frame problems correctly to find the right solutions.</p>
                            </div>
                            <div className="dt-highlight-card">
                                <div className="dt-highlight-icon"><Lightbulb size={24} /></div>
                                <h3>Creative Confidence</h3>
                                <p>Unlock your creativity and learn techniques to generate diverse ideas.</p>
                            </div>
                            <div className="dt-highlight-card">
                                <div className="dt-highlight-icon"><Layout size={24} /></div>
                                <h3>Rapid Prototyping</h3>
                                <p>Build quick, low-cost prototypes to bring ideas to life and test them.</p>
                            </div>
                            <div className="dt-highlight-card">
                                <div className="dt-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Collaboration</h3>
                                <p>Work effectively in diverse teams to co-create solutions.</p>
                            </div>
                            <div className="dt-highlight-card">
                                <div className="dt-highlight-icon"><Zap size={24} /></div>
                                <h3>Innovation Mindset</h3>
                                <p>Embrace experimentation and learn from failure to drive progress.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="dt-highlights-visual">
                        <div className="dt-process-visual">
                            <div className="dt-process-step">
                                <span>1</span>
                                <strong>Empathise</strong>
                            </div>
                            <div className="dt-process-line"></div>
                            <div className="dt-process-step">
                                <span>2</span>
                                <strong>Define</strong>
                            </div>
                            <div className="dt-process-line"></div>
                            <div className="dt-process-step">
                                <span>3</span>
                                <strong>Ideate</strong>
                            </div>
                            <div className="dt-process-line"></div>
                            <div className="dt-process-step">
                                <span>4</span>
                                <strong>Prototype</strong>
                            </div>
                            <div className="dt-process-line"></div>
                            <div className="dt-process-step">
                                <span>5</span>
                                <strong>Test</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE */}
            <section className="dt-tools dt-section">
                <div className="dt-tools-inner">
                    <h2>Tools for Design &amp; Collaboration</h2>
                    <p>Familiarise yourself with digital tools used for remote design thinking.</p>

                    <div className="dt-tools-grid">
                        <div className="dt-tools-card">
                            <img className="dt-tools-logo" src={MiroLogo} alt="Miro" />
                            <span>Miro</span>
                        </div>
                        <div className="dt-tools-card">
                            <img className="dt-tools-logo" src={FigmaLogo} alt="Figma" />
                            <span>Figma</span>
                        </div>
                        <div className="dt-tools-card">
                            <img className="dt-tools-logo" src={CanvaLogo} alt="Canva" />
                            <span>Canva</span>
                        </div>

                    </div>
                </div>
            </section>

            {/* MORE DETAILS */}
            <section className="dt-more dt-section">
                <div className="dt-more-inner">
                    <div className="dt-more-header">
                        <h2>Careers &amp; Application</h2>
                        <p>See how Design Thinking applies to careers and real-world impact.</p>
                    </div>

                    <div className="dt-more-grid">
                        {/* Card 1: Application */}
                        <div className="dt-more-card">
                            <div className="dt-more-top">
                                <div className="dt-more-icon"><Brain size={24} /></div>
                                <div>
                                    <h3 className="dt-more-title">Innovate Everywhere</h3>
                                    <p className="dt-more-text">
                                        Apply design thinking to product development, service design, process improvement
                                        and even organisational change.
                                    </p>
                                </div>
                            </div>
                            <div className="dt-tool-logos">
                                <img className="dt-tool-logo" src={MiroLogo} alt="Miro" />
                                <img className="dt-tool-logo" src={FigmaLogo} alt="Figma" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="dt-more-card">
                            <div className="dt-more-top">
                                <div className="dt-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="dt-more-title">Relevant Roles</h3>
                                    <p className="dt-more-text">
                                        Enhance your profile for various roles across industries.
                                    </p>
                                </div>
                            </div>
                            <div className="dt-roles-image">
                                <span className="dt-role-tag">Product Manager</span>
                                <span className="dt-role-tag">UX Designer</span>
                                <span className="dt-role-tag">Innovation Consultant</span>
                                <span className="dt-role-tag">Service Designer</span>
                                <span className="dt-role-tag">User Researcher</span>
                                <span className="dt-role-tag">Team Lead</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="dt-more-card">
                            <div className="dt-more-top">
                                <div className="dt-more-icon"><Map size={24} /></div>
                                <div>
                                    <h3 className="dt-more-title">Your Learning Path</h3>
                                    <p className="dt-more-text">
                                        From understanding the user to delivering a tested solution.
                                    </p>
                                </div>
                            </div>
                            <div className="dt-journey">
                                <div className="dt-journey-step">User Research &amp; Empathy Maps</div>
                                <div className="dt-journey-step">Problem Framing &amp; Ideation</div>
                                <div className="dt-journey-step">Prototyping &amp; User Testing</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DesignThinkingCourse;
