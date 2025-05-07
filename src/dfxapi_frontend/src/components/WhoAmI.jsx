import React, { useEffect, useState } from "react";
import axios from "axios";

function WhoAmI() {

    const [iam, setIam] = useState();
    const [principal, setPrincipal] = useState("");

    async function getIdentity() {
        try {
            let response = await axios.get("http://localhost:5000/whoami", {
                mode: "cors",
            });
            const info = response.data;
            setIam(info["identity"]);

            response = await axios.get("http://localhost:5000/get-principal", {
                mode: "cors",
            });
            const id = response.data;
            setPrincipal(id.principal);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIdentity();
    }, []);

    return (
        <div className="component">
            <span className="accent">I am </span>: {iam}
            <br />
            <span className="accent">Principal</span>: {principal}
        </div>
    );
}

export default WhoAmI;