import './didYouMean.css';

const DidYouMeanInstead = () => {
    return (
        <div className = "DYMwrapper">
                <div className='DYMimage'>
                <img src="/info.png" alt = "infobutton" />
                </div>
                Did you mean [] instead?
                <div className='infotext'>
                </div>
            </div>
    );
};

export default DidYouMeanInstead;