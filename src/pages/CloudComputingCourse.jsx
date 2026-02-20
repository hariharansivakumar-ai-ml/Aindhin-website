import { useEffect, useState } from 'react';
import './CloudComputingCourse.css';

// Import local images
import CloudHeroImg from '../assets/cloud_computing.jpg';

// Logos
import AWSLogo from '../assets/aws_logo.svg';
import AzureLogo from '../assets/azure_logo.svg';
import GoogleCloudLogo from '../assets/google_cloud_logo.svg';
import IBMLogo from '../assets/ibm_logo.svg';
import AccentureLogo from '../assets/accenture_logo.svg';
import DeloitteLogo from '../assets/deloitte_logo.svg';
import TCSLogo from '../assets/tcs_logo.svg';
import WiproLogo from '../assets/wipro_logo.svg';

import DockerLogo from '../assets/docker_logo.png';
import KubernetesLogo from '../assets/kubernetes_logo.svg';
import LinuxLogo from '../assets/linux_logo.svg';
import MySQLLogo from '../assets/mysql_logo.svg';
import GitHubLogo from '../assets/github_logo.svg';

import {
    Cloud, Server, Shield, Activity, Terminal, Layers, TrendingUp,
    Clock, Users, Target, Briefcase, Award, Map, CheckCircle
} from 'lucide-react';

