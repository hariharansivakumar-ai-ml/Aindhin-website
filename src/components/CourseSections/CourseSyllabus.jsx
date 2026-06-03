import React, { useState } from 'react';

const CourseSyllabus = ({ title = "Syllabus Overview", modules, note }) => {
    const [openModule, setOpenModule] = useState(1);

    const toggleModule = (id) => {
        setOpenModule(openModule === id ? null : id);
    };

    return (
        <section className="fs-card">
            <h2>{title}</h2>
            {modules.map((mod, idx) => {
                const id = idx + 1;
                const Icon = mod.icon;
                return (
                    <div className="fs-module" key={id}>
                        <div
                            className={`fs-module-header ${openModule === id ? 'active' : ''}`}
                            onClick={() => toggleModule(id)}
                        >
                            <div className="fs-module-title">
                                {Icon && <Icon className="fs-module-icon" size={20} />}
                                <span>{mod.title}</span>
                            </div>
                            <span className="fs-module-toggle">{openModule === id ? '−' : '+'}</span>
                        </div>
                        <div
                            className="fs-module-content"
                            style={{
                                maxHeight: openModule === id ? '500px' : '0px',
                                opacity: openModule === id ? 1 : 0,
                                padding: openModule === id ? '16px 20px' : '0 20px'
                            }}
                        >
                            <ul>
                                {mod.topics.map((topic, i) => (
                                    <li key={i}>{topic}</li>
                                ))}
                            </ul>
                            {mod.note && (
                                <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                                    {mod.note}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
            {note && (
                <p style={{ fontSize: '11px', marginTop: '6px', color: '#6b7280' }}>
                    {note}
                </p>
            )}
        </section>
    );
};

export default CourseSyllabus;
