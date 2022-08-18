import { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
const reducer = (state, { action, value }) => {
  switch (action) {
    case "add-digit": {
      if(state.overWrite) return {...state,currentValue:value,overWrite:false}
      if (state.currentValue === "0" && value === "0") return state;
      if (state.currentValue.includes(".") && value === ".") return state;
      return { ...state, currentValue: `${state.currentValue}${value}` };
    }
    case 'clear':
      return { currentValue: "", prevValue: "", operation: "" };
    case 'operation':
      {
        if (state.prevValue === '' && state.currentValue === '') return state
        if (state.currentValue === '') return state
        if (state.prevValue === '') return { prevValue: state.currentValue, currentValue: '', operation: value }
        return {prevValue:calculation(state),currentValue:'',operation:value}
      }
    case 'calculate': {
      if(state.currentValue===''||state.prevValue===''||state.operation==='') return state
      return {currentValue:calculation(state),prevValue:'',operation:'',overWrite:true}
    }
    case 'delete': {
      if (state.overWrite) return { ...state, currentValue: '', overWrite: false }

      return {
        ...state, currentValue: state.currentValue.slice(0,-1)}
      }
    default:
      return state;
  }
};
const calculation = ({ currentValue, prevValue, operation }) => {
  const curr = parseFloat(currentValue)
  const prev = parseFloat(prevValue)
  console.log('from cal:',prev,curr,operation)
  let value = 0;
  switch (operation) {
    case "+":
      value = prev + curr;
      break;
    case "-":
      value = prev-curr;
       break;
    case "*":
      value = prev * curr;
       break;
    case "/":
      value = prev / curr;
       break;
  }
  console.log(value)
  return value.toString();
}
function App() {
  const intialState = { currentValue: "", prevValue: "", operation: "" };
  const [{ currentValue, prevValue, operation }, dispatch] = useReducer(
    reducer,
    intialState
  );
 console.log('curr:',currentValue,'pre:',prevValue)
  return (
    <div className="container">
      <div className="span4">CALCULATOR</div>
      <div className="prev">{prevValue}{ operation}</div>
      <div className="now">{currentValue}</div>
      <button className="span2" onClick={()=>dispatch({action:'clear'})}>AC</button>
      <button onClick={()=>dispatch({action:'delete'})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}></OperationButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
     
   <button className="span2" onClick={()=>dispatch({action:'calculate'})}>=</button>
      
    </div>
  );
}
export default App;
