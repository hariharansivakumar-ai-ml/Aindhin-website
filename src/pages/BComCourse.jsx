import { useEffect, useState } from 'react';
import {
    Calculator, FileText, Monitor, CheckCircle, Award,
    Briefcase, TrendingUp, IndianRupee, Database, Target, BookOpen
} from 'lucide-react';
import './BComCourse.css'; // Make sure to save the CSS in this file
import BComHeroImg from '../assets/B_com_scaled.webp';

// Import logos
import HDFCLogo from '../assets/hdfc_logo.svg';
import InfosysLogo from '../assets/infosys_logo.svg';
import TCSLogo from '../assets/tcs_logo.svg';
import WiproLogo from '../assets/wipro_logo.svg';
import DeloitteLogo from '../assets/deloitte_logo.svg';
import EYLogo from '../assets/ey_logo.svg';
import HCLLogo from '../assets/hcl_logo.svg';

import TallyLogo from '../assets/tally_logo.webp';
import ExcelLogo from '../assets/office_365_logo.webp';
import WordLogo from '../assets/word_logo.webp';
import PowerPointLogo from '../assets/powerpoint_logo.svg';
import MySQLLogo from '../assets/mysql_logo.svg';
import PowerBILogo from '../assets/power_bi_logo.svg';
import HTML5Logo from '../assets/html5_logo.svg';
import VSCodeLogo from '../assets/vscode_logo.svg';
import GoogleDriveLogo from '../assets/google_drive_logo.webp';


