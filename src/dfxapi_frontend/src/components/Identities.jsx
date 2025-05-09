import React, { useState, useEffect } from "react";
import axios from "axios";
import IdentityPrincipal from "./IdentityPrincipal";

function Identities(props) {

    const [identityList, setIdentityList] = useState();

    async function getIdentityList() {
        try {
            const response = await axios.get("http://localhost:5000/id-list", {
                mode: "cors",
            });
            const list = response.data.identity;
            setIdentityList(list);
            if (props.onList) {
                props.onList(list);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIdentityList();
    }, []);

    return (
        <div className="component">
            <h2>Identities</h2>
            <ul>
                {identityList ? identityList.map((name, index) => {
                    return <li key={index}>
                        {name}: <IdentityPrincipal name={name} />
                    </li>
                }) : <li>No identity found</li>}
            </ul>
        </div>
    );
}

export default Identities;