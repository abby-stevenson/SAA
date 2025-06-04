import './courseNotFound.css'; 

function CourseNotFound() {
    return (
        <div className="course-message-popup">
            <img src="/icon.png"/>
            <span className="course-message-text">Course not found in the database</span>
        </div>
    );
};

export default CourseNotFound;