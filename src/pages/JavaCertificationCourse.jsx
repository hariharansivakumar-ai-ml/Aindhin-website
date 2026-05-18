import { useEffect, useRef, useState } from 'react';
import {
  Clock, TrendingUp, CheckCircle, Calendar, Award,
  Layout, Zap, Briefcase, Globe, Target, Rocket
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Hero Image
import heroImg from '../assets/java_hero.webp';

// Tool Logos
import javaLogo from '../assets/java.svg';
import intellijLogo from '../assets/intellij.svg';
import springLogo from '../assets/spring.svg';
import mavenLogo from '../assets/maven.svg';
import junitLogo from '../assets/junit.webp';
import gitLogo from '../assets/git.svg'; // Reuse git logo

// Company Logos
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

const JavaCertificationCourse = () => {
  useEffect(() => {
    document.title = "Java Certification Course: Master Object-Oriented Programming | Aindhin";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
    }
  }, []);

  const [openModuleIndex, setOpenModuleIndex] = useState(0); // Open the first module by default

  const handleToggle = (index, e) => {
    e.preventDefault(); // Prevent default details tag behavior
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <div className="jv-course font-sans text-slate-900 bg-blue-50 w-full overflow-x-hidden">
      <style>{`
            /* ===== JAVA CERTIFICATION COURSE PAGE (scoped) ===== */
            .jv-course{
              font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
              color:#0f172a;
              background:#e0f2fe;
              width:100%;
            }
            .jv-course *{box-sizing:border-box;}
            
            /* HERO */
            .jv-hero{
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
            .jv-hero-content{
              max-width:900px;
              text-align:left;
            }
            .jv-badge{
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
            .jv-hero-meta{
              display:flex;
              flex-wrap:wrap;
              gap:10px 18px;
              font-size:13px;
              color:#e5e7eb;
            }
            .jv-hero-meta span::before{
              content:"• ";
              color:#fde68a;
              font-weight:700;
            }
            
            /* MAIN LAYOUT */
            .jv-main{padding:40px 20px 50px;}
            .jv-main-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,2fr) minmax(0,1.1fr);
              gap:24px;
            }
            .jv-left,.jv-right{
              display:flex;
              flex-direction:column;
              gap:16px;
            }
            
            /* CARDS */
            .jv-card{
              background:#ffffff;
              border-radius:18px;
              padding:20px 22px;
              box-shadow:0 10px 25px rgba(15,23,42,.08);
            }
            .jv-card h2{
              font-size:18px;
              margin:0 0 10px;
              color:#1d4ed8;
            }
            .jv-about-text{
              font-size:14px;
              color:#4b5563;
              line-height:1.6;
            }
            
            /* SYLLABUS */
            .jv-module{
              border:1px solid #e5e7eb;
              border-radius:12px;
              background:#f9fafb;
              margin-top:8px;
              overflow:hidden;
            }
            .jv-module summary{
              list-style:none;
              padding:10px 14px;
              cursor:pointer;
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:14px;
              font-weight:600;
            }
            .jv-module summary::-webkit-details-marker{display:none;}
            .jv-module summary::after{
              content:"▾";
              font-size:12px;
              color:#9ca3af;
              transition:transform .2s;
            }
            .jv-module[open] summary::after{transform:rotate(-180deg);}
            .jv-module-title{
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              align-items:baseline;
            }
            .jv-module-label{
              font-size:11px;
              text-transform:uppercase;
              letter-spacing:.08em;
              color:#111827;   /* dark text */
              font-weight:700; /* bold */
            }
            .jv-module-content{
              padding:0 14px 10px 24px;
              font-size:13px;
              color:#4b5563;
            }
            .jv-module-content ul{
              margin:0;
              padding-left:16px;
            }
            .jv-module-content li{margin-bottom:4px;}
            
            /* RIGHT-COLUMN DETAILS */
            .jv-detail-list{
              list-style:none;
              padding:0;
              margin:0 0 16px;
              font-size:14px;
            }
            .jv-detail-item{
              display:flex;
              gap:10px;
              margin-bottom:10px;
            }
            .jv-detail-icon{
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
            .jv-detail-text strong{
              display:block;
              font-weight:600;
              color:#111827;
            }
            .jv-detail-text span{
              font-size:13px;
              color:#4b5563;
            }
            
            /* CTA BUTTON */
            .jv-cta-btn{
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
            .jv-cta-btn:hover{
              transform:translateY(-1px);
              filter:brightness(1.04);
              box-shadow:0 18px 40px rgba(37,99,235,.6);
              color:#fff !important;
            }
            
            /* TOP COMPANIES */
            .jv-companies{
              background:#e0f2fe;
              padding:40px 20px 40px;
            }
            .jv-companies-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .jv-companies h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .jv-companies p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .jv-logo-row{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:18px;
            }
            .jv-logo-card{
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
            .jv-logo-card img{
              max-height:40px;
              max-width:100%;
            }
            .jv-logo-card:hover{
              transform:translateY(-3px);
              box-shadow:0 14px 30px rgba(15,23,42,.16);
            }
            
            /* EXTRA COURSE DETAILS SECTION */
            .jv-highlights{
              background:#e0f2fe;
              padding:10px 20px 50px;
            }
            .jv-highlights-inner{
              max-width:1160px;
              margin:0 auto;
              display:grid;
              grid-template-columns:minmax(0,1.7fr) minmax(0,1.1fr);
              gap:28px;
              align-items:center;
            }
            .jv-highlights-heading{
              margin-bottom:12px;
            }
            .jv-highlights-heading h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .jv-highlights-heading p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .jv-highlight-grid{
              margin-top:18px;
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:14px;
            }
            .jv-highlight-card{
              background:#ffffff;
              border-radius:16px;
              padding:14px 12px;
              box-shadow:0 10px 24px rgba(15,23,42,.08);
            }
            .jv-highlight-icon{
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
            .jv-highlight-card h3{
              font-size:14px;
              margin:0 0 4px;
              color:#0f172a;
            }
            .jv-highlight-card p{
              font-size:13px;
              margin:0;
              color:#4b5563;
            }
            
            /* representation "image" block */
            .jv-highlights-visual{
              display:flex;
              justify-content:center;
            }
            .jv-dashboard{
              width:100%;
              max-width:340px;
              background:#ffffff;
              border-radius:20px;
              padding:14px 14px 18px;
              box-shadow:0 18px 40px rgba(37,99,235,.35);
            }
            .jv-dashboard-header{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:10px;
              font-size:12px;
              color:#0f172a;
            }
            .jv-dashboard-dots{
              display:flex;
              gap:4px;
            }
            .jv-dashboard-dots span{
              width:7px;
              height:7px;
              border-radius:999px;
              background:#bfdbfe;
            }
            .jv-dashboard-graph{
              display:flex;
              gap:6px;
              align-items:flex-end;
              height:90px;
              margin-bottom:12px;
            }
            .jv-dashboard-bar{
              flex:1;
              border-radius:8px 8px 2px 2px;
              background:linear-gradient(180deg,#38bdf8,#1d4ed8);
            }
            .jv-dashboard-bar:nth-child(2){height:65%;}
            .jv-dashboard-bar:nth-child(3){height:85%;}
            .jv-dashboard-bar:nth-child(4){height:45%;}
            .jv-dashboard-bar:nth-child(5){height:75%;}
            .jv-dashboard-bar:nth-child(1){height:35%;}
            .jv-dashboard-tags{
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
            }
            .jv-dashboard-tags span{
              padding:3px 7px;
              border-radius:999px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            
            /* TOOLS SECTION */
            .jv-tools{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .jv-tools-inner{
              max-width:1160px;
              margin:0 auto;
              text-align:center;
            }
            .jv-tools-inner h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .jv-tools-inner p{
              margin:0 0 20px;
              font-size:14px;
              color:#4b5563;
            }
            .jv-tools-grid{
              display:flex;
              flex-wrap:wrap;
              justify-content:center;
              gap:16px;
            }
            .jv-tools-card{
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
            .jv-tools-logo{
              max-height:36px;
              max-width:90px;
              margin-bottom:4px;
            }
            .jv-tools-card span{
              font-size:12px;
              color:#111827;
            }
            
            /* MORE DETAILS SECTION */
            .jv-more{
              background:#e0f2fe;
              padding:0 20px 50px;
            }
            .jv-more-inner{
              max-width:1160px;
              margin:0 auto;
            }
            .jv-more-header{
              text-align:center;
              margin-bottom:20px;
            }
            .jv-more-header h2{
              font-size:20px;
              margin:0 0 6px;
              color:#0f172a;
            }
            .jv-more-header p{
              margin:0;
              font-size:14px;
              color:#4b5563;
            }
            .jv-more-grid{
              display:grid;
              grid-template-columns:repeat(3,minmax(0,1fr));
              gap:18px;
            }
            .jv-more-card{
              background:#ffffff;
              border-radius:18px;
              padding:16px 14px;
              box-shadow:0 12px 30px rgba(15,23,42,.12);
              display:flex;
              flex-direction:column;
              gap:8px;
            }
            .jv-more-top{
              display:flex;
              align-items:flex-start;
              gap:8px;
            }
            .jv-more-icon{
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
            .jv-more-title{
              font-size:15px;
              font-weight:600;
              margin:0;
              color:#0f172a;
            }
            .jv-more-text{
              font-size:13px;
              color:#4b5563;
              margin:0;
            }
            .jv-tool-logos{
              margin-top:12px;
              display:flex;
              flex-wrap:wrap;
              gap:10px;
              align-items:center;
              justify-content:center;
              width:100%;
            }
            .jv-tool-logo{
              max-height:32px;
              width:auto;
              filter:drop-shadow(0 2px 4px rgba(15,23,42,.18));
            }
            .jv-tool-logos img{
              max-height:32px !important;
              width:auto !important;
              object-fit:contain;
            }
            .jv-roles-image{
              margin-top:8px;
              display:flex;
              flex-wrap:wrap;
              gap:6px;
            }
            .jv-role-tag{
              padding:4px 8px;
              border-radius:999px;
              font-size:11px;
              background:#eff6ff;
              color:#1d4ed8;
            }
            .jv-journey{
              margin-top:8px;
              border-left:2px solid #bfdbfe;
              padding-left:10px;
            }
            .jv-journey-step{
              position:relative;
              padding-left:10px;
              margin-bottom:6px;
              font-size:12px;
              color:#4b5563;
            }
            .jv-journey-step::before{
              content:"";
              position:absolute;
              left:-11px;
              top:5px;
              width:8px;
              height:8px;
              border-radius:999px;
              background:#38bdf8;
            }
            
            /* FADE-IN ON SCROLL */
            .jv-section{
              opacity:0;
              transform:translateY(24px);
              transition:opacity .7s ease-out, transform .7s ease-out;
            }
            .jv-section.jv-visible{
              opacity:1;
              transform:translateY(0);
            }
            
            /* RESPONSIVE */
            @media (max-width:900px){
              .jv-hero{padding:50px 18px;}
              .fs-hero-title{font-size:48px;}
              .jv-main-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .jv-highlights-inner{
                grid-template-columns:minmax(0,1fr);
              }
              .jv-more-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            @media (max-width:640px){
              .jv-hero{padding:38px 16px;}
              .jv-hero-meta{flex-direction:column;}
              .jv-highlight-grid{
                grid-template-columns:minmax(0,1fr);
              }
            }
            `}</style>

      <div className="jv-course" id="top">

        {/* HERO */}
        <Section className="jv-hero jv-section">
          <div className="jv-hero-content">
            <span className="jv-badge">Java Certification</span>
            <h1 className="fs-hero-title">
              Master Java Programming: Get Certified and Build Enterprise-Grade Applications
            </h1>
            <p className="fs-hero-sub">
              Master Core Java, Object-Oriented Programming, and advanced concepts including Collections,
              Multithreading, and Database connectivity to build robust enterprise applications.
            </p>
            <div className="jv-hero-meta">
              <span>Covers Core Java, OOPs, Collections &amp; JDBC</span>
              <span>Hands-on with Spring Framework &amp; Maven</span>
              <span>Industry-aligned curriculum &amp; Interview prep</span>
            </div>
          </div>
        </Section>

        {/* MAIN CONTENT */}
        <main className="jv-main jv-section">
          <div className="jv-main-inner">

            {/* Left side */}
            <div className="jv-left">

              {/* About */}
              <Section className="jv-card">
                <h2>About This Course</h2>
                <div className="jv-about-text">
                  <p>
                    This course provides a comprehensive deep dive into Java programming. Starting from
                    the absolute basics, you will progress to advanced topics like Exception Handling,
                    File I/O, and the Collections Framework.
                  </p>
                  <p>
                    You will also learn how to build scalable applications using modern tools like
                    Maven and Spring, and gain proficiency in database connectivity with JDBC.
                    Designed for both beginners and those looking to upskill for backend roles.
                  </p>
                </div>
              </Section>

              {/* Syllabus */}
              <Section className="jv-card">
                <h2>Syllabus Covered</h2>

                <details className="jv-module" open={openModuleIndex === 0}>
                  <summary onClick={(e) => handleToggle(0, e)}>
                    <div className="jv-module-title">
                      <span className="jv-module-label">Module 1</span>
                      <span>Java Basics &amp; Core Syntax</span>
                    </div>
                  </summary>
                  <div className="jv-module-content">
                    <ul>
                      <li>JDK Setup, IDEs &amp; Environment Variables</li>
                      <li>Data Types, Operators &amp; Control Flow</li>
                      <li>Arrays, Strings &amp; Memory Management</li>
                      <li>Methods, Scope &amp; Recursion</li>
                      <li>Debugging &amp; Code Optimization</li>
                    </ul>
                  </div>
                </details>

                <details className="jv-module" open={openModuleIndex === 1}>
                  <summary onClick={(e) => handleToggle(1, e)}>
                    <div className="jv-module-title">
                      <span className="jv-module-label">Module 2</span>
                      <span>Object-Oriented Programming</span>
                    </div>
                  </summary>
                  <div className="jv-module-content">
                    <ul>
                      <li>Classes, Objects &amp; Constructors</li>
                      <li>Inheritance, Polymorphism &amp; Encapsulation</li>
                      <li>Abstract Classes &amp; Interfaces</li>
                      <li>Exception Handling &amp; Custom Exceptions</li>
                      <li>Packages &amp; Access Modifiers</li>
                    </ul>
                  </div>
                </details>

                <details className="jv-module" open={openModuleIndex === 2}>
                  <summary onClick={(e) => handleToggle(2, e)}>
                    <div className="jv-module-title">
                      <span className="jv-module-label">Module 3</span>
                      <span>Collections &amp; Advanced Concepts</span>
                    </div>
                  </summary>
                  <div className="jv-module-content">
                    <ul>
                      <li>Java Collections Framework (List, Set, Map)</li>
                      <li>Generics &amp; Lambda Expressions (Java 8)</li>
                      <li>Streams API &amp; Functional Programming</li>
                      <li>File Handling &amp; Multithreading</li>
                      <li>JDBC: Connecting to Databases</li>
                    </ul>
                  </div>
                </details>

                <details className="jv-module" open={openModuleIndex === 3}>
                  <summary onClick={(e) => handleToggle(3, e)}>
                    <div className="jv-module-title">
                      <span className="jv-module-label">Module 4</span>
                      <span>Frameworks &amp; Enterprise Development</span>
                    </div>
                  </summary>
                  <div className="jv-module-content">
                    <ul>
                      <li>Introduction to Maven &amp; Dependency Management</li>
                      <li>Unit Testing with JUnit</li>
                      <li>Introduction to Spring Framework &amp; DI</li>
                      <li>Building RESTful APIs (Spring Boot Basics)</li>
                      <li>Capstone: Application Development</li>
                    </ul>
                  </div>
                </details>
              </Section>
            </div>

            {/* Right side */}
            <aside className="jv-right">
              <Section className="jv-card">
                <h2>Course Details</h2>
                <ul className="jv-detail-list">
                  <li className="jv-detail-item">
                    <div className="jv-detail-icon"><Clock size={20} /></div>
                    <div className="jv-detail-text">
                      <strong>Duration</strong>
                      <span>14 Weeks (90+ hours)</span>
                    </div>
                  </li>
                  <li className="jv-detail-item">
                    <div className="jv-detail-icon"><TrendingUp size={20} /></div>
                    <div className="jv-detail-text">
                      <strong>Skill Level</strong>
                      <span>Beginner to Intermediate</span>
                    </div>
                  </li>
                  <li className="jv-detail-item">
                    <div className="jv-detail-icon"><CheckCircle size={20} /></div>
                    <div className="jv-detail-text">
                      <strong>Includes</strong>
                      <span>Live Classes, Projects &amp; Placement Support</span>
                    </div>
                  </li>
                  <li className="jv-detail-item">
                    <div className="jv-detail-icon"><Calendar size={20} /></div>
                    <div className="jv-detail-text">
                      <strong>Next Batch</strong>
                      <span>Coming Soon</span>
                    </div>
                  </li>
                  <li className="jv-detail-item">
                    <div className="jv-detail-icon"><Award size={20} /></div>
                    <div className="jv-detail-text">
                      <strong>Certificate</strong>
                      <span>Java Certification &amp; Job Prep</span>
                    </div>
                  </li>
                </ul>

                <a href="#top" className="jv-cta-btn">Enroll Now &amp; Start Learning</a>
              </Section>
            </aside>

          </div>
        </main>

        {/* TOP COMPANIES */}
        <Section className="jv-companies jv-section">
          <div className="jv-companies-inner">
            <h2>Top Companies Hiring Java Developers</h2>
            <p>Java remains the backbone of enterprise software, used by leading tech giants globally.</p>
            <div className="jv-logo-row">
              <div className="jv-logo-card">
                <img src={googleLogo} alt="Google" />
              </div>
              <div className="jv-logo-card">
                <img src={microsoftLogo} alt="Microsoft" />
              </div>
              <div className="jv-logo-card">
                <img src={awsLogo} alt="AWS" />
              </div>
              <div className="jv-logo-card">
                <img src={ibmLogo} alt="IBM" />
              </div>
              <div className="jv-logo-card">
                <img src={metaLogo} alt="Meta" />
              </div>
              <div className="jv-logo-card">
                <img src={netflixLogo} alt="Netflix" />
              </div>
              <div className="jv-logo-card">
                <img src={infosysLogo} alt="Infosys" />
              </div>
              <div className="jv-logo-card">
                <img src={accentureLogo} alt="Accenture" />
              </div>
            </div>
          </div>
        </Section>

        {/* EXTRA COURSE DETAILS WITH ICONS / REPRESENTATION */}
        <Section className="jv-highlights jv-section">
          <div className="jv-highlights-inner">
            <div>
              <div className="jv-highlights-heading">
                <h2>Why Learn Java with Us?</h2>
                <p>Gain specialized skills that make you an invaluable asset in the software industry.</p>
              </div>

              <div className="jv-highlight-grid">
                <div className="jv-highlight-card">
                  <div className="jv-highlight-icon"><Layout size={24} /></div>
                  <h3>Strong Foundations</h3>
                  <p>Build a robust understanding of OOP principles that apply across all major languages.</p>
                </div>
                <div className="jv-highlight-card">
                  <div className="jv-highlight-icon"><Zap size={24} /></div>
                  <h3>Performance Tuning</h3>
                  <p>Learn to write efficient, high-performance code and manage memory effectively.</p>
                </div>
                <div className="jv-highlight-card">
                  <div className="jv-highlight-icon"><Briefcase size={24} /></div>
                  <h3>Enterprise Ready</h3>
                  <p>Master the tools and frameworks (Spring, Hibernate) used in large-scale systems.</p>
                </div>
                <div className="jv-highlight-card">
                  <div className="jv-highlight-icon"><CheckCircle size={24} /></div>
                  <h3>Testing &amp; QA</h3>
                  <p>Write reliable code with JUnit testing and learn enterprise debugging techniques.</p>
                </div>
                <div className="jv-highlight-card">
                  <div className="jv-highlight-icon"><Award size={24} /></div>
                  <h3>Certification</h3>
                  <p>Prepare for Oracle Java Certification exams with targeted practice modules.</p>
                </div>
                <div className="jv-highlight-card">
                  <div className="jv-highlight-icon"><TrendingUp size={24} /></div>
                  <h3>Career Growth</h3>
                  <p>Open doors to high-paying backend and full-stack development roles.</p>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="jv-highlights-visual">
              <div className="jv-dashboard">
                <div className="jv-dashboard-header">
                  <span>Java Application Metrics</span>
                  <div className="jv-dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="jv-dashboard-graph">
                  <div className="jv-dashboard-bar"></div>
                  <div className="jv-dashboard-bar"></div>
                  <div className="jv-dashboard-bar"></div>
                  <div className="jv-dashboard-bar"></div>
                  <div className="jv-dashboard-bar"></div>
                </div>
                <div className="jv-dashboard-tags">
                  <span>Throughput</span>
                  <span>Latency</span>
                  <span>Heap</span>
                  <span>Threads</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TOOLS SECTION */}
        <Section className="jv-tools jv-section">
          <div className="jv-tools-inner">
            <h2>Tools &amp; Frameworks You Will Master</h2>
            <p>Get hands-on experience with the industry-standard Java ecosystem.</p>

            <div className="jv-tools-grid">
              <div className="jv-tools-card">
                <img className="jv-tools-logo" src={javaLogo} alt="Java" />
                <span>Java SE/EE</span>
              </div>
              <div className="jv-tools-card">
                <img className="jv-tools-logo" src={intellijLogo} alt="IntelliJ" />
                <span>IntelliJ IDEA</span>
              </div>
              <div className="jv-tools-card">
                <img className="jv-tools-logo" src={springLogo} alt="Spring" />
                <span>Spring Boot</span>
              </div>
              <div className="jv-tools-card">
                <img className="jv-tools-logo" src={mavenLogo} alt="Maven" />
                <span>Maven</span>
              </div>
              <div className="jv-tools-card">
                <img className="jv-tools-logo" src={junitLogo} alt="JUnit" />
                <span>JUnit</span>
              </div>
              <div className="jv-tools-card">
                <img className="jv-tools-logo" src={gitLogo} alt="Git" />
                <span>Git &amp; GitHub</span>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE DETAILS SECTION */}
        <Section className="jv-more jv-section">
          <div className="jv-more-inner">
            <div className="jv-more-header">
              <h2>Career Paths &amp; Roadmap</h2>
              <p>See how this course shapes your journey into professional software development.</p>
            </div>

            <div className="jv-more-grid">
              {/* Card 1: Ecosystem */}
              <div className="jv-more-card">
                <div className="jv-more-top">
                  <div className="jv-more-icon"><Globe size={24} /></div>
                  <div>
                    <h3 className="jv-more-title">Java Ecosystem</h3>
                    <p className="jv-more-text">
                      From mobile apps (Android) to massive server-side applications, Java is everywhere.
                    </p>
                  </div>
                </div>
                <div className="jv-tool-logos">
                  <img className="jv-tool-logo" src={javaLogo} alt="Java" />
                  <img className="jv-tool-logo" src={springLogo} alt="Spring" />
                </div>
              </div>

              {/* Card 2: Roles */}
              <div className="jv-more-card">
                <div className="jv-more-top">
                  <div className="jv-more-icon"><Target size={24} /></div>
                  <div>
                    <h3 className="jv-more-title">Roles You Can Target</h3>
                    <p className="jv-more-text">
                      Ideal for entry-level and mid-level positions in software engineering.
                    </p>
                  </div>
                </div>
                <div className="jv-roles-image">
                  <span className="jv-role-tag">Java Developer</span>
                  <span className="jv-role-tag">Backend Engineer</span>
                  <span className="jv-role-tag">Software Engineer</span>
                  <span className="jv-role-tag">Android Developer</span>
                </div>
              </div>

              {/* Card 3: Journey */}
              <div className="jv-more-card">
                <div className="jv-more-top">
                  <div className="jv-more-icon"><Rocket size={24} /></div>
                  <div>
                    <h3 className="jv-more-title">Your Learning Path</h3>
                    <p className="jv-more-text">
                      A structured journey from understanding syntax to building complex systems.
                    </p>
                  </div>
                </div>
                <div className="jv-journey">
                  <div className="jv-journey-step">Weeks 1-4: Core Elements &amp; OPPs</div>
                  <div className="jv-journey-step">Weeks 5-8: Advanced Java &amp; Collections</div>
                  <div className="jv-journey-step">Weeks 9-11: Database, Maven, &amp; Testing</div>
                  <div className="jv-journey-step">Weeks 12-14: Spring Boot &amp; Capstone</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default JavaCertificationCourse;
