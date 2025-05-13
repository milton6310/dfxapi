import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../../declarations/nft";
import { idlFactory as mtokenIdlFactory } from "../../../../declarations/mtoken_backend";
import { dfxapi_backend } from "../../../../declarations/dfxapi_backend";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import CURRENT_USER_ID from "../../main";
import PriceLabel from "./PriceLabel";

function Item(props) {
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [priceLabel, setPriceLabel] = useState();
  const [shouldDisplay, setDisplay] = useState(true);

  const id = props.id;
  const localHost = "http://127.0.0.1:3000/";
  const agent = HttpAgent.createSync({
    host: localHost
  });
  let NFTActor;

  async function loadNFT() {
    // Fetch root key for local development
    if (process.env.DFX_NETWORK !== 'ic') {
      await agent.fetchRootKey();
    }
    NFTActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: id
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(new Blob([imageContent.buffer], { type: "image/png" }));

    setName(name);
    setOwner(owner.toText());
    setImage(image);

    if (props.role == "collection") {
      const nftIsListed = await dfxapi_backend.isListed(props.id);
      if (nftIsListed) {
        setOwner("DfxAPI");
        setBlur({ filter: "blur(4px)" });
        setSellStatus("Listed");
      } else {
        setButton(<Button onClick={handleSell} text={"Sell"} />);
      }
    } else if (props.role == "discover") {
      console.log(props.id.toText());
      const originalOwner = await dfxapi_backend.getOriginalOwner(props.id);
      console.log(originalOwner.toText());
      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button onClick={handleBuy} text={"Buy"} />);
      }
      const price = await dfxapi_backend.getListedNFTPrice(props.id);
      setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
    }
  }

  useEffect(() => {
    loadNFT();
  }, []);

  let price;
  function handleSell() {
    console.log("handle sell clicked");
    setPriceInput(<input
      placeholder="Price in DANG"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => price = e.target.value}
    />);
    setButton(<Button onClick={sellItem} text={"Confirm"} />);
  }

  async function sellItem() {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);
    const listingResult = await dfxapi_backend.listItem(props.id, Number(price));
    if (listingResult == "Success") {
      let dfxAPIId = await dfxapi_backend.getCanisterID();
      const transferResult = await NFTActor.transferOwnership(dfxAPIId);
      if (transferResult == "Success") {
        setLoaderHidden(true);
        setButton();
        setPriceInput();
        setOwner("DfxAPI");
        setSellStatus("Listed");
      }
    }
  }

  async function handleBuy() {
    console.log("Buy clicked");
    setLoaderHidden(false);
    const mtokenActor = Actor.createActor(mtokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("vb2j2-fp777-77774-qaafq-cai"),
    });

    const sellerId = await dfxapi_backend.getOriginalOwner(props.id);
    console.log(sellerId.toText());
    const itemPrice = await dfxapi_backend.getListedNFTPrice(props.id);
    console.log(itemPrice);
    const result = await mtokenActor.transfer(sellerId, itemPrice);
    console.log(result);
    if (result == "Success") {
      const transferResult = await dfxapi_backend.completePurchase(props.id, sellerId, CURRENT_USER_ID);
      setLoaderHidden(true);
      setDisplay(false);
      console.log("purchase: " + transferResult);
    }
  }

  return (
    <div style={{ display: shouldDisplay ? "inline" : "none" }} className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />
        <div className="lds-ellipsis" hidden={loaderHidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"> {sellStatus}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
