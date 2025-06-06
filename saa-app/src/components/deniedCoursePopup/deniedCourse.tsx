import './deniedCourse.css';

const DeniedCoursePopup = () => {
    return (
        <div className = "DCPwrapper">
                <div className='deniedcourseimage'>
                <img src="/exclamation.png" alt = "deniedcourse" />
                </div>

                <div className='deniedcoursetext'>
                Course could not be added
                </div>
            </div>
    );
};

export default DeniedCoursePopup;