const CloudComputingCourse = () => {

    const [openModule, setOpenModule] = useState(1);

    useEffect(() => {
        document.title = "Cloud Computing Course: Master AWS, Azure & GCP | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Master the world's leading cloud platforms. Learn virtualization, containerization, and cloud architecture with our industry-focused Cloud Computing course.");
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
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${CloudHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">Cloud Computing Course</span>
                    <h1 className="fs-hero-title">
                        Scale Your Career in the Cloud: Master AWS, Azure &amp; Google Cloud
                    </h1>
                    <p className="fs-hero-sub">
                        Learn the fundamentals of cloud computing, AWS / Azure / Google Cloud, virtualisation,
                        networking, storage, security and DevOps basics. Build the skills to deploy and manage
                        applications in the cloud.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Key topics: Cloud Basics, AWS / Azure / GCP, Networking, Storage, Security, DevOps</span>
                        <span>Professional Course · Duration as per institution (often 3–6 months)</span>
                        <span>Beginner‑friendly · Ideal for students &amp; working professionals · 4.6 / 5 learner feedback</span>
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
                                    This Cloud Computing Course introduces you to the core concepts, services and
                                    architectures that power modern cloud platforms. You will understand how public,
                                    private and hybrid clouds work, and how leading providers like AWS, Azure and Google
                                    Cloud deliver compute, storage, networking and security services.
                                </p>
                                <p>
                                    Through hands‑on labs and guided projects, you will work with real cloud consoles,
                                    deploy virtual machines, configure networks, set up storage, manage identities and
                                    apply basic automation. By the end of the course, you’ll be comfortable reading
                                    architecture diagrams, using key cloud services and preparing for entry‑level cloud
                                    and DevOps roles or certifications.
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
                                        <Cloud className="fs-module-icon" size={20} />
                                        <span>Module 1: Cloud Basics &amp; Core Services</span>
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
                                        <li>Introduction to Cloud Computing – concepts, models (IaaS, PaaS, SaaS)</li>
                                        <li>Public, Private &amp; Hybrid Cloud – when and why they are used</li>
                                        <li>Overview of AWS, Microsoft Azure &amp; Google Cloud Platform (GCP)</li>
                                        <li>Compute Services – virtual machines, auto‑scaling, containers (intro)</li>
                                        <li>Storage Services – object, block &amp; file storage basics</li>
                                        <li>Hands‑on: Creating a free‑tier account and launching your first VM</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="fs-module">
                                <div
                                    className={`fs-module-header ${openModule === 2 ? 'active' : ''}`}
                                    onClick={() => toggleModule(2)}
                                >
                                    <div className="fs-module-title">
                                        <Shield className="fs-module-icon" size={20} />
                                        <span>Module 2: Networking, Security &amp; Identity</span>
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
                                        <li>Cloud Networking Fundamentals – VPC / VNet, subnets, IPs &amp; routing</li>
                                        <li>Load Balancers, Gateways &amp; Content Delivery Networks (CDN)</li>
                                        <li>Cloud Security Basics – shared responsibility model</li>
                                        <li>Identity &amp; Access Management (IAM) – users, roles &amp; policies</li>
                                        <li>Monitoring, Logging &amp; Cost Management fundamentals</li>
                                        <li>Hands‑on: Secure access to instances and configure basic network rules</li>
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
                                        <span>Module 3: DevOps Basics, Automation &amp; Cloud Architectures</span>
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
                                        <li>Introduction to DevOps &amp; CI/CD in the Cloud</li>
                                        <li>Infrastructure as Code (IaC) concepts – templates &amp; automation</li>
                                        <li>Containers &amp; Orchestration Basics (Docker &amp; Kubernetes overview)</li>
                                        <li>Common Cloud Architectures – 3‑tier apps, serverless (concepts)</li>
                                        <li>Cost Optimisation, High Availability &amp; Scalability principles</li>
                                        <li>Hands‑on: Deploy a simple web app with basic automation</li>
                                    </ul>
                                    <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                        *Exact modules and cloud provider focus may vary as per institution and curriculum.
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
                                        <span>Projects: Hands‑on Labs &amp; Mini‑Projects</span>
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
                                        <li>Lab exercises to deploy and manage VMs, storage, networks and IAM</li>
                                        <li>Mini‑project: Host a static / simple dynamic website on the cloud</li>
                                        <li>Mini‑project: Build a basic 3‑tier cloud architecture with load balancer</li>
                                        <li>Case study: Cost‑optimising an existing cloud setup</li>
                                        <li>Optional: Mapping course work to entry‑level cloud certification paths</li>
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
                                        <span>Cloud Computing Course · Duration as per institution (commonly 3–6 months, classroom / online / blended).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Users size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>Any graduate / final‑year student / working professional with basic computer and networking awareness. IT / CS background is helpful but not mandatory.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Cloud fundamentals, AWS / Azure / GCP services, networking, security, DevOps basics and architectures.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Briefcase size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students and professionals aiming for cloud, DevOps, site reliability or infrastructure roles, or preparing for cloud certifications.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Learner Feedback</strong>
                                        <span>4.6 / 5 average rating (industry‑relevant content, practical labs &amp; certification alignment).</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Course Curriculum &amp; Cloud Career Path</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP SECTORS / ORGANISATIONS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Top Sectors Using Cloud Computing</h2>
                    <p>Cloud skills are in demand across IT services, product companies, startups, BFSI, healthcare and more.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={AWSLogo} alt="AWS" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AzureLogo} alt="Microsoft Azure" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={GoogleCloudLogo} alt="Google Cloud" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={IBMLogo} alt="IBM Cloud" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={AccentureLogo} alt="Accenture" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={DeloitteLogo} alt="Deloitte" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={TCSLogo} alt="TCS" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={WiproLogo} alt="Wipro" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This Cloud Computing Course</h2>
                            <p>Develop the practical skills and confidence to work with leading cloud platforms.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Cloud size={24} /></div>
                                <h3>Cloud Fundamentals</h3>
                                <p>Understand core cloud concepts, service models and deployment models clearly.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Server size={24} /></div>
                                <h3>Service Knowledge</h3>
                                <p>Learn how compute, storage, networking and security services work on AWS / Azure / GCP.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Shield size={24} /></div>
                                <h3>Networking &amp; Security</h3>
                                <p>Configure VPC / VNet, subnets, firewalls and IAM for secure cloud setups.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Activity size={24} /></div>
                                <h3>DevOps Basics</h3>
                                <p>Get introduced to CI/CD, containers and automation for modern cloud deployments.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Layers size={24} /></div>
                                <h3>Architecture Thinking</h3>
                                <p>Read and design simple cloud architectures with high availability and scalability.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><TrendingUp size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Prepare for entry‑level cloud / DevOps roles and map your path to certifications.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Cloud Resource Monitoring Snapshot</span>
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
                                <span>CPU</span>
                                <span>Memory</span>
                                <span>Traffic</span>
                                <span>Cost</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE COURSE (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Platforms You May Work With</h2>
                    <p>Become familiar with the core cloud and DevOps tools used in modern IT teams.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={AWSLogo} alt="AWS" />
                            <span>AWS (Amazon Web Services)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={AzureLogo} alt="Azure" />
                            <span>Microsoft Azure</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GoogleCloudLogo} alt="Google Cloud" />
                            <span>Google Cloud Platform</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={DockerLogo} alt="Docker" />
                            <span>Docker (containers)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={KubernetesLogo} alt="Kubernetes" />
                            <span>Kubernetes (overview)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={LinuxLogo} alt="Linux" />
                            <span>Linux &amp; Shell Basics</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MySQLLogo} alt="MySQL" />
                            <span>MySQL / Cloud Databases</span>
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
                        <p>See how this Cloud Computing Course builds your skills and prepares you for cloud &amp; DevOps careers.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Cloud Skills from Zero to Practical</h3>
                                    <p className="fs-more-text">
                                        Move from basic concepts to hands‑on use of key services and simple architectures
                                        on major cloud platforms.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <img className="fs-tool-logo" src={AWSLogo} alt="AWS" />
                                <img className="fs-tool-logo" src={AzureLogo} alt="Azure" />
                                <img className="fs-tool-logo" src={GoogleCloudLogo} alt="GCP" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                                    <p className="fs-more-text">
                                        Use your course labs and mini‑projects to build a strong entry‑level cloud profile.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Cloud Support Associate</span>
                                <span className="fs-role-tag">Cloud Operations / SysOps Engineer (Junior)</span>
                                <span className="fs-role-tag">DevOps / SRE Trainee</span>
                                <span className="fs-role-tag">Infrastructure / Network Engineer (Cloud)</span>
                                <span className="fs-role-tag">Junior Cloud Administrator</span>
                                <span className="fs-role-tag">Pathway to Cloud Architect &amp; Consultant roles</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Map size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your Learning Journey</h3>
                                    <p className="fs-more-text">
                                        A clear module‑wise roadmap from basics of cloud to DevOps concepts and projects.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Module 1: Cloud foundations, core services &amp; first deployments.</div>
                                <div className="fs-journey-step">Module 2: Networking, security, IAM, monitoring &amp; cost basics.</div>
                                <div className="fs-journey-step">Module 3: DevOps basics, automation, architectures &amp; mini‑projects.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CloudComputingCourse;
