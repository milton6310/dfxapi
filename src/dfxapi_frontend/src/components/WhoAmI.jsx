import React, { useEffect, useState } from "react";
import axios from "axios";

function WhoAmI() {

    const [iam, setIam] = useState();

    async function getIdentity() {
        try {
            let response = await axios.get("http://localhost:5000/whoami", {
                mode: "cors",
            });
            const info = response.data;

            setIam(info["identity"]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIdentity();
    }, []);

    return (
        <label>
            <span>I am </span>: {iam}
        </label>
    );
}

export default WhoAmI;