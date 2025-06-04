
import React from 'react';
import './deniedAccount.css';



const DeniedLoginPopup = () => {
    return (
        <div className = "SLPdeniedwrapper">
                <div className='deniedimage'>
                <img src="/denied.png" alt = "denied" />
                </div>

                <div className='deniedtext'>
                Your account was not created.
                </div>
            </div>
    );
};

export default DeniedLoginPopup;