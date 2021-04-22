import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://www.nexofin.com/archivos/2017/08/soltodo-el-dia_88d9c462.jpg)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    A new day 💪
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
