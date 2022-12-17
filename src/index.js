import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles/icons/icons.css";
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/rootReducer";
import 'bootstrap/dist/css/bootstrap.min.css';
const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

