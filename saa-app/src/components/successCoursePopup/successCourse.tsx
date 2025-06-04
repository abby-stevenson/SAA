
import React from 'react';
import './successCourse.css';



const SuccessCoursePopup = () => {
    return (
        <div className = "SCPwrapper">
                <div className='successcourseimage'>
                <img src="/check.png" alt = "successcourse" />
                </div>

                <div className='successcoursetext'>
                Course added
                </div>
            </div>
    );
};

export default SuccessCoursePopup;