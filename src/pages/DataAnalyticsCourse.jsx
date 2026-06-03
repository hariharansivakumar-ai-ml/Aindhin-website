import { useEffect } from 'react';
import './DataAnalyticsCourse.css';

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
import { dataAnalyticsData } from '../data/courses/dataAnalyticsData';

const DataAnalyticsCourse = () => {

    useEffect(() => {
        document.title = "Data Analytics Course: Master Business Intelligence | Aindhin";
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

    return (
        <div className="fs-course" id="top">
            <CourseHero {...dataAnalyticsData.hero} />

            <CourseMain>
                <div className="fs-left">
                    <CourseAbout paragraphs={dataAnalyticsData.about} />
                    <CourseSyllabus 
                        title={dataAnalyticsData.syllabus.title} 
                        modules={dataAnalyticsData.syllabus.modules} 
                    />
                </div>
                <CourseDetailsSidebar 
                    details={dataAnalyticsData.details} 
                    enrollLink={dataAnalyticsData.hero.enrollLink}
                    enrollText="View Course Curriculum &amp; Career Path"
                />
            </CourseMain>

            <CourseCompanies 
                title={dataAnalyticsData.companies.title} 
                subtitle={dataAnalyticsData.companies.subtitle} 
                logos={dataAnalyticsData.companies.logos} 
            />

            <CourseHighlights 
                title={dataAnalyticsData.highlights.title} 
                subtitle={dataAnalyticsData.highlights.subtitle} 
                cards={dataAnalyticsData.highlights.cards} 
                dashboard={dataAnalyticsData.highlights.dashboard} 
            />

            <CourseTools 
                title={dataAnalyticsData.tools.title} 
                subtitle={dataAnalyticsData.tools.subtitle} 
                tools={dataAnalyticsData.tools.tools} 
            />

            <CourseCareers 
                title={dataAnalyticsData.careers.title} 
                subtitle={dataAnalyticsData.careers.subtitle} 
                cards={dataAnalyticsData.careers.cards} 
            />
        </div>
    );
};

export default DataAnalyticsCourse;
