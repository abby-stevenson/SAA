
import React from 'react';
import './SuccessCreatedPopup.css';



const SuccessCreatedPopup = () => {
    return (
        <div className = "SLPwrapper">
                <div className='successimage'>
                <img src="/success.png" alt = "success" />
                </div>

                <div className='successtext'>
                You have successfully created an account.
                </div>
            </div>
    );
};

export default SuccessCreatedPopup;