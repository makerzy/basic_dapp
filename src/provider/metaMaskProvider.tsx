import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { injected } from "../connector/injected";

function MetamaskProvider({ children }: { children: any }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized: any) => {
        setLoaded(true);
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected);
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [activateNetwork, networkActive, networkError]);
  if (loaded) {
    return children;
  }
  return <>Loading...</>;
}

export default MetamaskProvider;

/* Using HTML? follow this method bellow */

const { ethereum } = window;

const getAccountsButton = document.getElementById("getAccounts");
const getAccountsResult = document.getElementById("getAccountsResult");

// connect web3 wallet
const onClickConnect = async () => {
  try {
    await ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.error(error);
  }
};

getAccountsButton?.addEventListener("click", async () => {
  // get user address in array
  const accounts = await ethereum.request({ method: "eth_accounts" });
  //We take the first address in the array of addresses and display it
  getAccountsResult?.innerHTML.concat(
    accounts[0] || "Not able to get accounts"
  );
});

// you can now proceed with using the account as it is used in this application. Enjoy!
