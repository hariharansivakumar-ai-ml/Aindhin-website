import { useEffect } from 'react';
import './CyberSecurityCourse.css';

// Import Reusable Sections
import CourseHero from '../components/CourseSections/CourseHero';
import CourseMain from '../components/CourseSections/CourseMain';
import CourseAbout from '../components/CourseSections/CourseAbout';
import CourseSyllabus from '../components/CourseSections/CourseSyllabus';
import CourseDetailsSidebar from '../components/CourseSections/CourseDetailsSidebar';
import CourseCompanies from '../components/CourseSections/CourseCompanies';
import CourseHighlights from '../components/CourseSections/CourseHighlights';
import CourseTools from '../components/CourseSections/CourseTools';
import CourseCareers from '../components/CourseSections/CourseCareers';

// Import Data
import { cyberSecurityData } from '../data/courses/cyberSecurityData';

const CyberSecurityCourse = () => {

    useEffect(() => {
        document.title = "Cyber Security & Ethical Hacking Course | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Learn how attacks happen and how to defend against them, with practice in safe lab setups. Online course.");
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

    return (
        <div className="fs-course" id="top">
            <CourseHero {...cyberSecurityData.hero} />

            <CourseMain>
                <div className="fs-left">
                    <CourseAbout paragraphs={cyberSecurityData.about} />
                    <CourseSyllabus 
                        title={cyberSecurityData.syllabus.title} 
                        modules={cyberSecurityData.syllabus.modules} 
                    />
                </div>
                <CourseDetailsSidebar 
                    details={cyberSecurityData.details} 
                    enrollLink={cyberSecurityData.hero.enrollLink} 
                />
            </CourseMain>

            <CourseCompanies 
                title={cyberSecurityData.companies.title} 
                subtitle={cyberSecurityData.companies.subtitle} 
                logos={cyberSecurityData.companies.logos} 
            />

            <CourseHighlights 
                title={cyberSecurityData.highlights.title} 
                subtitle={cyberSecurityData.highlights.subtitle} 
                cards={cyberSecurityData.highlights.cards} 
                dashboard={cyberSecurityData.highlights.dashboard} 
            />

            <CourseTools 
                title={cyberSecurityData.tools.title} 
                subtitle={cyberSecurityData.tools.subtitle} 
                tools={cyberSecurityData.tools.tools} 
            />

            <CourseCareers 
                title={cyberSecurityData.careers.title} 
                subtitle={cyberSecurityData.careers.subtitle} 
                cards={cyberSecurityData.careers.cards} 
            />
        </div>
    );
};

export default CyberSecurityCourse;
