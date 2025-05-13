import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from '@dfinity/principal';

const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
export default CURRENT_USER_ID;

const init = async () => {
  const authClient = await AuthClient.create();
  if (authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
      }
    });
  }
}

async function handleAuthenticated(client) {
  const identity = await client.getIdentity();
  const userPrincipal = identity.getPrincipal();
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App loggedInPrincipal={userPrincipal.toString()} />
    </React.StrictMode>,
  );
}

init();
