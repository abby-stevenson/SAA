import './uniNotFound.css'; 

function UniNotFound() {
    return (
        <div className="course-message-popup">
            <img src="/icon.png"/>
            <span className="course-message-text">University not found. Please check the name and try again.</span>
        </div>
    );
};

export default UniNotFound;