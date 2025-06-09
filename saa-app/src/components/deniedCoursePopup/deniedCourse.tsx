import './deniedCourse.css';
import { useEffect } from 'react';

interface DeniedCoursePopupProps {
    onClose: () => void;
}

const DeniedCoursePopup = ({ onClose }: DeniedCoursePopupProps) => {

    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className = "DCPwrapper">
                <div className='deniedcourseimage'>
                <img src="/exclamation.png" alt = "deniedcourse" />
                </div>

                <div className='deniedcoursetext'>
                Action could not be completed
                </div>
            </div>
    );
};

export default DeniedCoursePopup;