const BComCourse = () => {
    useEffect(() => {
        document.title = "B.Com Computer Applications: Commerce & Technology | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
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
        <div className="fs-course">

            {/* HERO */}
            <section
                className="fs-hero fs-section"
                style={{
                    background: `linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.7)), url(${BComHeroImg}) center/cover no-repeat`
                }}
            >
                <div className="fs-hero-content">
                    <span className="fs-badge">B.Com · Computer Applications</span>
                    <h1 className="fs-hero-title">
                        B.Com Computer Applications: The Perfect Blend of Commerce &amp; Technology
                    </h1>
                    <p className="fs-hero-sub">
                        Combine a strong commerce foundation with practical computer skills. Learn financial
                        accounting, taxation, Tally, business law and computer applications that are widely used
                        in accounting, finance and business operations.
                    </p>
                    <div className="fs-hero-meta">
                        <span>Program highlights: Financial Accounting, Taxation, Tally, Business Law, Computer Applications</span>
                        <span>UG Degree · 3 Years · Full‑time</span>
                        <span>Undergraduate · Commerce + Technology‑focused curriculum · 4.5 / 5 student reviews</span>
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
                            <h2>About This Programme</h2>
                            <div className="fs-about-text">
                                <p>
                                    The B.Com (Computer Applications) programme blends core commerce subjects with
                                    essential computer skills. You build strong fundamentals in accounting, taxation,
                                    business law and economics, while learning how to use software and applications
                                    that power modern businesses.
                                </p>
                                <p>
                                    Through lab sessions and projects, you gain hands‑on experience with Tally,
                                    spreadsheets, databases, office automation tools and basic programming. This
                                    combination prepares you for accounting, finance, back‑office and technology‑enabled
                                    business roles, or further studies such as M.Com, MBA, CA, CMA and professional
                                    certifications.
                                </p>
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="fs-card">
                            <h2>Syllabus Overview</h2>

                            <details className="fs-module" open={openModuleIndex === 0}>
                                <summary onClick={(e) => handleToggle(0, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 1</span>
                                        <span>Commerce Foundations &amp; Basic Computer Skills</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Financial Accounting – I (fundamentals, journal, ledger, final accounts)</li>
                                        <li>Business Economics &amp; Business Environment</li>
                                        <li>Business Management &amp; Organization Behaviour</li>
                                        <li>Business Mathematics &amp; Statistics for Commerce</li>
                                        <li>Introduction to Information Technology</li>
                                        <li>Office Automation Tools (MS Word, Excel, PowerPoint)</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 1}>
                                <summary onClick={(e) => handleToggle(1, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 2</span>
                                        <span>Accounting, Taxation &amp; Computer Applications</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Financial Accounting – II (partnership, company accounts basics)</li>
                                        <li>Cost &amp; Management Accounting fundamentals</li>
                                        <li>Business Law &amp; Company Law basics</li>
                                        <li>Income Tax – I (introduction, computation of income)</li>
                                        <li>Computer Applications in Business (spreadsheets, DBMS concepts)</li>
                                        <li>Tally ERP / TallyPrime – computerized accounting lab</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 2}>
                                <summary onClick={(e) => handleToggle(2, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Year 3</span>
                                        <span>Advanced Commerce &amp; Technology Integration</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Advanced Accounting &amp; Auditing</li>
                                        <li>Management Accounting &amp; Financial Analysis</li>
                                        <li>Income Tax – II &amp; Basics of GST</li>
                                        <li>E‑Commerce &amp; Web Technologies for Business</li>
                                        <li>Database Management Systems / MIS for Business</li>
                                        <li>Computer Applications in Accounting &amp; Finance (project‑based)</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="fs-module" open={openModuleIndex === 3}>
                                <summary onClick={(e) => handleToggle(3, e)}>
                                    <div className="fs-module-title">
                                        <span className="fs-module-label">Projects</span>
                                        <span>Labs, Practical Work &amp; Final Project</span>
                                    </div>
                                </summary>
                                <div className="fs-module-content">
                                    <ul>
                                        <li>Regular accounting and taxation problem‑solving sessions</li>
                                        <li>Practical Tally assignments for vouchers, ledgers and reports</li>
                                        <li>Spreadsheet‑based financial models and MIS reports</li>
                                        <li>Mini‑projects in e‑commerce and office automation</li>
                                        <li>Final‑year project integrating commerce concepts and computer applications</li>
                                    </ul>
                                </div>
                            </details>
                        </section>
                    </div>

                    {/* Right side */}
                    <aside className="fs-right">
                        <section className="fs-card">
                            <h2>Programme Details</h2>
                            <ul className="fs-detail-list">
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Briefcase size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Degree &amp; Duration</strong>
                                        <span>Bachelor of Commerce (B.Com) – Computer Applications · 3 years (6 semesters), full‑time</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><CheckCircle size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Eligibility</strong>
                                        <span>As per university norms (typically 10+2 or equivalent from a recognised board, preferably with commerce / related stream).</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Target size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Focus Areas</strong>
                                        <span>Accounting, taxation, business law, computer applications, Tally and basic data handling for business.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><TrendingUp size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Ideal For</strong>
                                        <span>Students interested in commerce careers with additional technology skills for accounting, finance and office automation roles.</span>
                                    </div>
                                </li>
                                <li className="fs-detail-item">
                                    <div className="fs-detail-icon"><Award size={20} /></div>
                                    <div className="fs-detail-text">
                                        <strong>Student Reviews</strong>
                                        <span>4.5 / 5 average reviews (practical exposure, faculty guidance and industry relevance).</span>
                                    </div>
                                </li>
                            </ul>

                            <a href="#top" className="fs-cta-btn">View Program Details &amp; Admission Process</a>
                        </section>
                    </aside>

                </div>
            </main>

            {/* TOP COMPANIES / SECTORS */}
            <section className="fs-companies fs-section">
                <div className="fs-companies-inner">
                    <h2>Career Sectors for B.Com (Computer Applications) Graduates</h2>
                    <p>Graduates can work in accounting firms, banks, IT &amp; BPO companies, finance back‑office, MIS and support roles.</p>
                    <div className="fs-logo-row">
                        <div className="fs-logo-card">
                            <img src={HDFCLogo} alt="HDFC Bank" />
                        </div>
                        <div className="fs-logo-card">
                            <img src={InfosysLogo} alt="Infosys" />
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
                            <img src={HCLLogo} alt="HCLTech" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXTRA PROGRAM DETAILS WITH ICONS / REPRESENTATION */}
            <section className="fs-highlights fs-section">
                <div className="fs-highlights-inner">
                    <div>
                        <div className="fs-highlights-heading">
                            <h2>What You Will Gain from This B.Com (CA) Programme</h2>
                            <p>Graduate with both commerce depth and practical technology skills used in offices every day.</p>
                        </div>

                        <div className="fs-highlight-grid">
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Calculator size={24} /></div>
                                <h3>Solid Accounting Base</h3>
                                <p>Understand how to record, summarise and interpret financial information for businesses.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><FileText size={24} /></div>
                                <h3>Taxation Fundamentals</h3>
                                <p>Learn basic income tax and GST concepts, and how to apply them in practical scenarios.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><BookOpen size={24} /></div>
                                <h3>Business Law Awareness</h3>
                                <p>Gain clarity on contracts, companies, and the legal framework governing commerce.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Monitor size={24} /></div>
                                <h3>Computer Applications</h3>
                                <p>Use MS Office, databases and web tools to support accounting, reporting and documentation.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Database size={24} /></div>
                                <h3>Tally &amp; ERP Skills</h3>
                                <p>Work with Tally ERP/TallyPrime to manage vouchers, ledgers, GST and financial statements.</p>
                            </div>
                            <div className="fs-highlight-card">
                                <div className="fs-highlight-icon"><Briefcase size={24} /></div>
                                <h3>Career Readiness</h3>
                                <p>Develop communication, documentation and basic analytical skills for entry‑level roles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual representation */}
                    <div className="fs-highlights-visual">
                        <div className="fs-dashboard">
                            <div className="fs-dashboard-header">
                                <span>Accounts &amp; MIS Snapshot</span>
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
                                <span>Sales</span>
                                <span>Expenses</span>
                                <span>Profit</span>
                                <span>Ledger</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS USED IN THE PROGRAM (LOGOS) */}
            <section className="fs-tools fs-section">
                <div className="fs-tools-inner">
                    <h2>Tools &amp; Applications You May Work With</h2>
                    <p>Get hands‑on practice with popular accounting, office and basic database tools.</p>

                    <div className="fs-tools-grid">
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={TallyLogo} alt="Tally" />
                            <span>Tally ERP / TallyPrime</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={ExcelLogo} alt="Excel" />
                            <span>MS Excel (spreadsheets)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={WordLogo} alt="Word" />
                            <span>MS Word (documentation)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerPointLogo} alt="PowerPoint" />
                            <span>PowerPoint (presentations)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={MySQLLogo} alt="MySQL" />
                            <span>MySQL / DBMS basics</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={PowerBILogo} alt="Power BI" />
                            <span>BI &amp; reporting tools (intro)</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={HTML5Logo} alt="HTML5" />
                            <span>HTML / Web basics</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={VSCodeLogo} alt="VS Code" />
                            <span>Code editor for labs</span>
                        </div>
                        <div className="fs-tools-card">
                            <img className="fs-tools-logo" src={GoogleDriveLogo} alt="Google Drive" />
                            <span>Cloud storage &amp; docs</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
            <section className="fs-more fs-section">
                <div className="fs-more-inner">
                    <div className="fs-more-header">
                        <h2>Careers &amp; Learning Journey</h2>
                        <p>See how this B.Com (CA) builds your skills over 3 years and maps to common commerce roles.</p>
                    </div>

                    <div className="fs-more-grid">
                        {/* Card 1: Focus overview */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Award size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Commerce + Technology Advantage</h3>
                                    <p className="fs-more-text">
                                        Combine traditional B.Com subjects with hands‑on computer labs so you can handle
                                        both accounting concepts and the software used to implement them.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-tool-logos">
                                <img className="fs-tool-logo" src={TallyLogo} alt="Tally" />
                                <img className="fs-tool-logo" src={ExcelLogo} alt="Excel" />
                                <img className="fs-tool-logo" src={MySQLLogo} alt="MySQL" />
                            </div>
                        </div>

                        {/* Card 2: Roles */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Briefcase size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Career Roles You Can Target</h3>
                                    <p className="fs-more-text">
                                        Build a profile for finance, accounts and technology‑enabled back‑office roles.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-roles-image">
                                <span className="fs-role-tag">Accounts Executive</span>
                                <span className="fs-role-tag">Tally / Computerised Accountant</span>
                                <span className="fs-role-tag">Finance &amp; Accounts Associate</span>
                                <span className="fs-role-tag">Back‑office / Operations Executive</span>
                                <span className="fs-role-tag">MIS Executive / Data Entry Supervisor</span>
                                <span className="fs-role-tag">Support role in CA / Audit firms</span>
                            </div>
                        </div>

                        {/* Card 3: Journey */}
                        <div className="fs-more-card">
                            <div className="fs-more-top">
                                <div className="fs-more-icon"><Target size={24} /></div>
                                <div>
                                    <h3 className="fs-more-title">Your 3‑Year Learning Journey</h3>
                                    <p className="fs-more-text">
                                        From basic accounting to computerised accounts and simple reports – mapped semester‑wise.
                                    </p>
                                </div>
                            </div>
                            <div className="fs-journey">
                                <div className="fs-journey-step">Year 1: Foundations in accounting, economics, management &amp; basic IT tools.</div>
                                <div className="fs-journey-step">Year 2: Costing, business law, taxation basics, Tally and computer applications.</div>
                                <div className="fs-journey-step">Year 3: Advanced accounting, auditing, tax, DBMS / MIS, e‑commerce &amp; project.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BComCourse;
