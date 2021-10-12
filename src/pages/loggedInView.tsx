import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Button } from "../components";
import BasicAbi from "./../abi/BasicAbi.json";

const contractAddress = "0x2F244A66B14d9Da1426F7CAC5824d60371d60606";

const MaxUint256: BigNumber = /*#__PURE__*/ BigNumber.from(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

const LoggedInView = () => {
  const [amount, setAmount] = useState<any>("");
  const [active, setActive] = useState<any>(false);
  const [token, setToken] = useState("");
  const { library, account } = useWeb3React();
  const tokens = [
    {
      name: "Basic Token",
      address: contractAddress,
    },
  ];

  useEffect(() => {
    checkAllowance();
  }, []);

  const checkAllowance = async () => {
    let contract = new library.eth.Contract(BasicAbi, contractAddress);
    let allowanceBig = await contract.methods
      .allowance(account, contractAddress)
      .call();
    let allowance = library.utils.fromWei(allowanceBig);
    if (+allowance >= +amount) {
      setActive(true);
    }
  };

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleTokenChange = (e: any) => {
    setToken(e.target.value);
  };

  const approve = async () => {
    let contract = new library.eth.Contract(BasicAbi, contractAddress);
    let allowanceBig = await contract.methods
      .allowance(account, contractAddress)
      .call();
    let allowance = library.utils.fromWei(allowanceBig);
    if (+allowance <= +amount) {
      contract.methods
        .approve(contractAddress, MaxUint256.toString())
        .send({ from: account, gasPrice: "20000000000" });
      setActive(true);
    } else {
      setActive(true);
      alert("Total supply is less than the amount you want to transfer ");
    }
  };

  const handleSendBnb = async () => {
    try {
      // contractAddress should be replaced by the receiver address
      await library.eth.sendTransaction({
        to: contractAddress,
        from: account,
        value: library.utils.toWei(amount, "ether"),
      });
      setActive(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleTransfer = async () => {
    try {
      let contract = new library.eth.Contract(BasicAbi, contractAddress);
      let allowanceBig = await contract.methods
        .allowance(account, contractAddress)
        .call();
      let allowance = library.utils.fromWei(allowanceBig);
      if (+allowance >= +amount) {
        // token should be replaced by the receiver address
        await contract.methods
          .transferFrom(account, token, library.utils.toWei(amount, "ether"))
          .send({ from: account, gasPrice: "20000000000" });
        setActive(true);
      } else {
        alert("Approve what to send first");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full px-5">
      <div className="sm:w-1/3 w-full m-auto">
        <h2 className="text-3xl">Send token</h2>

        <div className="mt-3">
          <label htmlFor="amount">Amount</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            value={amount}
            id="amount"
            className="
             w-full
             border-gray-300 focus:border-blue-300 
             focus:ring focus:ring-blue-200 
             focus:ring-opacity-5 
             rounded-md shadow-sm  
              bg-primary
              hover:bg-orange-400
              px-4
              py-4
              rounded
              leading-loose
              items-center"
          />
        </div>

        <div>
          <label htmlFor="amount">Select Token</label>
          <select
            onChange={handleTokenChange}
            className="form-select block w-full mt-1 py-3 rounded"
          >
            {tokens.map((token: any, i: number) => (
              <option key={i} value={token.address}>
                {token.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between my-4">
          <Button text="Approve" disabled={active} onClick={approve} />
          <Button text="Send" disabled={!active} onClick={handleTransfer} />
        </div>
      </div>

      <div className="sm:w-1/3 w-full m-auto">
        <h2 className="text-3xl">Transfer BNB</h2>

        <div className="mt-3">
          <label htmlFor="amount">Amount</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            value={amount}
            id="amount"
            className="
             w-full
             border-gray-300 focus:border-blue-300 
             focus:ring focus:ring-blue-200 
             focus:ring-opacity-5 
             rounded-md shadow-sm  
              bg-primary
              hover:bg-orange-400
              px-4
              py-4
              rounded
              leading-loose
              items-center"
          />
        </div>

        <div>
          <label htmlFor="amount">Select Token</label>
          <select
            onChange={handleTokenChange}
            className="form-select block w-full mt-1 py-3 rounded"
          >
            {tokens.map((token: any, i: number) => (
              <option key={i} value={token.address}>
                {token.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between my-4">
          <Button text="Send Bnb" onClick={handleSendBnb} />
        </div>
      </div>
    </div>
  );
};

export default LoggedInView;
