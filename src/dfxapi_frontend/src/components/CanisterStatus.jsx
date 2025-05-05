import React, { useEffect, useState } from "react";
import axios from "axios";

function CanisterStatus(props) {

    const [status, setStatus] = useState();

    async function getCanisterStatus() {
        try {
            const response = await axios.get(`http://localhost:5000/canister-status/${props.name}`, {
                mode: "cors",
            });
            const info = response.data;
            const runningStatus = info.status;
            const items = info.others;

            var statusStyle;
            if (runningStatus.indexOf("Running") >= 0) {
                statusStyle = { color: "blue", fontWeight: "bolder" };
            } else if (runningStatus.indexOf("Stopping") >= 0) {
                statusStyle = { color: "yellow", fontWeight: "bolder" };
            } else if (runningStatus.indexOf("Stopped") >= 0) {
                statusStyle = { color: "red", fontWeight: "bolder" };
            }

            setStatus(
                <table>
                    <caption>Canister: {props.name}</caption>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Status</td>
                            <td style={statusStyle}>{runningStatus}</td>
                        </tr>
                        {items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ whiteSpace: "nowrap" }}>{item.item}</td>
                                    <td>{item.value}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table >
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCanisterStatus();
    }, []);

    return (
        <div>
            {status}
        </div>
    );
}

export default CanisterStatus;