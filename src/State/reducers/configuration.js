import ConfigurationService from "../../Services/ConfigurationService";
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import UtilityService from '../../Services/UtilityService';

export const getConfiguration = createAsyncThunk('configuration/get', async () => {
    let data = await new ConfigurationService().get();
    return data;
})

export const updateConfiguration = createAsyncThunk('configuration/update', async (model) => {
    let result = await new ConfigurationService().update(model);
    UtilityService.showMessage(result.ResultType, result.Message);
    return model;
})

export const configurationSlice =  createSlice({
    name: 'configuration', // name of state in this reducer
    initialState: { value: {} },
    reducers: {
        setConfiguration: (state, action) =>{
            state.value = {
                ...state.value,
                ...action.payload
            }
        }
    },
    extraReducers(builder) {
      builder
        .addCase(getConfiguration.fulfilled, (state, action) => {
            state.value = action.payload
        })
        .addCase(updateConfiguration.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
});


export const { setConfiguration } = configurationSlice.actions;
export default configurationSlice.reducer;

