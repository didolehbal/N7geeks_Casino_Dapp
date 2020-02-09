import React, { useState, useEffect } from "react";
import Wheel from "./Wheel";
import { Input, Button, Form, Spin, Alert } from "antd";

const FINNEY = 1e15;
const ETH = 1e18;

function Casino({ drizzleContext }) {
  const { initialized, drizzleState, drizzle } = drizzleContext;
  const { Casino } = drizzle.contracts;
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [bet, setBet] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [round, setRound] = useState({});

  useEffect(() => {
    if (initialized === true) {
      setAccount({
        address: drizzleState.accounts[0],
        balance: drizzleState.accountBalances[drizzleState.accounts[0]]
      });
      window.ethereum.on("accountsChanged", function() {
        // reload the app when the account changes to ensure that all context and caches are properly cleaned
        window.location.reload();
      });
    }
    window.ethereum.autoRefreshOnNetworkChange = true;
  }, [initialized]);

  const _play = () => {
    setRound({})
    if (amount && bet) {
      Casino.methods
        .play(bet)
        .send({
          from: account.address,
          value: amount
        })
        .on("receipt", receipt => {
          setAccount({ ...account, balance: account.balance - amount });
          let amountWon = receipt.events.hasWon &&
            Number.parseInt(receipt.events.hasWon.returnValues.amount ) || 0;
          setRound({jackpot:1})
          setTimeout(()=>{
            setRound({
              win: receipt.events.hasWon ? true : false,
              amount: amountWon,
              jackpot: receipt.events.unfortunate
                ? Number.parseInt(receipt.events.unfortunate.returnValues.jackpot)
                : bet
            });
            setAccount(account => ({
              ...account,
              balance: account.balance + amountWon
            }));
          },2000)
        })
        .on("error", err => {
          console.error(err);
        });
    }
  };
  console.log(round)
  if (initialized === false || account === null) {
    return <Spin />;
  }
  return (
    <div className="App">
      <div className="section">
        <h2>Active Account</h2>
        <p>adress:{account.address} </p>
        <p>balance:{(account.balance / ETH).toFixed(3) + " ETH"} </p>
      </div>
      <Wheel setBet={setBet} item={round.jackpot} />

      <Form style={{ width: "30%", margin: "auto" }}>
        {!spinning && round.win !== undefined ? (
          round.win == true ? (
            <Alert
              message={"you Won !, " + round.amount / FINNEY + " Finney"}
              type="success"
            />
          ) : (
            <Alert
              message={"you Lost!" }
              type="error"
            />
          )
        ) : null}

        <Form.Item>
          <Input
            placeholder="amount"
            type="text"
            onChange={e => setAmount(Number.parseInt(e.target.value) * FINNEY)}
            suffix="finney"
          />
        </Form.Item>
        <Form.Item>
          <h3>your bet : {bet}</h3>
        </Form.Item>
        <Form.Item>
          <Button type="dashed" size="large" onClick={_play} type="primary">
            Spin to Win !
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Casino;
