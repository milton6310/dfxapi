import React, { useState, useEffect } from "react";
import axios from "axios";

function IdentityPrincipal(props) {

    const [identity, setIdentity] = useState();

    async function getIdentity() {
        try {
            const response = await axios.get(`http://localhost:5000/get-principal/${props.name}`, {
                mode: "cors",
            });
            const principal = response.data.principal;
            setIdentity(principal);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIdentity();
    }, []);

    return (
        <span>{identity}</span>
    );
}

export default IdentityPrincipal;