import ReactDOM from "react-dom/client";
import App from "./App";

let counter = 1

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//oc
// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
ReactDOM.createRoot(document.getElementById('root')).render(<App counter={counter} />)
