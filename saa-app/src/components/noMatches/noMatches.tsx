import './noMatches.css';

function noMatchesFound() {
    return (
        <div className="course-message-popup">
            <img src="/icon.png"/>
            <span className="course-message-text">No matches found — try adjusting your filters.</span>
        </div>
    );
};

export default noMatchesFound;