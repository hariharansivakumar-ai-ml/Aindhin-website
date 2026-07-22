import { useEffect, useRef, useState } from 'react';
import {
  Clock, TrendingUp, CheckCircle, Calendar, Award,
  Code, Database, Brain, Server, Terminal, Cpu
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Hero Image
import heroImg from '../assets/python_hero.webp';

// Tool Logos
import pythonLogo from '../assets/python.svg';
import jupyterLogo from '../assets/jupyter.svg';
import vscodeLogo from '../assets/vscode.svg';
import numpyLogo from '../assets/numpy.svg';
import pandasLogo from '../assets/pandas.svg';
import pytestLogo from '../assets/pytest.svg';
import gitLogo from '../assets/git.svg';


// Company Logos (Reusing existing ones)
import googleLogo from '../assets/google.svg';
import microsoftLogo from '../assets/microsoft.svg';
import awsLogo from '../assets/aws.svg';
import ibmLogo from '../assets/ibm.svg';
import metaLogo from '../assets/meta.webp';
import netflixLogo from '../assets/netflix.svg';
import infosysLogo from '../assets/infosys.svg';
import accentureLogo from '../assets/accenture.svg';

const Section = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PythonCertificationCourse = () => {
  useEffect(() => {
    document.title = "Python Certification Course: Master Python Programming | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
    }
  }, []);

  const [openModuleIndex, setOpenModuleIndex] = useState(0);

  const handleToggle = (index, e) => {
    e.preventDefault();
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <div className="py-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
      <style>{`
            /* ===== PYTHON CERTIFICATION COURSE PAGE (scoped) ===== */
            .py-course{
              font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              color:#0f172a;
              background:#e0f2fe;
              width:100%;
            }
            .py-course *{box-sizing:border-box;}
            
            /* HERO */
            .py-hero{
              color:#fff;
              background:
                linear-gradient(120deg,rgba(15,23,42,.96),rgba(37,99,235,.75)),
                url("${heroImg}")
                center/cover no-repeat;
              padding:70px 20px;
              display:flex;
              align-items:center;
              justify-content:center;
            }
            .py-hero-content{
              max-width:900px;
              text-align:left;
            }
            .py-badge{
              display:inline-block;
              padding:4px 12px;
              border-radius:999px;
              background:rgba(15,23,42,.7);
              border:1px solid rgba(248,250,252,.4);
              font-size:12px;
              letter-spacing:.08em;
              text-transform:uppercase;
              margin-bottom:10px;
            }
            .fs-hero-title{
              color:#fff;
              font-size:64px;
              line-height:1.1;
              margin:0 0 14px;
            }
            .fs-hero-sub{
              font-size:20px;
              max-width:720px;
              color:#e5e7eb;
              margin:0 0 16px;
            }
            .py-hero-meta{
              display:flex;
              flex-wrap:wrap;
              gap:10px 18px;
              font-size:13px;
              color:#e5e7eb;
            }
            .py-hero-meta span::before{
              content:"• ";
              color:#fde68a;
              font-weight:700;
            }
            
            /* MAIN LAYOUT */
            .py-main{padding:40px 20px 50px;}
            .py-main-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
              gap:24px;
            }
            .py-left,.py-right{
              display:flex;
              flex-direction:column;
              gap:16px;
            }
            
            /* CARDS */
            .py-card{
              background:#ffffff;
              border-radius:18px;
              padding:20px 22px;
              box-shadow:0 10px 25px rgba(15,23,42,.08);
            }
            .py-card h2{
              font-size:18px;
              margin:0 0 10px;
              color:#1d4ed8;
            }
            .py-about-text{
              font-size:14px;
              color:#4b5563;
              line-height:1.6;
            }
            
            /* SYLLABUS */
            .py-module{
              border:1px solid #e5e7eb;
              border-radius:12px;
              background:#f9fafb;
              margin-top:8px;
              overflow:hidden;
            }
            .py-module summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .py-module summary::-webkit-details-marker{display:none;}
            .py-module summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .py-module[open] summary::after{transform:rotate(-180deg);}
            .py-module-title{
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              align-items:baseline;
            }
            .py-module-label{
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:.08em;
              color:#111827;   /* dark text */
              font-weight:700; /* bold */
            }
            .py-module-content{
              padding:0 14px 10px 24px;
              font-size:13px;
              color:#4b5563;
            }
            .py-module-content ul{
              margin:0;
              padding-left:16px;
            }
            .py-module-content li{margin-bottom:4px;}
            
            /* RIGHT-COLUMN DETAILS */
            .py-detail-list{
              list-style:none;
              padding:0;
              margin:0 0 16px;
              font-size:14px;
            }
            .py-detail-item{
              display:flex;
              gap:10px;
              margin-bottom:10px;
            }
            .py-detail-icon{
              width:26px;
              height:26px;
              border-radius:999px;
              background:#e0f2fe;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:13px;
              color:#1d4ed8;
              flex-shrink:0;
            }
            .py-detail-text strong{
              display:block;
              font-weight:600;
              color:#111827;
            }
            .py-detail-text span{
              font-size:13px;
              color:#4b5563;
            }
            
            /* CTA BUTTON */
            .py-cta-btn{
              display:block;
              width:100%;
              border-radius:999px;
              padding:11px 16px;
              border:none;
              text-align:center;
              text-decoration:none;
              background:linear-gradient(135deg,#38bdf8,#6366f1);
              color:#fff !important;
              font-weight:600;
              font-size:15px;
              box-shadow:0 14px 30px rgba(37,99,235,.45);
              transition:transform .15s,box-shadow .15s,filter .15s,color .15s;
            }
            .py-cta-btn:hover{
              transform:translateY(-1px);
              filter:brightness(1.04);
              box-shadow:0 18px 40px rgba(37,99,235,.6);
              color:#fff !important;
            }
            
            /* TOP COMPANIES */
            .py-companies{
              background:#e0f2fe;
              padding:40px 20px 40px;
            }
            .py-companies-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .py-companies h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .py-companies p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .py-logo-row{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:18px;
            }
            .py-logo-card{
              width:130px;
              height:62px;
              border-radius:14px;
              background:#ffffff;
              display:flex;
              align-items:center;
              justify-content:center;
              box-shadow:0 8px 18px rgba(15,23,42,.08);
              transition:transform .18s,box-shadow .18s;
            }
            .py-logo-card img{
              max-height:40px;
              max-width:100%;
            }
            .py-logo-card:hover{
              transform:translateY(-3px);
              box-shadow:0 14px 30px rgba(15,23,42,.16);
            }
            
            /* EXTRA COURSE DETAILS SECTION */
            .py-highlights{
              background:#e0f2fe;
              padding:10px 20px 50px;
            }
            .py-highlights-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
              gap:28px;
              align-items:center;
            }
            .py-highlights-heading{
              margin-bottom:12px;
            }
            .py-highlights-heading h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .py-highlights-heading p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .py-highlight-grid{
              margin-top:18px;
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:14px;
            }
            .py-highlight-card{
              background:#ffffff;
              border-radius:16px;
              padding:14px 12px;
              box-shadow:0 10px 24px rgba(15,23,42,.08);
            }
            .py-highlight-icon{
              width:38px;
              height:38px;
              border-radius:999px;
              background:linear-gradient(135deg,#38bdf8,#6366f1);
              display:flex;
              align-items:center;
              justify-content:center;
              color:#fff;
              font-size:20px;
              margin-bottom:8px;
            }
            .py-highlight-card h3{
              font-size:14px;
              margin:0 0 4px;
              color:#0f172a;
            }
            .py-highlight-card p{
              font-size:13px;
              margin:0;
              color:#4b5563;
            }
            
            /* representation "image" block */
            .py-highlights-visual{
              display:flex;
              justify-content:center;
            }
            .py-dashboard{
              width:100%;
              max-width:340px;
              background:#ffffff;
              border-radius:20px;
              padding:14px 14px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.35);
            }
            .py-dashboard-header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:10px;
              font-size:12px;
              color:#0f172a;
            }
            .py-dashboard-dots{
              display:flex;
              gap:4px;
            }
            .py-dashboard-dots span{
              width:7px;
              height:7px;
              border-radius:999px;
              background:#bfdbfe;
            }
            .py-dashboard-graph{
              display:flex;
              gap:6px;
              align-items:flex-end;
              height:90px;
              margin-bottom:12px;
            }
            .py-dashboard-bar{
              flex:1;
              border-radius:8px 8px 2px 2px;
              background:linear-gradient(180deg,#38bdf8,#1d4ed8);
            }
            .py-dashboard-bar:nth-child(2){height:55%;}
            .py-dashboard-bar:nth-child(3){height:80%;}
            .py-dashboard-bar:nth-child(4){height:40%;}
            .py-dashboard-bar:nth-child(5){height:70%;}
            .py-dashboard-bar:nth-child(1){height:30%;}
            .py-dashboard-tags{
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
            }
            .py-dashboard-tags span{
              padding:3px 7px;
              border-radius:999px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            
            /* TOOLS SECTION */
            .py-tools{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .py-tools-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .py-tools-inner h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .py-tools-inner p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .py-tools-grid{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:16px;
            }
            .py-tools-card{
              width:140px;
              height:90px;
              border-radius:16px;
              background:#ffffff;
              box-shadow:0 10px 26px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:center;
              padding:8px;
            }
            .py-tools-logo{
              max-height:36px;
              max-width:90px;
              margin-bottom:4px;
            }
            .py-tools-card span{
              font-size:12px;
              color:#111827;
            }
            
            /* MORE DETAILS SECTION */
            .py-more{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .py-more-inner{
              max-width:1160px;
              margin:0 auto;
            }
            .py-more-header{
              text-align:center;
              margin-bottom:20px;
            }
            .py-more-header h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .py-more-header p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .py-more-grid{
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:18px;
            }
            .py-more-card{
              background:#ffffff;
              border-radius:18px;
              padding:16px 14px;
              box-shadow:0 12px 30px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              gap:8px;
            }
            .py-more-top{
              display:flex;
              align-items:flex-start;
              gap:8px;
            }
            .py-more-icon{
              width:32px;
              height:32px;
              border-radius:999px;
              background:linear-gradient(135deg,#38bdf8,#6366f1);
              color:#fff;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:18px;
            }
            .py-more-title{
              font-size:15px;
              font-weight:600;
              margin:0;
              color:#0f172a;
            }
            .py-more-text{
              font-size:13px;
              color:#4b5563;
              margin:0;
            }
            .py-tool-logos{
              margin-top:12px;
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              align-items:center;
              justify-content:center;
              width:100%;
            }
            .py-tool-logo{
              max-height:32px;
              width:auto;
              filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
            }
            .py-tool-logos img{
              max-height:32px !important;
              width:auto !important;
              object-fit:contain;
            }
            .py-roles-image{
              margin-top:8px;
              display:flex;
              flex-wrap:wrap;
              gap:6px;
            }
            .py-role-tag{
              padding:4px 8px;
              border-radius:999px;
              font-size:11px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            .py-journey{
              margin-top:8px;
              border-left:2px solid #bfdbfe;
              padding-left:10px;
            }
            .py-journey-step{
              position:relative;
              padding-left:10px;
              margin-bottom:6px;
              font-size:12px;
              color:#4b5563;
            }
            .py-journey-step::before{
              content:"";
              position:absolute;
              left:-11px;
              top:5px;
              width:8px;
              height:8px;
              border-radius:999px;
              background:#38bdf8;
            }
            
            /* ENQUIRY / FORM SECTION */
            .py-enquiry{
              background:linear-gradient(135deg,#dbeafe,#e0f2fe);
              padding:40px 20px 50px;
            }
            .py-enquiry-inner{
              max-width:900px;
              margin:0 auto;
            }
            .py-enquiry-card{
              background:#ffffff;
              border-radius:22px;
              padding:24px 22px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.2);
              border-top:4px solid #38bdf8;
            }
            .py-enquiry-header{
              display:flex;
              align-items:flex-start;
              gap:10px;
              margin-bottom:10px;
            }
            .py-enquiry-icon{
              width:32px;
              height:32px;
              border-radius:999px;
              background:radial-gradient(circle at 30% 20%,#38bdf8,#6366f1);
              display:flex;
              align-items:center;
              justify-content:center;
              color:#fff;
              font-size:18px;
            }
            .py-enquiry-title{
              font-size:18px;
              font-weight:700;
              margin:0;
              color:#0f172a;
            }
            .py-enquiry-text{
              font-size:14px;
              color:#4b5563;
              margin:2px 0 12px;
            }
            
            /* FADE-IN ON SCROLL */
            .py-section{
              opacity:0;
              transform:translateY(24px);
              transition:opacity .7s ease-out, transform .7s ease-out;
            }
            .py-section.py-visible{
              opacity:1;
              transform:translateY(0);
            }
            
            /* RESPONSIVE */
            @media (max-width:900px){
              .py-hero{padding:50px 18px;}
              .fs-hero-title{font-size:48px;}
              .py-main-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .py-highlights-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .py-more-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            @media (max-width:640px){
              .py-hero{padding:38px 16px;}
              .py-hero-meta{flex-direction:column;}
              .py-highlight-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            `}</style>

      <div className="py-course" id="top">

        {/* HERO */}
        <Section className="py-hero py-section">
          <div className="py-hero-content">
            <span className="py-badge">Python Programming</span>
            <h1 className="fs-hero-title">
              Master Python Programming: Get Certified and Build Real-World Applications
            </h1>
            <p className="fs-hero-sub">
              Learn Python from the ground up, master core programming concepts, work with data using
              popular libraries, and prepare for Python certification exams and real‑world roles.
            </p>
            <div className="py-hero-meta">
              <span>Covers core Python, OOP, files, modules &amp; virtual envs</span>
              <span>Hands‑on projects using NumPy, Pandas &amp; APIs</span>
              <span>Certification‑aligned practice tests &amp; interview prep</span>
            </div>
          </div>
        </Section>

        {/* MAIN CONTENT */}
        <main className="py-main py-section">
          <div className="py-main-inner">

            {/* Left side */}
            <div className="py-left">

              {/* About */}
              <Section className="py-card">
                <h2>About This Course</h2>
                <div className="py-about-text">
                  <p>
                    This course gives you a solid foundation in Python programming. You’ll begin with
                    syntax, data types and control flow, move into functions and object‑oriented
                    programming, and then explore modules, packages and error handling.
                  </p>
                  <p>
                    You’ll also work with files, CSV/JSON data, virtual environments and popular
                    libraries like NumPy and Pandas. The syllabus is aligned with common Python
                    certification exams and technical interview expectations.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="py-card">
                <h2>Syllabus Covered</h2>

                <details className="py-module" open={openModuleIndex === 0}>
                  <summary onClick={(e) => handleToggle(0, e)}>
                    <div className="py-module-title">
                      <span className="py-module-label">Module 1</span>
                      <span>Python Basics &amp; Core Concepts</span>
                    </div>
                  </summary>
                  <div className="py-module-content">
                    <ul>
                      <li>Python Installation, IDLE &amp; VS Code Setup</li>
                      <li>Variables, Data Types &amp; Type Conversion</li>
                      <li>Operators, Control Flow (if-else, loops)</li>
                      <li>Functions, Lambda Expressions &amp; Recursion</li>
                      <li>String Manipulation &amp; Regular Expressions</li>
                    </ul>
                  </div>
                </details>

                <details className="py-module" open={openModuleIndex === 1}>
                  <summary onClick={(e) => handleToggle(1, e)}>
                    <div className="py-module-title">
                      <span className="py-module-label">Module 2</span>
                      <span>Data Structures &amp; OOPs</span>
                    </div>
                  </summary>
                  <div className="py-module-content">
                    <ul>
                      <li>Lists, Tuples, Sets &amp; Dictionaries</li>
                      <li>Object-Oriented Programming (Classes &amp; Objects)</li>
                      <li>Inheritance, Polymorphism &amp; Encapsulation</li>
                      <li>Exception Handling &amp; File I/O</li>
                      <li>Modules, Packages &amp; Virtual Environments</li>
                    </ul>
                  </div>
                </details>

                <details className="py-module" open={openModuleIndex === 2}>
                  <summary onClick={(e) => handleToggle(2, e)}>
                    <div className="py-module-title">
                      <span className="py-module-label">Module 3</span>
                      <span>Libraries for Data Science</span>
                    </div>
                  </summary>
                  <div className="py-module-content">
                    <ul>
                      <li>NumPy: Arrays &amp; Mathematical Operations</li>
                      <li>Pandas: DataFrames, Cleaning &amp; Analysis</li>
                      <li>Matplotlib &amp; Seaborn: Data Visualisation</li>
                      <li>Introduction to Scikit-Learn (Basic ML concepts)</li>
                      <li>Mini-Project: Data Analysis Dashboard</li>
                    </ul>
                  </div>
                </details>

                <details className="py-module" open={openModuleIndex === 3}>
                  <summary onClick={(e) => handleToggle(3, e)}>
                    <div className="py-module-title">
                      <span className="py-module-label">Module 4</span>
                      <span>Web Development &amp; Automation</span>
                    </div>
                  </summary>
                  <div className="py-module-content">
                    <ul>
                      <li>Introduction to Django / Flask (Web Frameworks)</li>
                      <li>REST APIs &amp; JSON Handling</li>
                      <li>Web Scraping (BeautifulSoup / Selenium)</li>
                      <li>Automating Tasks with Python Scripts</li>
                      <li>Capstone Project: Full-fledged Application</li>
                    </ul>
                  </div>
                </details>
              </Section>
            </div>

            {/* Right side */}
            <aside className="py-right">
              <Section className="py-card">
                <h2>Course Details</h2>
                <ul className="py-detail-list">
                  <li className="py-detail-item">
                    <div className="py-detail-icon"><Clock size={20} /></div>
                    <div className="py-detail-text">
                      <strong>Duration</strong>
                      <span>12 Weeks (80+ hours)</span>
                    </div>
                  </li>
                  <li className="py-detail-item">
                    <div className="py-detail-icon"><TrendingUp size={20} /></div>
                    <div className="py-detail-text">
                      <strong>Skill Level</strong>
                      <span>Beginner to Advanced</span>
                    </div>
                  </li>
                  <li className="py-detail-item">
                    <div className="py-detail-icon"><CheckCircle size={20} /></div>
                    <div className="py-detail-text">
                      <strong>Includes</strong>
                      <span>Live Classes, Projects &amp; Placement Support</span>
                    </div>
                  </li>
                  <li className="py-detail-item">
                    <div className="py-detail-icon"><Calendar size={20} /></div>
                    <div className="py-detail-text">
                      <strong>Next Batch</strong>
                      <span>Coming Soon</span>
                    </div>
                  </li>
                  <li className="py-detail-item">
                    <div className="py-detail-icon"><Award size={20} /></div>
                    <div className="py-detail-text">
                      <strong>Certificate</strong>
                      <span>Python Developer Certification</span>
                    </div>
                  </li>
                </ul>

                <a href="https://user.aindhin.com" target="_blank" rel="noopener noreferrer" className="py-cta-btn">Enroll Now &amp; Start Learning</a>
              </Section>
            </aside>

          </div>
        </main>

        {/* TOP COMPANIES */}
        <Section className="py-companies py-section">
          <div className="py-companies-inner">
            <h2>Top Companies Hiring Python Developers</h2>
            <p>Python powers web apps, data pipelines, ML systems and automation across modern companies.</p>
            <div className="py-logo-row">
              <div className="py-logo-card">
                <img src={googleLogo} alt="Google" />
              </div>
              <div className="py-logo-card">
                <img src={microsoftLogo} alt="Microsoft" />
              </div>
              <div className="py-logo-card">
                <img src={awsLogo} alt="AWS" />
              </div>
              <div className="py-logo-card">
                <img src={ibmLogo} alt="IBM" />
              </div>
              <div className="py-logo-card">
                <img src={metaLogo} alt="Meta" />
              </div>
              <div className="py-logo-card">
                <img src={netflixLogo} alt="Netflix" />
              </div>
              <div className="py-logo-card">
                <img src={infosysLogo} alt="Infosys" />
              </div>
              <div className="py-logo-card">
                <img src={accentureLogo} alt="Accenture" />
              </div>
            </div>
          </div>
        </Section>

        {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
        <Section className="py-highlights py-section">
          <div className="py-highlights-inner">
            <div>
              <div className="py-highlights-heading">
                <h2>What You Will Achieve in This Python Certification Program</h2>
                <p>Develop strong programming fundamentals and hands‑on skills used across Python jobs.</p>
              </div>

              <div className="py-highlight-grid">
                <div className="py-highlight-card">
                  <div className="py-highlight-icon"><Code size={24} /></div>
                  <h3>Versatile Language</h3>
                  <p>Master Python’s simple syntax to build web apps, analyse data, and automate tasks.</p>
                </div>
                <div className="py-highlight-card">
                  <div className="py-highlight-icon"><Database size={24} /></div>
                  <h3>Data Science Ready</h3>
                  <p>Learn powerful libraries like Pandas, NumPy, and Matplotlib for data analysis.</p>
                </div>
                <div className="py-highlight-card">
                  <div className="py-highlight-icon"><Server size={24} /></div>
                  <h3>Backend Development</h3>
                  <p>Build robust backends using frameworks like Django and Flask.</p>
                </div>
                <div className="py-highlight-card">
                  <div className="py-highlight-icon"><Brain size={24} /></div>
                  <h3>AI &amp; ML Foundation</h3>
                  <p>Get started with machine learning concepts using Scikit-Learn.</p>
                </div>
                <div className="py-highlight-card">
                  <div className="py-highlight-icon"><Terminal size={24} /></div>
                  <h3>Automation Scripts</h3>
                  <p>Write scripts to automate repetitive tasks and improve productivity.</p>
                </div>
                <div className="py-highlight-card">
                  <div className="py-highlight-icon"><TrendingUp size={24} /></div>
                  <h3>High Demand</h3>
                  <p>Python developers are among the most sought-after professionals globally.</p>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="py-highlights-visual">
              <div className="py-dashboard">
                <div className="py-dashboard-header">
                  <span>Python Script Performance</span>
                  <div className="py-dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="py-dashboard-graph">
                  <div className="py-dashboard-bar"></div>
                  <div className="py-dashboard-bar"></div>
                  <div className="py-dashboard-bar"></div>
                  <div className="py-dashboard-bar"></div>
                  <div className="py-dashboard-bar"></div>
                </div>
                <div className="py-dashboard-tags">
                  <span>Run Time</span>
                  <span>Memory</span>
                  <span>Tests</span>
                  <span>Coverage</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS USED IN THE COURSE (LOGOS) */}
        <Section className="py-tools py-section">
          <div className="py-tools-inner">
            <h2>Tools &amp; Libraries You Will Use</h2>
            <p>Practice with the most popular tools in the Python ecosystem.</p>

            <div className="py-tools-grid">
              <div className="py-tools-card">
                <img className="py-tools-logo" src={pythonLogo} alt="Python" />
                <span>Python 3.x</span>
              </div>
              <div className="py-tools-card">
                <img className="py-tools-logo" src={jupyterLogo} alt="Jupyter" />
                <span>Jupyter Notebook</span>
              </div>
              <div className="py-tools-card">
                <img className="py-tools-logo" src={vscodeLogo} alt="VS Code" />
                <span>VS Code / IDEs</span>
              </div>
              <div className="py-tools-card">
                <img className="py-tools-logo" src={numpyLogo} alt="NumPy" />
                <span>NumPy</span>
              </div>
              <div className="py-tools-card">
                <img className="py-tools-logo" src={pandasLogo} alt="Pandas" />
                <span>Pandas</span>
              </div>
              <div className="py-tools-card">
                <img className="py-tools-logo" src={pytestLogo} alt="pytest" />
                <span>pytest / unittest</span>
              </div>
              <div className="py-tools-card">
                <img className="py-tools-logo" src={gitLogo} alt="Git" />
                <span>Git &amp; GitHub</span>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE DETAILS WITH ICONS + MINI IMAGES */}
        <Section className="py-more py-section">
          <div className="py-more-inner">
            <div className="py-more-header">
              <h2>Roles &amp; Learning Journey</h2>
              <p>See how this Python course maps to real roles and how your skills grow week by week.</p>
            </div>

            <div className="py-more-grid">
              {/* Card 1: Ecosystem */}
              <div className="py-more-card">
                <div className="py-more-top">
                  <div className="py-more-icon"><Brain size={24} /></div>
                  <div>
                    <h3 className="py-more-title">Power of Python</h3>
                    <p className="py-more-text">
                      From simple scripts to complex AI models, Python powers the modern tech world.
                    </p>
                  </div>
                </div>
                <div className="py-tool-logos">
                  <img className="py-tool-logo" src={pythonLogo} alt="Python" />
                </div>
              </div>

              {/* Card 2: Roles */}
              <div className="py-more-card">
                <div className="py-more-top">
                  <div className="py-more-icon"><Cpu size={24} /></div>
                  <div>
                    <h3 className="py-more-title">Roles You Can Target</h3>
                    <p className="py-more-text">
                      With Python skills, you can aim for diverse roles in tech.
                    </p>
                  </div>
                </div>
                <div className="py-roles-image">
                  <span className="py-role-tag">Python Developer</span>
                  <span className="py-role-tag">Data Analyst</span>
                  <span className="py-role-tag">Backend Developer</span>
                  <span className="py-role-tag">Automation Engineer</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="py-more-card">
                <div className="py-more-top">
                  <div className="py-more-icon"><Award size={24} /></div>
                  <div>
                    <h3 className="py-more-title">Your Learning Path</h3>
                    <p className="py-more-text">
                      Step-by-step mastery from syntax to building deployable applications.
                    </p>
                  </div>
                </div>
                <div className="py-journey">
                  <div className="py-journey-step">Weeks 1-3: Python Basics &amp; Logic</div>
                  <div className="py-journey-step">Weeks 4-6: OOPs &amp; File Handling</div>
                  <div className="py-journey-step">Weeks 7-9: Data Science Libraries</div>
                  <div className="py-journey-step">Weeks 10-12: Web Dev &amp; Capstone</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default PythonCertificationCourse;
