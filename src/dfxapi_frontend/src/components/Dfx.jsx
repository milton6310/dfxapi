import React, { useState } from "react";
import CanisterList from "./dfx/CanisterList";
import Ledger from "./dfx/Ledger";
import Schema from "./dfx/Schema";
import Ping from "./dfx/Ping";
import WhoAmI from "./dfx/WhoAmI";
import Identities from "./dfx/Identities";
import ExecuteCommand from "./dfx/ExecuteCommand";
import CanisterCycles from "./dfx/CanisterCycles";
import CanisterStatusInfo from "./dfx/CanisterStatusInfo";
import ExportIdentities from "./dfx/ExportIdentities";
import LogIn from "./dfx/LogIn";
import "./dfx.scss";

function Dfx(props) {

    const [listOfCanisters, setListOfCanisters] = useState();
    const [rootKey, setRootKey] = useState();
    const [identities, setIdentities] = useState();

    function handleCanisterList(list) {
        setListOfCanisters(list);
    }

    function handleRootKey(key) {
        setRootKey(key);
    }

    function handleIdentityList(list) {
        setIdentities(list);
    }

    return (
        <div className="dfx-container">
            <div style={{ marginBottom: "0px" }}>
                <h1>Use of DFX API</h1>
                <p>
                    API server file (server.js) should reside in the project root directory with dfx.json. Base URL is "http://localhost:5000". REACT frontend makes API calls to the API server running on Port 5000. the following module needs to be installed. Use "nodemon server.js" to start the server.
                </p>
                <div style={{ marginBottom: "0px" }}>
                    <ul className="dfx-ul">
                        <li>"ejs": "^3.1.10"</li>
                        <li>"express": "^5.1.0"</li>
                        <li>"axios": "^1.9.0"</li>
                        <li>"cors": "^2.8.5"</li>
                    </ul>
                </div>
            </div>
            <LogIn />
            <WhoAmI user={props.user} />
            <Identities onList={handleIdentityList} />
            <Ping onRootKey={handleRootKey} />
            <Ledger />
            <CanisterList onFetch={handleCanisterList} />
            <CanisterCycles canisters={listOfCanisters} />
            <ExportIdentities list={identities} />
            <CanisterStatusInfo canisters={listOfCanisters} />
            <ExecuteCommand />
            <Schema />
        </div>
    );
}

export default Dfx;