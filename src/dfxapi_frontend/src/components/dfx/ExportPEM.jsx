import React, { useState, useEffect } from "react";
import axios from "axios";

function ExportPEM(props) {

    const [pem, setPEM] = useState();

    async function getIdentityPEM() {
        try {
            const response = await axios.get(`http://localhost:5000/pem/${props.name}`, {
                mode: "cors",
            });
            setPEM(response.data.PEM);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIdentityPEM();
    }, []);

    return (
        <span>{pem}</span>
    );
}

export default ExportPEM;