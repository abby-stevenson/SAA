import './simpleCourseCard.css';

interface SimpleCourseCardProps {
    courseNumber: string;
    onClick?: () => void;
}

function SimpleCourseCardPopup({ courseNumber, onClick }: SimpleCourseCardProps) {
    return (
        <div className="simple-course-card" onClick={onClick}>
            <span className="simple-course-title">{courseNumber}</span>
        </div>
    );
}

export default SimpleCourseCardPopup;