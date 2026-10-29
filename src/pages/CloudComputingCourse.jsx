import { useEffect } from 'react';
import './CloudComputingCourse.css';

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
import { cloudComputingData } from '../data/courses/cloudComputingData';

const CloudComputingCourse = () => {

    useEffect(() => {
        document.title = "Cloud Computing Course (AWS & Azure) | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Learn core AWS and Azure services and deploy your own project on the cloud. Online and self-paced.");
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
            <CourseHero {...cloudComputingData.hero} />

            <CourseMain>
                <div className="fs-left">
                    <CourseAbout paragraphs={cloudComputingData.about} />
                    <CourseSyllabus 
                        title={cloudComputingData.syllabus.title} 
                        modules={cloudComputingData.syllabus.modules} 
                    />
                </div>
                <CourseDetailsSidebar 
                    details={cloudComputingData.details} 
                    enrollLink={cloudComputingData.hero.enrollLink}
                    enrollText="View Course Curriculum &amp; Cloud Career Path"
                />
            </CourseMain>

            <CourseCompanies 
                title={cloudComputingData.companies.title} 
                subtitle={cloudComputingData.companies.subtitle} 
                logos={cloudComputingData.companies.logos} 
            />

            <CourseHighlights 
                title={cloudComputingData.highlights.title} 
                subtitle={cloudComputingData.highlights.subtitle} 
                cards={cloudComputingData.highlights.cards} 
                dashboard={cloudComputingData.highlights.dashboard} 
            />

            <CourseTools 
                title={cloudComputingData.tools.title} 
                subtitle={cloudComputingData.tools.subtitle} 
                tools={cloudComputingData.tools.tools} 
            />

            <CourseCareers 
                title={cloudComputingData.careers.title} 
                subtitle={cloudComputingData.careers.subtitle} 
                cards={cloudComputingData.careers.cards} 
            />
        </div>
    );
};

export default CloudComputingCourse;
