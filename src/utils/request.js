import axios from "axios";
import React from "react";
export const sendPostRequest = async (url, body, headers) => {
    await axios.post(url, body, { headers })
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(err => alert(err))
}

export const sendGetRequest = async (url, headers) => {

    let data = await axios.get(url, { headers })
        .then(res => res.data)
        .then(data => data)
        .catch(err => alert(err))

    return data;

}