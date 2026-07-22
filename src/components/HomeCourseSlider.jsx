import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, BookOpen, Clock, Users } from 'lucide-react';

import aiMlBasicsImg from '../assets/aiml.webp';
import digitalMarketingImg from '../assets/digital_marketing_hero.webp';
import cybersecurityImg from '../assets/cybersecurity.webp';
import dataAnalyticsImg from '../assets/data_analytics.webp';
import cloudComputingImg from '../assets/cloud_computing.webp';
import fullStackImg from '../assets/full_stack.webp';
import automationImg from '../assets/automation.webp';
import peopleManagerImg from '../assets/people_manager_corp.webp';
import strategicDecisionImg from '../assets/strategic_decision_corp.webp';
import aiBusinessImg from '../assets/aibiz.webp';
import designThinkingImg from '../assets/design_thinking.webp';
import innovationStrategyImg from '../assets/innovation_strategy.webp';
import digitalTransformationImg from '../assets/digital_transformation.webp';
import futureSkillsImg from '../assets/future_skills.webp';

/* ─────────────────────────────────────────────────────────────────────────────
   ExpandedCard
   Rendered via portal at the EXACT position of the hovered card.
   The image section is the same size as the original card so it looks
   like the card itself is growing downward with extra details.
───────────────────────────────────────────────────────────────────────────── */
const ExpandedCard = ({ course, anchorRect, onMouseEnter, onMouseMove, onMouseLeave }) => {
    if (!course || !anchorRect) return null;

    const left   = anchorRect.left + window.scrollX;
    const top    = anchorRect.top + window.scrollY;
    const width  = anchorRect.width;
    const IMG_H  = anchorRect.height; // exactly the original card height
    const INFO_H = 165;

    return createPortal(
        <>
            <style>{`
                @keyframes cardZoomIn {
                    from {
                        transform: scale(1);
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    to {
                        transform: scale(1.15);
                        box-shadow: 0 24px 64px rgba(0,0,0,0.4);
                    }
                }
                .expanded-card-container {
                    animation: cardZoomIn 0.25s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    transform-origin: center center;
                }
                @keyframes cardExpand {
                    from { clip-path: inset(0 0 100% 0); opacity: 0.6; }
                    to   { clip-path: inset(0 0 0% 0);   opacity: 1; }
                }
                .expanded-info {
                    animation: cardExpand 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
            `}</style>

            <div
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    position: 'absolute',
                    top,
                    left,
                    width,
                    zIndex: 9990,
                    pointerEvents: 'auto',
                }}
                className="expanded-card-container rounded-2xl overflow-hidden"
            >
                {/* Image — identical size to original card, so it looks seamless */}
                <div className="relative w-full" style={{ height: IMG_H }}>
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-black/10 to-transparent" />

                    {/* Tag chips */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        {course.tags && course.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title at bottom — same as original card */}
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">
                        <h3 className="text-white font-bold text-[14px] md:text-[16px] font-inter leading-tight">
                            {course.title}
                        </h3>
                    </div>
                </div>

                {/* Details panel — slides in below the image */}
                <div
                    className="expanded-info bg-[#0f172a] px-4 pt-3 pb-4"
                    style={{ height: INFO_H }}
                >
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{course.duration}
                        </span>
                        <span className="text-gray-600">&#183;</span>
                        <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />{course.students}+ enrolled
                        </span>
                        <span className="text-gray-600">&#183;</span>
                        <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />{course.level}
                        </span>
                    </div>

                    <p className="text-gray-400 text-[12px] leading-relaxed mb-3 line-clamp-3">
                        {course.description}
                    </p>

                    <a
                        href="https://user.aindhin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-blue-700 text-white text-[13px] font-bold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                        style={{ textDecoration: 'none' }}
                    >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Enroll Now
                    </a>
                </div>
            </div>
        </>,
        document.body
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   CourseCard — turns invisible when hovered so the portal card takes its place
───────────────────────────────────────────────────────────────────────────── */
const CourseCard = ({ course, rowId, instanceId, onHover, onLeave, isActive }) => {
    const cardRef = useRef(null);

    const handleMouseEnter = () => {
        if (cardRef.current) onHover(course, cardRef.current.getBoundingClientRect(), rowId, instanceId);
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onLeave}
            className="w-[260px] md:w-[320px] aspect-[16/9] shrink-0 relative rounded-2xl overflow-hidden shadow-sm cursor-pointer"
            style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.12s' }}
        >
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">
                <h3 className="text-white font-bold text-[14px] md:text-[16px] font-inter leading-tight">
                    {course.title}
                </h3>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MarqueeRow — pauses its animation while one of its cards is hovered
───────────────────────────────────────────────────────────────────────────── */
const MarqueeRow = ({ title, courses, seeMoreLink, rowId, onCardHover, onCardLeave, isPaused, activeInstanceId }) => {
    const marqueeItems = [...courses, ...courses, ...courses];

    return (
        <div className="mb-10 last:mb-0">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-4 flex items-center gap-3">
                <h2 className="text-[22px] font-bold text-[#1e293b] font-inter">{title}</h2>
                <Link
                    to={seeMoreLink}
                    className="flex items-center text-[14px] font-semibold text-primary hover:underline transition-all font-inter"
                >
                    See more <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
            </div>

            <div className="w-full overflow-hidden">
                <div
                    className="flex gap-4 px-6 lg:px-12"
                    style={{
                        width: 'max-content',
                        animation: 'marqueeRow 60s linear infinite',
                        animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                >
                    {marqueeItems.map((course, idx) => {
                        const instanceId = `${rowId}-${course.id}-${idx}`;
                        return (
                            <CourseCard
                                key={instanceId}
                                instanceId={instanceId}
                                course={course}
                                rowId={rowId}
                                onHover={onCardHover}
                                onLeave={onCardLeave}
                                isActive={activeInstanceId === instanceId}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   HomeCourseSlider
───────────────────────────────────────────────────────────────────────────── */
const HomeCourseSlider = () => {
    const [hoveredCourse, setHoveredCourse] = useState(null);
    const [anchorRect,    setAnchorRect]    = useState(null);
    const [pausedRowId,   setPausedRowId]   = useState(null);
    const [activeInstanceId, setActiveInstanceId] = useState(null);
    const leaveTimer = useRef(null);
    const isOverCard = useRef(false);

    const checkLeave = useCallback(() => {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = setTimeout(() => {
            if (!isOverCard.current) {
                setHoveredCourse(null);
                setAnchorRect(null);
                setPausedRowId(null);
                setActiveInstanceId(null);
            }
        }, 150);
    }, []);

    const handleCardHover = useCallback((course, rect, rowId, instanceId) => {
        isOverCard.current = true;
        clearTimeout(leaveTimer.current);
        setHoveredCourse(course);
        setAnchorRect(rect);
        setPausedRowId(rowId);
        setActiveInstanceId(instanceId);
    }, []);

    const handleLeave = useCallback(() => {
        isOverCard.current = false;
        checkLeave();
    }, [checkLeave]);

    useEffect(() => () => clearTimeout(leaveTimer.current), []);

    const certificationCourses = [
        { id: 1, title: 'AI and Machine Learning - Basics to Industry', image: aiMlBasicsImg, link: '/ai-machine-learning-from-basics-to-industry-applications', description: 'Master Machine Learning, Deep Learning, Python, and Model Deployment with real-world industry projects.', duration: '12 Weeks', students: 320, level: 'Beginner', tags: ['AI', 'Python', 'ML'] },
        { id: 2, title: 'Digital Marketing Strategy', image: digitalMarketingImg, link: '/digital-marketing-from-basics-to-growth-campaigns', description: 'Learn SEO, SEM, social media advertising, email marketing, and data-driven growth strategies.', duration: '10 Weeks', students: 180, level: 'Beginner', tags: ['SEO', 'SEM', 'Analytics'] },
        { id: 3, title: 'Cybersecurity - Protecting the Digital Frontier', image: cybersecurityImg, link: '/cyber-security', description: 'Ethical hacking, network security, cryptography, and threat intelligence for modern enterprises.', duration: '14 Weeks', students: 280, level: 'Beginner', tags: ['Security', 'Hacking', 'Networks'] },
    ];

    const corporateCourses = [
        { id: 5, title: 'Data Analytics for Teams', image: dataAnalyticsImg, link: '/data-analytics', description: 'Excel, data cleaning, charts, business intelligence dashboards and decision-making with data.', duration: '12 Weeks', students: 240, level: 'Beginner', tags: ['Excel', 'Power BI', 'Data'] },
        { id: 6, title: 'Cloud Computing Enterprise', image: cloudComputingImg, link: '/cloud-computing', description: 'AWS, Azure, GCP - cloud architecture, DevOps, containers, and enterprise cloud strategy.', duration: '10 Weeks', students: 200, level: 'Intermediate', tags: ['AWS', 'Azure', 'DevOps'] },
        { id: 7, title: 'Full Stack Development', image: fullStackImg, link: '/full-stack-development', description: 'React, Node.js, databases, REST APIs, and deployment - build complete web applications.', duration: '16 Weeks', students: 350, level: 'Beginner', tags: ['React', 'Node.js', 'SQL'] },
        { id: 8, title: 'Automation and Tools', image: automationImg, link: '/automation-and-productivity-tools', description: 'Python scripting, RPA, and productivity automation to streamline business workflows.', duration: '8 Weeks', students: 150, level: 'Beginner', tags: ['Python', 'RPA', 'Automation'] },
        { id: 9, title: 'Cybersecurity Governance', image: cybersecurityImg, link: '/cyber-security', description: 'Risk management, compliance, security policies, and incident response for organisations.', duration: '12 Weeks', students: 190, level: 'Intermediate', tags: ['Risk', 'Compliance', 'CISO'] },
    ];

    const leadershipCourses = [
        { id: 10, title: 'The People Manager', image: peopleManagerImg, link: '/the-people-manager', description: 'Build high-performing teams, master feedback, and lead with empathy and accountability.', duration: '6 Weeks', students: 130, level: 'Intermediate', tags: ['Leadership', 'HR', 'Teams'] },
        { id: 11, title: 'Strategic Decision Maker', image: strategicDecisionImg, link: '/strategic-decision-maker', description: 'Frameworks for complex decision-making, risk analysis, and strategic planning under pressure.', duration: '6 Weeks', students: 110, level: 'Advanced', tags: ['Strategy', 'Analysis', 'MBA'] },
        { id: 12, title: 'AI for Business Leaders', image: aiBusinessImg, link: '/ai-for-business', description: 'Leverage AI tools and data insights to drive business growth and competitive advantage.', duration: '5 Weeks', students: 160, level: 'Intermediate', tags: ['AI', 'Business', 'Growth'] },
        { id: 13, title: 'Design Thinking', image: designThinkingImg, link: '/design-thinking', description: 'Human-centred innovation: empathise, define, ideate, prototype, and test real solutions.', duration: '5 Weeks', students: 120, level: 'Beginner', tags: ['Innovation', 'UX', 'Agile'] },
        { id: 14, title: 'Innovation Strategy', image: innovationStrategyImg, link: '/innovation-strategy', description: 'Build innovation culture, manage pipelines, and lead transformative business change.', duration: '6 Weeks', students: 100, level: 'Advanced', tags: ['Innovation', 'Change'] },
        { id: 15, title: 'Digital Transformation', image: digitalTransformationImg, link: '/digital-transformation', description: 'Guide organisations through digital change with technology, culture, and process alignment.', duration: '7 Weeks', students: 140, level: 'Intermediate', tags: ['Digital', 'Change', 'Tech'] },
        { id: 16, title: 'Future Skills', image: futureSkillsImg, link: '/future-skills-and-automation', description: 'Prepare for the future of work with AI literacy, adaptability, and digital fluency.', duration: '4 Weeks', students: 220, level: 'Beginner', tags: ['Future', 'AI', 'Upskill'] },
    ];

    const allCourses = [...certificationCourses, ...corporateCourses, ...leadershipCourses];

    return (
        <section className="py-12 bg-white overflow-hidden">
            <style>{`
                @keyframes marqueeRow {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
            `}</style>

            <MarqueeRow
                rowId="cert"
                title="Certification Related Topic"
                courses={certificationCourses}
                seeMoreLink="/our-courses"
                onCardHover={handleCardHover}
                onCardLeave={handleLeave}
                isPaused={pausedRowId === 'cert'}
                activeInstanceId={activeInstanceId}
            />
            <MarqueeRow
                rowId="corp"
                title="Corporate training specials"
                courses={corporateCourses}
                seeMoreLink="/corporate-courses"
                onCardHover={handleCardHover}
                onCardLeave={handleLeave}
                isPaused={pausedRowId === 'corp'}
                activeInstanceId={activeInstanceId}
            />
            <MarqueeRow
                rowId="lead"
                title="Leadership and Management"
                courses={leadershipCourses}
                seeMoreLink="/leadership-courses"
                onCardHover={handleCardHover}
                onCardLeave={handleLeave}
                isPaused={pausedRowId === 'lead'}
                activeInstanceId={activeInstanceId}
            />

            {/* Portal card — sits at exact position of hovered card and extends downward */}
            <ExpandedCard
                course={hoveredCourse}
                anchorRect={anchorRect}
                onMouseEnter={() => {
                    isOverCard.current = true;
                    clearTimeout(leaveTimer.current);
                }}
                onMouseMove={() => {
                    isOverCard.current = true;
                    clearTimeout(leaveTimer.current);
                }}
                onMouseLeave={handleLeave}
            />
        </section>
    );
};

export default HomeCourseSlider;
