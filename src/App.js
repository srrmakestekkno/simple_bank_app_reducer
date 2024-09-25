import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const BALANCE_ON_OPEN = 500;
const WITHDRAW_AMOUNT = 50;
const DEPOSIT_AMOUNT = 150;
const LOAN_AMOUNT = 5000;

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true, balance: BALANCE_ON_OPEN };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance >= action.payload
            ? state.balance - action.payload
            : state.balance,
      };
    case "requestLoan":
      return state.loan !== 0
        ? { ...state }
        : {
            ...state,
            loan: state.loan + action.payload,
            balance: state.balance + action.payload,
          };

    case "payLoan":
      return { ...state, balance: state.balance - state.loan, loan: 0 };
    case "closeAccount":
      return state.balance === 0 && !hasLoan ? initialState : { ...state };
    default:
      throw new Error("Unknown action...");
  }
}

function App() {
  const [{ isActive, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="container">
      <h2>useReducer Bank Account</h2>
      {isActive && (
        <>
          <p>
            Balance: <strong>{balance}</strong>
          </p>
          <p className={`${loan > 0 ? "loan" : ""}`}>
            Loan: <strong>{loan}</strong>
          </p>
        </>
      )}

      <button
        onClick={() => dispatch({ type: "openAccount" })}
        disabled={isActive}
      >
        Open Account
      </button>
      {isActive && (
        <>
          <button
            onClick={() =>
              dispatch({ type: "deposit", payload: DEPOSIT_AMOUNT })
            }
            disabled={!isActive}
          >
            Deposit {DEPOSIT_AMOUNT}
          </button>
          <button
            onClick={() =>
              dispatch({ type: "withdraw", payload: WITHDRAW_AMOUNT })
            }
            disabled={!isActive}
          >
            Withdraw {WITHDRAW_AMOUNT}
          </button>
          <button
            onClick={() =>
              dispatch({ type: "withdraw", payload: WITHDRAW_AMOUNT * 10 })
            }
            disabled={!isActive}
          >
            Withdraw {WITHDRAW_AMOUNT * 10}
          </button>
          <button
            onClick={() =>
              dispatch({ type: "requestLoan", payload: LOAN_AMOUNT })
            }
            disabled={!isActive}
          >
            Request a loan of {LOAN_AMOUNT}
          </button>
          <button
            onClick={() => dispatch({ type: "payLoan" })}
            disabled={!isActive}
          >
            Pay loan
          </button>
          <button
            onClick={() => dispatch({ type: "closeAccount" })}
            disabled={!isActive}
          >
            Close account
          </button>
        </>
      )}
    </div>
  );
}

export default App;
