import React from 'react';

const CourseMain = ({ children }) => {
    return (
        <main className="fs-main fs-section">
            <div className="fs-main-inner">
                {children}
            </div>
        </main>
    );
};

export default CourseMain;
