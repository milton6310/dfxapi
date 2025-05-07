import React, { useState } from "react";
import axios from "axios";

function ExecuteCommand() {

    const [execResult, setExecResult] = useState();
    const [command, setCommand] = useState("");

    async function execCommand() {
        try {
            const params = new URLSearchParams();
            params.append('cmd', command);

            let response = await axios.post("http://localhost:5000/exec", params, {
                mode: "cors",
            });
            const data = response.data;
            const error = data.error;
            const stderr = data.stderr;
            const result = data.result;

            setExecResult(
                <table>
                    <tbody>
                        <tr>
                            <td style={{ whiteSpace: "nowrap" }}>Error</td>
                            <td>{error}</td>
                        </tr>
                        <tr>
                            <td style={{ whiteSpace: "nowrap" }}>Output Error</td>
                            <td>{stderr}</td>
                        </tr>
                        <tr>
                            <td style={{ whiteSpace: "nowrap" }}>Result</td>
                            <td>{result}</td>
                        </tr>
                    </tbody>
                </table>
            );
        } catch (error) {
            console.log(error);
            setExecResult(
                <table>
                    <tbody>
                        <tr>
                            <td style={{ whiteSpace: "nowrap" }}>Error</td>
                            <td>{error.response.statusText}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }

    function handleButtonClick() {
        execCommand();
    }

    function handleInputChange(event) {
        setCommand(event.target.value);
    }

    return (
        <div>
            <h2>Execute Command</h2>
            <button type="button" style={{ marginRight: "15px" }} onClick={handleButtonClick}>RUN</button>
            <input type="text" onChange={handleInputChange} value={command} />
            {execResult}
        </div>
    );
}

export default ExecuteCommand;