import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'production' ? "https://pokecollector-be.herokuapp.com" : "http://localhost:3001"


//const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/* static method to handle general axios requests
takes in the following:
    url - takes in base URL and the endpoint for where to send request
    headers - used for sending the user's token
    params - the params for any GET requests, uses data
    method - type of request: GET, POST, DELETE, PATCH
    data - data to be sent to request body or through params. defaults to empty
*/

const request = async (endpoint, token = "", method = "GET", data = {}) => {
    console.debug("API Call:", endpoint, data, method);
    try {

        const options = {
            url: `${BASE_URL}/${endpoint}`,
            headers: { authorization: token },
            params: (method === "GET") ? data : {},
            method: method,
            data: data,
        };

        const res = await axios(options);

        return res.data;
    } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export default request;