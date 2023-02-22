import React from "react";
import loading from "../../assets/loading.gif"

import "../../css/navigation/loading.css";

const Loading = () => {

    return <div className="Loading">
        <div className="Loading-text">
            <img src={loading} alt="loading" />
        </div>
        <div className="Loading-text">
            <span>Loading...</span>
        </div>
    </div>
};

export default Loading;