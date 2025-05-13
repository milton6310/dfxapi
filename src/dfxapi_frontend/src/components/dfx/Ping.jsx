import React, { useEffect, useState } from "react";
import axios from "axios";

function Ping(props) {

    const [pingInfo, setPingInfo] = useState();

    async function getPingInfo() {
        try {
            let response = await axios.get("http://localhost:5000/ping", {
                mode: "cors",
            });
            const info = response.data;
            const status = info["replica_health_status"];
            const rootKey = info["root_key"];
            const keyLength = rootKey.length;
            const keyString = "(Length: " + keyLength.toString() + "): " + rootKey.toString().replaceAll(",", ", ");

            var statusStyle;
            if (status === "healthy") {
                statusStyle = { color: "blue", fontWeight: "bolder" };
            } else {
                statusStyle = { color: "red", fontWeight: "bolder" };
            }

            if (props.onRootKey) {
                props.onRootKey(rootKey);
            }

            setPingInfo(
                <table className="dfx-table">
                    <thead>
                        <tr>
                            <th className="dfx-th">Item</th>
                            <th className="dfx-th">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Status</td>
                            <td className="dfx-td" style={statusStyle}>{status.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Root Key</td>
                            <td className="dfx-td">{keyString}</td>
                        </tr>
                    </tbody>
                </table>
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPingInfo();
    }, []);

    return (
        <div className="component">
            <h2>Ping</h2>
            {pingInfo}
        </div>
    );
}

export default Ping;