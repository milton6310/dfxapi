import React, { useState, useEffect } from "react";
import axios from "axios";

function Schema() {

    const [isHidden, setHidden] = useState(false);

    async function getSchema() {
        try {
            let response = await axios.get("http://localhost:5000/schema", {
                mode: "cors",
            });
            const result = response.data;
            const container = document.getElementById('schema-container');

            jsonToTree(result, container);
            setHidden(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSchema();
    }, []);

    function jsonToTree(obj, parent) {
        const ul = document.createElement('ul');

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const li = document.createElement('li');
                li.setAttribute("key", key);
                li.textContent = key + ": ";

                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    jsonToTree(obj[key], li);
                } else {
                    li.textContent += JSON.stringify(obj[key]);
                }
                ul.appendChild(li);
            }
        }
        parent.appendChild(ul);
    }

    function handleButtonClick() {
        setHidden(true);
        getSchema();
    }

    return (
        <div className="component">
            <h2>Schema</h2>
            <button className="dfx-button" type="button" style={{ marginLeft: "15px" }} onClick={handleButtonClick}>Refresh</button>
            <br />
            <div>
                <div id="schema-container" className="schema-scroll" hidden={isHidden}>
                </div>
            </div>
        </div>
    );
}

export default Schema;