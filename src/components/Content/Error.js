import Buttons from "../Common/Buttons";


export default function Error(props) {

    const {setRetrying} = props;
    return(
        <div className="error">
            <div className="error-page">
                <img alt="try-again" src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-vector-cone-icon-png-image_5169491.jpg"/>
                <span className="error-page-text">Something went wrong. Please try again</span>
                <Buttons 
                    name="Try Again"
                    variant="contained"
                    color="primary"
                    className="error-button"
                    onClick={() => setRetrying(prev => !prev)}
                />
            </div>
        </div>
    )
}