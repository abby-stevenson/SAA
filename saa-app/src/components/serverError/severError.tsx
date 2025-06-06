import './serverErrror.css'; 

function ServerError() {
    return (
        <div className="course-message-popup">
            <img src="/icon.png"/>
            <span className="course-message-text">Server is down - please try again.</span>
        </div>
    );
};

export default ServerError;