import './deniedAccount.css';

const DeniedLoginPopup = () => {
    return (
        <div className="modal-overlay">
            <div className="SLPdeniedwrapper">
                <div className='deniedimage'>
                    <img src="/denied.png" alt="denied" />
                </div>
                <div className='deniedtext'>
                    Your account was not created. Please fill all fields.
                </div>
            </div>
        </div>
    );
};

export default DeniedLoginPopup;