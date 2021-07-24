import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app/App";
import {Provider} from "react-redux";
import store from "./store";
import {queryClient} from "./services/api";
import {QueryClientProvider} from "react-query";

// bootstrap app
ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </QueryClientProvider>,
    document.getElementById('root')
);
