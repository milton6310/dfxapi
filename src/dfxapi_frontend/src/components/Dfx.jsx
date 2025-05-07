import React, { useEffect, useState } from "react";
import axios from "axios";
import CanisterList from "./CanisterList";
import CanisterStatus from "./CanisterStatus";
import Ledger from "./Ledger";
import AddFabricatedCycles from "./AddFabricatedCycles";
import Schema from "./Schema";
import Ping from "./Ping";
import WhoAmI from "./WhoAmI";
import Identities from "./Identities";
import ExecuteCommand from "./ExecuteCommand";

function Dfx() {

    const [principal, setPrincipal] = useState("");
    const [listOfCanisters, setListOfCanisters] = useState();
    const [rootKey, setRootKey] = useState();

    async function getPrincipal() {
        try {
            const response = await axios.get("http://localhost:5000/get-principal", {
                mode: "cors",
            });
            const id = response.data;
            setPrincipal(id.principal);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPrincipal();
    }, []);

    function handleCanisterList(list) {
        setListOfCanisters(list);
    }

    function handleRootKey(key) {
        setRootKey(key);
    }

    return (
        <div>
            <div>
                <h1>Use of DFX API</h1>
                <p>
                    API server file (server.js) should reside in the project root directory with dfx.json. Base URL is "http://localhost:5000". REACT frontend makes API calls to the API server running on Port 5000. the following module needs to be installed. Use "nodemon server.js" to start the server.
                </p>
                <div>
                    <ul>
                        <li>"ejs": "^3.1.10"</li>
                        <li>"express": "^5.1.0"</li>
                        <li>"axios": "^1.9.0"</li>
                        <li>"cors": "^2.8.5"</li>
                    </ul>
                </div>
            </div>
            <div>
                <WhoAmI />
            </div>
            <div>
                <label>
                    <span>Principal</span>: {principal}
                </label>
            </div>
            <div>
                <Identities />
            </div>
            <div>
                <Ping onRootKey={handleRootKey} />
            </div>
            <div>
                <Ledger />
            </div>
            <div>
                <h2>Cycles</h2>
                {listOfCanisters ? listOfCanisters.map((item, index) => {
                    return <AddFabricatedCycles key={index} name={item} />
                }) : <br />}
            </div>
            <div>
                <CanisterList onFetch={handleCanisterList} />
            </div>
            <div>
                <h2>Canister Status</h2>
                {listOfCanisters ? listOfCanisters.map((item, index) => {
                    return <CanisterStatus key={index} name={item} />
                }) : <br />}
            </div>
            <div>
                <ExecuteCommand />
            </div>
            <div>
                <h2>Schema</h2>
                <Schema />
            </div>
        </div>
    );
}

export default Dfx;