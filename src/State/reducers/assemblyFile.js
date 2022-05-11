import AssemblyFileService from "../../Services/AssemblyFileService";
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import UtilityService from '../../Services/UtilityService';

export const getAssemblyFile = createAsyncThunk('assemblyFile/get', async () => {
    let data = await new AssemblyFileService().getList();
    return { GetList: data };
})

export const updateAssemblyFile = createAsyncThunk('assemblyFile/update', async (formData) => {
    let result = await new AssemblyFileService().update(formData);
    UtilityService.showMessage(result.ResultType, result.Message);

    let data = await new AssemblyFileService().getList();
    return { GetList: data };
})

export const deleteAssemblyFile = createAsyncThunk('assemblyFile/delete', async (fileName) => {
    let result = await new AssemblyFileService().delete(fileName);
    UtilityService.showMessage(result.ResultType, result.Message);

    let data = await new AssemblyFileService().getList();
    return { GetList: data };
})

export const assemblyFileSlice =  createSlice({
    name: 'assemblyFile', // name of state in this reducer
    initialState: { value: {} },
    reducers: {
        setAssemblyFile: (state, action) =>{
            state.value = {
                ...state.value,
                ...action.payload
            }
        }
    },
    extraReducers(builder) {
      builder
        .addCase(getAssemblyFile.fulfilled, (state, action) => {
            state.value = {
                ...state.value,
                ...action.payload
            }
        })
        .addCase(updateAssemblyFile.fulfilled, (state, action) => {
            state.value = {
                ...state.value,
                ...action.payload
            }
        })
        .addCase(deleteAssemblyFile.fulfilled, (state, action) => {
            state.value = {
                ...state.value,
                ...action.payload
            }
        })
    }
});


export const { setAssemblyFile } = assemblyFileSlice.actions;
export default assemblyFileSlice.reducer;

