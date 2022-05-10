import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdminLayout from './Components/AdminLayout';
import CartableLayout from './Components/CartableLayout';
import SingleActionLayout from './Components/SingleActionLayout';
import * as serviceWorker from './serviceWorker';
import BpmsConfig from './Shared/BpmsConfig'
import { BrowserRouter, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './State/store';

const Main = withRouter(({ location }) => {
    return (
        <div>
            {
                BpmsConfig.moduleType() == 1 &&
                <AdminLayout />
            }
            {
                BpmsConfig.moduleType() == 2 &&
                <CartableLayout />
            }
            {
                BpmsConfig.moduleType() == 3 &&
                <SingleActionLayout />
            }
        </div>
    )
})
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Main />
        </Provider>    
    </BrowserRouter>
    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
