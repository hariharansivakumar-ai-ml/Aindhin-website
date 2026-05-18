import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Imports for Course Images
import aiMlBasicsImg from '../assets/aiml.webp';
import digitalMarketingImg from '../assets/digital_marketing_hero.webp';
import cybersecurityImg from '../assets/cybersecurity.webp';
import abacusImg from '../assets/abacus_course.webp';

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

const MarqueeRow = ({ title, courses, seeMoreLink, speed = "40s" }) => {
    // Triple the array for a very long seamless marquee
    const marqueeItems = [...courses, ...courses, ...courses];
    
    return (
        <div className="mb-10 last:mb-0">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-4 flex items-center gap-3">
                <h2 className="text-[22px] font-bold text-[#1e293b] font-inter">{title}</h2>
                <Link to={seeMoreLink} className="flex items-center text-[14px] font-semibold text-primary hover:underline transition-all font-inter">
                    See more <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
            </div>

            <div className="w-full overflow-hidden">
                <div 
                    className="flex gap-4 px-6 lg:px-12 animate-marquee-linear"
                    style={{ 
                        width: 'max-content',
                        animation: `marqueeRow 60s linear infinite` 
                    }}
                >
                    {marqueeItems.map((course, idx) => (
                        <Link 
                            key={`${course.id}-${idx}`} 
                            to={course.link}
                            className="w-[260px] md:w-[320px] aspect-[16/9] shrink-0 relative rounded-2xl overflow-hidden group block shadow-sm"
                        >
                            <img 
                                src={course.image} 
                                alt={course.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            {/* Gradient Overlay matching screenshot */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                            {/* Title at the bottom left */}
                            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">
                                <h3 className="text-white font-bold text-[14px] md:text-[16px] font-inter leading-tight">
                                    {course.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HomeCourseSlider = () => {
    const certificationCourses = [
        { id: 1, title: "AI & Machine Learning – Basics to Industry", image: aiMlBasicsImg, link: "/ai-machine-learning-from-basics-to-industry-applications" },
        { id: 2, title: "Digital Marketing Strategy", image: digitalMarketingImg, link: "/digital-marketing-from-basics-to-growth-campaigns" },
        { id: 3, title: "Cybersecurity – Protecting the Digital Frontier", image: cybersecurityImg, link: "/cyber-security" },
        { id: 4, title: "Abacus & Mental Math Masterclass", image: abacusImg, link: "/abacus-mental-math-masterclass" }
    ];

    const corporateCourses = [
        { id: 5, title: "Data Analytics for Teams", image: dataAnalyticsImg, link: "/data-analytics" },
        { id: 6, title: "Cloud Computing Enterprise", image: cloudComputingImg, link: "/cloud-computing" },
        { id: 7, title: "Full Stack Development", image: fullStackImg, link: "/full-stack-development" },
        { id: 8, title: "Automation & Tools", image: automationImg, link: "/automation-and-productivity-tools" },
        { id: 9, title: "Cybersecurity Governance", image: cybersecurityImg, link: "/cyber-security" }
    ];

    const leadershipCourses = [
        { id: 10, title: "The People Manager", image: peopleManagerImg, link: "/the-people-manager" },
        { id: 11, title: "Strategic Decision Maker", image: strategicDecisionImg, link: "/strategic-decision-maker" },
        { id: 12, title: "AI for Business Leaders", image: aiBusinessImg, link: "/ai-for-business" },
        { id: 13, title: "Design Thinking", image: designThinkingImg, link: "/design-thinking" },
        { id: 14, title: "Innovation Strategy", image: innovationStrategyImg, link: "/innovation-strategy" },
        { id: 15, title: "Digital Transformation", image: digitalTransformationImg, link: "/digital-transformation" },
        { id: 16, title: "Future Skills", image: futureSkillsImg, link: "/future-skills-and-automation" }
    ];

    return (
        <section className="py-12 bg-white overflow-hidden">
            <style>
                {`
                @keyframes marqueeRow {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                `}
            </style>

            <MarqueeRow 
                title="Certification Related Topic" 
                courses={certificationCourses} 
                seeMoreLink="/our-courses" 
            />
            
            <MarqueeRow 
                title="Corporate training specials" 
                courses={corporateCourses} 
                seeMoreLink="/corporate-courses" 
            />
            
            <MarqueeRow 
                title="Leadership & Management" 
                courses={leadershipCourses} 
                seeMoreLink="/leadership-courses" 
            />
        </section>
    );
};

export default HomeCourseSlider;
