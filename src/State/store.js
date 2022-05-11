import {configureStore} from '@reduxjs/toolkit'
import configurationReducer from './reducers/configuration'
import assemblyFileReducer from './reducers/assemblyFile'

export const store = configureStore({
    reducer: {
        configuration: configurationReducer,
        assemblyFile: assemblyFileReducer
    }
});
