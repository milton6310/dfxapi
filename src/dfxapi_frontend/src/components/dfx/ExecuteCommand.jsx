import React, { useState } from "react";
import axios from "axios";

function ExecuteCommand() {

    const [execResult, setExecResult] = useState();
    const [command, setCommand] = useState("");

    function formatOutput(lines) {
        let result = [];
        if (lines) {
            for (const line of lines) {
                if (line === " ") {
                    result.push("_");
                } else if (line !== "IDENTITY_NAME") {
                    if (line.indexOf("\x1B") >= 0) {
                        result.push(line.replace(/\x1B(\[[0-9;]*[JKmsu]|\(B)/g, ""));
                    } else {
                        result.push(line);
                    }
                }
            }
        }
        if (result.length > 0) {
            return result.join("\n");
        } else {
            return [];
        }
    }

    async function execCommand() {
        try {
            const params = new URLSearchParams();
            params.append('cmd', command);

            let response = await axios.post("http://localhost:5000/exec", params, {
                mode: "cors",
            });
            const data = response.data;
            const error = formatOutput(data.error);
            const stderr = formatOutput(data.stderr);
            const result = formatOutput(data.result);

            setExecResult(
                <table className="dfx-table">
                    <tbody>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Error</td>
                            <td className="dfx-td">{error}</td>
                        </tr>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Output Error</td>
                            <td className="dfx-td"><pre>{stderr}</pre></td>
                        </tr>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Result</td>
                            <td className="dfx-td"><pre>{result}</pre></td>
                        </tr>
                    </tbody>
                </table>
            );
        } catch (error) {
            console.log(error);
            setExecResult(
                <table className="dfx-table">
                    <tbody>
                        <tr>
                            <td className="dfx-td" style={{ whiteSpace: "nowrap" }}>Error</td>
                            <td className="dfx-td">{error.response.statusText}</td>
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

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            execCommand();
        }
    }

    return (
        <div className="component">
            <h2>Execute Command</h2>
            <button className="dfx-button" type="button" style={{ marginLeft: "20px", marginRight: "15px" }} onClick={handleButtonClick}>RUN</button>
            <input type="text" style={{ padding: "3px", width: "80%" }} onChange={handleInputChange} onKeyDown={handleKeyDown} value={command} />
            <div className="exec-table">
                {execResult}
            </div>
        </div>
    );
}

export default ExecuteCommand;