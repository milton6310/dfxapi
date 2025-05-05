import React, { useState, useEffect } from "react";
import axios from "axios";
import CanisterUrl from "./CanisterUrl";

function CanisterList(props) {

    const [canisterList, setCanisterList] = useState();

    async function getCanisterList() {
        try {
            const response = await axios.get("http://localhost:5000/canister-list", {
                mode: "cors",
            });
            const list = response.data.list;
            setCanisterList(list);
            if (props.onFetch) {
                props.onFetch(list);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCanisterList();
    }, []);

    return (
        <div>
            <h2>Canisters</h2>
            <ul>
                {canisterList ? canisterList.map((name, index) => {
                    return <li key={index}>
                        {name}
                        <CanisterUrl name={name} />
                    </li>
                }) : <li>No canisters found</li>}
            </ul>
        </div>
    );
}

export default CanisterList;