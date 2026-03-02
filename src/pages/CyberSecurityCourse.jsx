import { useEffect, useState } from 'react';
import './CyberSecurityCourse.css';

// Import local images
import CyberHeroImg from '../assets/cyber_security_hero.webp';

// Logos
import IBMLogo from '../assets/ibm_logo.svg';
import CiscoLogo from '../assets/cisco_logo.svg';
import PaloAltoLogo from '../assets/palo_alto_logo.webp';
import DeloitteLogo from '../assets/deloitte_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import TCSLogo from '../assets/tcs_logo.svg';
import WiproLogo from '../assets/wipro_logo.svg';
import MicrosoftLogo from '../assets/microsoft_logo.svg';

import LinuxLogo from '../assets/linux_logo.svg';
import WiresharkLogo from '../assets/wireshark_logo.webp';
import NmapLogo from '../assets/nmap_logo.webp';
import KaliLogo from '../assets/kali_linux_logo.svg';
import SplunkLogo from '../assets/splunk_logo.webp';
import PythonLogo from '../assets/python_logo.svg';
import MySQLLogo from '../assets/mysql_logo.svg';
import GitHubLogo from '../assets/github_logo.svg';

import {
    Shield, Lock, Eye, AlertTriangle, Terminal, FileText, Globe, Server, UserCheck,
    Clock, Users, Target, Briefcase, Award, Map, Activity
} from 'lucide-react';

