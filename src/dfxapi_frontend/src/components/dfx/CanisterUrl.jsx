import React, { useState, useEffect } from "react";
import axios from "axios";

function CanisterUrl(props) {

    const [canisterUrl, setCanisterUrl] = useState();

    async function getCanisterUrl() {
        try {
            const response = await axios.get(`http://localhost:5000/canister-url/${props.name}`, {
                mode: "cors",
            });
            const urls = response.data.URL;
            setCanisterUrl(
                <ul className="dfx-ul">
                    {
                        urls ? urls.map((url, index) => {
                            return <li key={index}><a href={url} target="_blank">{url}</a></li>;
                        }) : <br />
                    }
                </ul>
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCanisterUrl();
    }, []);

    return (
        <div>
            {canisterUrl}
        </div>
    );
}

export default CanisterUrl;