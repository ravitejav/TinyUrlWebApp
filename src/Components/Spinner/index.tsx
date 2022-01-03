import './spinner.css';

const Spinner = () => {

    return (
        <div className="mainContainer">
            <div className="spinnerContainer">
                <div className="spinner"></div>
                <h2>Loading....</h2>
            </div>
        </div>
    );

}

export default Spinner;