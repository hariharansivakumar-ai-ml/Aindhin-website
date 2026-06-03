import React from 'react';

const CourseDetailsSidebar = ({ title = "Course Details", details, enrollLink, enrollText = "Enroll Now & Start Learning" }) => {
    return (
        <aside className="fs-right">
            <section className="fs-card">
                <h2>{title}</h2>
                <ul className="fs-detail-list">
                    {details.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <li className="fs-detail-item" key={idx}>
                                <div className="fs-detail-icon">
                                    {Icon && <Icon size={20} />}
                                </div>
                                <div className="fs-detail-text">
                                    <strong>{item.label}</strong>
                                    <span>{item.value}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                
                {enrollLink ? (
                    <a 
                        href={enrollLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="fs-cta-btn"
                    >
                        {enrollText}
                    </a>
                ) : (
                    <a href="#top" className="fs-cta-btn">{enrollText}</a>
                )}
            </section>
        </aside>
    );
};

export default CourseDetailsSidebar;
