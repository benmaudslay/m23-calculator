import React from "react";
import { evaluate } from "mathjs";
import "./App.css";

const keys = [
  { value: "AC", styling: "clear wide" },
  { value: "/", styling: "operator" },
  { value: "7", styling: "num" },
  { value: "8", styling: "num" },
  { value: "9", styling: "num" },
  { value: "*", styling: "operator" },
  { value: "4", styling: "num" },
  { value: "5", styling: "num" },
  { value: "6", styling: "num" },
  { value: "+", styling: "operator" },
  { value: "1", styling: "num" },
  { value: "2", styling: "num" },
  { value: "3", styling: "num" },
  { value: "-", styling: "operator" },
  { value: "0", styling: "zero wide" },
  { value: ".", styling: "num" },
  { value: "=", styling: "operator" },
];

class App extends React.Component {
  state = {
    total: [0],
  };

  handleKey = (val) => {
    if (val === "AC") {
      this.setState({ total: [0] });
    } else if (val === "=") {
      try {
        let newTotal = evaluate(this.state.total.join(""));
        this.setState({ total: [newTotal] });
      } catch (error) {
        this.setState({ total: ["Err"] });
      }
    } else {
      let newArr = [...this.state.total, val];
      if (newArr[0] === 0) {
        newArr.shift();
      } else if (newArr[0] === "Err") {
        newArr.shift();
      }
      this.setState((prevState) => ({ total: newArr }));
    }
  };

  render() {
    return (
      <div className="container">
        <h3>
          <u> Calculator</u>
        </h3>
        <div className="wrapper">
          <h1 className="screen">{this.state.total}</h1>
          <div className="buttons">
            {keys.map((item) => {
              return (
                <Key
                  styling={item.styling}
                  func={this.handleKey}
                  number={item.value}
                />
              );
            })}
          </div>
        </div>
        <p>
          Made by <a href="https://github.com/benmaudslay">Ben</a>
        </p>
      </div>
    );
  }
}

const Key = (props) => (
  <button
    className={`btn ${props.styling}`}
    onClick={() => props.func(props.number)}
  >
    {props.number}
  </button>
);

export default App;