const CyberSecurityCourse = () => {

    const [openModule, setOpenModule] = useState(1);

    useEffect(() => {
        document.title = "Cyber Security Course: Become an Ethical Hacker | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);

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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${CyberHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Cyber Security Course</span>
                    <h1 className="fs-hero-title">
                        Protect the Digital Frontier: Master Cyber Security &amp; Ethical Hacking
                    </h1>
                    <p className="fs-hero-sub">
                        Learn how to protect systems, networks and data from cyber threats. Build skills in
                        network security, ethical hacking basics, incident response, security operations and
                        best practices used by modern organisations.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Networking, OS Concepts, Ethical Hacking, SOC, Incident Response, Tools</span>
                        <span>Professional Course · Duration as per institution (often 4–6 months)</span>
                        <span>Beginner‑friendly · Ideal for students &amp; working professionals · 4.7 / 5 learner feedback</span>
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
                                    This Cyber Security Course is designed to give you a strong foundation in how attacks
                                    happen and how to defend against them. You start with networking, operating systems
                                    and security fundamentals, and then move into ethical hacking basics, vulnerability
                                    assessment, secure configuration and incident response.
                                </p>
                                <p>
                                    Through labs and practical exercises, you will work with popular security tools,
                                    analyse logs, simulate attacks in a safe environment and build a defender’s mindset.
                                    By the end of the course, you’ll be ready for entry‑level cybersecurity roles like
                                    security analyst, SOC analyst or IT security engineer – or to pursue advanced
                                    certifications in the field.
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
                                        <Shield className="fs-module-icon" size={20} />
                                        <span>Module 1: Security Fundamentals &amp; Networking Basics</span>
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
                                        <li>Introduction to Cyber Security – CIA triad, threat landscape, terminology</li>
                                        <li>Computer Networks – OSI/TCP‑IP models, IP, ports, protocols</li>
                                        <li>Operating Systems Basics (Windows &amp; Linux) for Security</li>
                                        <li>Fundamentals of Cryptography – encryption, hashing, keys (concepts)</li>
                                        <li>Security Policies, Access Control &amp; Authentication Concepts</li>
                                        <li>Lab: Exploring network traffic &amp; system logs (intro with tools)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 2 ? 'active' : ''}`}
                                    onClick={() => toggleModule(2)}
                                >
                                    <div className="fs-module-title">
                                        <Eye className="fs-module-icon" size={20} />
                                        <span>Module 2: Ethical Hacking Basics &amp; System Security</span>
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
                                        <li>Introduction to Ethical Hacking &amp; Penetration Testing Phases</li>
                                        <li>Reconnaissance &amp; Scanning – information gathering, Nmap basics</li>
                                        <li>Vulnerability Assessment – common weaknesses &amp; misconfigurations</li>
                                        <li>System &amp; Network Hardening – secure configuration practices</li>
                                        <li>Web Application Basics &amp; Common Attacks (OWASP Top 10 – overview)</li>
                                        <li>Lab: Simple vulnerability scan &amp; reporting in a controlled environment</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 3 ? 'active' : ''}`}
                                    onClick={() => toggleModule(3)}
                                >
                                    <div className="fs-module-title">
                                        <Activity className="fs-module-icon" size={20} />
                                        <span>Module 3: Security Operations, Monitoring &amp; Incident Response</span>
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
                                        <li>Security Operations Centre (SOC) – roles, processes &amp; tools</li>
                                        <li>Log Analysis &amp; SIEM Fundamentals – detecting suspicious activity</li>
                                        <li>Incident Response Lifecycle – preparation, detection, containment, recovery</li>
                                        <li>Malware &amp; Phishing Basics – prevention and user awareness</li>
                                        <li>Cloud &amp; Endpoint Security – key considerations (overview)</li>
                                        <li>Compliance &amp; Standards – basics of ISO 27001, PCI‑DSS, GDPR (concepts)</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Exact modules and tools may vary as per institution and curriculum.
                                    </p>
                                </div>
                            </div>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 4 ? 'active' : ''}`}
                                    onClick={() => toggleModule(4)}
                                >
                                    <div className="fs-module-title">
                                        <Terminal className="fs-module-icon" size={20} />
                                        <span>Projects: Labs, Case Studies &amp; Mini‑Projects</span>
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
                                        <li>Hands‑on labs for network scanning, log analysis and basic hardening</li>
                                        <li>Mini‑project: Secure configuration of a small network / system setup</li>
                                        <li>Case study: Analysing a real‑world breach and writing an incident report</li>
                                        <li>Optional mini CTF‑style exercises in a safe lab environment</li>
                                        <li>Portfolio preparation – documenting your labs and mini‑projects</li>
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
                                        <span>Cyber Security Course · Duration as per institution (commonly 4–6 months, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Any graduate / final‑year student / working professional with basic computer skills. Comfort with networking &amp; OS concepts is helpful but not mandatory.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Security fundamentals, networking, ethical hacking basics, system hardening, SOC operations and incident response.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Briefcase size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students and professionals planning careers as security analyst, SOC analyst, penetration tester (junior) or IT security engineer.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>4.7 / 5 average rating (practical labs, tool exposure, instructor support &amp; career guidance).</span>
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
                    <h2>Top Sectors Hiring Cyber Security Professionals</h2>
                    <p>Cyber security skills are needed across IT services, BFSI, telecom, consulting, government and startups.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={IBMLogo} alt="IBM Security" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={CiscoLogo} alt="Cisco" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={PaloAltoLogo} alt="Palo Alto Networks" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={DeloitteLogo} alt="Deloitte" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={EYLogo} alt="EY" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={TCSLogo} alt="TCS" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={WiproLogo} alt="Wipro" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This Cyber Security Course</h2>
                            <p>Develop the mindset and skills to detect, prevent and respond to cyber threats.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Shield size={24} /></div>
                                <h3>Security Foundations</h3>
                                <p>Get clarity on core security principles, threats, vulnerabilities and controls.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Globe size={24} /></div>
                                <h3>Network &amp; OS Knowledge</h3>
                                <p>Understand how networks and systems work so you can secure and monitor them.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Eye size={24} /></div>
                                <h3>Ethical Hacking Basics</h3>
                                <p>Learn how attackers think and operate, within legal and ethical boundaries.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><UserCheck size={24} /></div>
                                <h3>Defensive Skills</h3>
                                <p>Practise hardening systems, analysing logs and responding to incidents.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Terminal size={24} /></div>
                                <h3>Tool Literacy</h3>
                                <p>Gain hands‑on experience with widely‑used security tools and platforms.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Award size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Build a portfolio of labs and projects aligned with entry‑level security roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Security Events Snapshot</span>
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
                                <span>Alerts</span>
                                <span>Blocked</span>
                                <span>Incidents</span>
                                <span>Systems</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Work With</h2>
                    <p>Become familiar with essential cybersecurity tools used in SOCs and security teams.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={LinuxLogo} alt="Linux" />
                            <span>Linux (Security‑focused)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={WiresharkLogo} alt="Wireshark" />
                            <span>Wireshark (packet analysis)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={NmapLogo} alt="Nmap" />
                            <span>Nmap (network scanning)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={KaliLogo} alt="Kali Linux" />
                            <span>Kali Linux (toolset)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={SplunkLogo} alt="Splunk" />
                            <span>Splunk (SIEM / logging)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PythonLogo} alt="Python" />
                            <span>Python (scripting)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MySQLLogo} alt="MySQL" />
                            <span>Databases &amp; Logs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GitHubLogo} alt="GitHub" />
                            <span>Git &amp; GitHub (repositories)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers &amp; Learning Journey</h2>
                        <p>See how this Cyber Security Course builds your skills and prepares you for security careers.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">From Fundamentals to Practical Skills</h3>
                                    <p className="fs-more-text">
                                        Move from basic security concepts and networking to hands‑on labs with real tools
                                        used by security analysts and ethical hackers.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <img className="fs-tool-logo" src={WiresharkLogo} alt="Wireshark" />
                                <img className="fs-tool-logo" src={NmapLogo} alt="Nmap" />
                                <img className="fs-tool-logo" src={KaliLogo} alt="Kali Linux" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                                    <p className="fs-more-text">
                                        Use your course projects and labs to build a profile for entry‑level security roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Security Analyst / SOC Analyst (Level 1)</span>
                                <span className="fs-role-tag">Information Security Associate</span>
                                <span className="fs-role-tag">Junior Penetration Tester (with further practice)</span>
                                <span className="fs-role-tag">Network / System Administrator (Security‑focused)</span>
                                <span className="fs-role-tag">IT Support with Cyber Security Responsibilities</span>
                                <span className="fs-role-tag">Pathway to Certifications (CEH, CompTIA Security+, etc.)</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your Learning Journey</h3>
                                    <p className="fs-more-text">
                                        A clear module‑wise roadmap from fundamentals to operations and incident response.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Security &amp; networking basics, OS concepts, threat awareness.</div>
                                <div className="fs-journey-step">Module 2: Ethical hacking basics, vulnerability assessment &amp; hardening.</div>
                                <div className="fs-journey-step">Module 3: SOC operations, log analysis, incident response &amp; mini‑projects.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CyberSecurityCourse;
