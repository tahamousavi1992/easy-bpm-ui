import {configureStore} from '@reduxjs/toolkit'
import configurationReducer from './reducers/configuration'

export const store = configureStore({
    reducer: {
        configuration: configurationReducer
    }
});
