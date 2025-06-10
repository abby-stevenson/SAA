import 'loggedOut.css';

function loggedOut() {
    return (
        <div className="logged-message-popup">
            <img src="/Log in.png"/>
            <span className="logged-message-text">You have been logged out.</span>
        </div>
    );
};

export default loggedOut;