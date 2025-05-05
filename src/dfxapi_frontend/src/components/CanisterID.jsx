import React, { useState, useEffect } from "react";
import axios from "axios";

function CanisterID(props) {

    const [canisterId, setCanisterId] = useState();

    async function getCanisterId() {
        try {
            const response = await axios.get(`http://localhost:5000/canister/${props.name}`, {
                mode: "cors",
            });
            const id = response.data.ID;
            setCanisterId(
                <ul>
                    <li>
                        ID: {id}
                    </li>
                </ul>
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCanisterId();
    }, []);

    return (
        <div>
            {canisterId}
        </div>
    );
}

export default CanisterID;