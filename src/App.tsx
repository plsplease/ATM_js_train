import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Balances = { [key: string]: number };

function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');
  const [balances, setBalances] = useState<Balances>({
    '6304101310': 1000000,
  });
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value: string) => {
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const createNumpad = () => {
    const numpad = [];
    for (let i = 1; i < 10; i++) {
      numpad.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return numpad;
  };
  const deleteLast = () => {
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);

    setCalc(value);
  };

  const deposit = () => {
    const amount = parseFloat(calc);
    if (!isNaN(amount) && amount > 0) {
      const updatedBalances: Balances = { ...balances };
      updatedBalances[currentUser] = (updatedBalances[currentUser] || 0) + amount;
      setBalances(updatedBalances);
      setWithdrawAmount('');
      setCalc('');
    }
  };

  const withdraw = () => {
    const amount = parseFloat(calc);
    if (!isNaN(amount) && amount > 0) {
      if (balances[currentUser] >= amount) {
        const updatedBalances: Balances = { ...balances };
        updatedBalances[currentUser] -= amount;
        setBalances(updatedBalances);
        setWithdrawAmount('');
        setCalc('');
      } else {
        toast.error('Insufficient balance');
      }
    } else {
      toast.error('Invalid withdrawal amount');
    }
  };

  return (
    <>
      <div className="card2">Bank</div>
      <div className="card display">
        <div className="textleft">Account number</div>
        <div>MJU-6304101310</div>
        <div className="textleft">Account balance</div>
        <div>{balances[currentUser] || 0} THB</div>
      </div>
      <div className="App">
        <div className="calculator">
          <div className="display">
            {result ? <span>({result})</span> : ''}
            {calc || '0'}
          </div>

          <div className="operators">
            <button onClick={deleteLast}>DEL</button>
          </div>

          <div className="digits">
            {createNumpad()}
            <button onClick={() => updateCalc('.')}>.</button>
            <button onClick={() => updateCalc('0')}>0</button>
            <button onClick={() => updateCalc('0')}>,</button>
          </div>

          <div className="choice">
            <button onClick={deposit}>Deposit</button>
          </div>
          <div className="choice">
            <button onClick={withdraw}>Withdraw</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
