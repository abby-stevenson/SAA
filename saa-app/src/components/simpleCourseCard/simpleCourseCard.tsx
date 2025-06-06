import './simpleCourseCard.css'; 

interface SimpleCourseCardProps {
  courseNumber: string;
}

const SimpleCourseCardPopup = ({ courseNumber }: SimpleCourseCardProps) => {
  return (
    <div className="simple-course-card">
      <span className="simple-course-title">Course - {courseNumber}</span>
    </div>
  );
};

export default SimpleCourseCardPopup;