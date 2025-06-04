
import React from 'react';
import './successAccount.css';



const SuccessLoginPopup = () => {
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

export default SuccessLoginPopup;