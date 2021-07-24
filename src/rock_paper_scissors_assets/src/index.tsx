import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app/App";
import {Provider} from "react-redux";
import store from "./store";

// bootstrap app
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
