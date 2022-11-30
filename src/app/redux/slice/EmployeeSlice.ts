import {  createSlice } from "@reduxjs/toolkit";
import { addEmployees, EditEmployeeStatus, getEmployees } from "./EmployeeApi";
export interface Employee {
  id: string;
  name: string;
  status: string;
}

interface EmployeeList {
  isLoading: boolean;
  error: string;
  values: Employee[];
  totalCount: number;
}
interface EmployeeCRUD {
  isSaving: boolean;
  error: string;
  status: string;
}
interface EmployeeState {
  list: EmployeeList;
  add: EmployeeCRUD;
  edit:EmployeeCRUD;
}

const initialState: EmployeeState = {
  list: {
    isLoading: false,
    error: "",
    values: [],
    totalCount:0
  },
  add: {
    isSaving: false,
    error:"",
    status:""
  },
  edit: {
    isSaving: false,
    error:"",
    status:""
  }
};


export const employeeReducer = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetState(state) {
      let newState : EmployeeState = {
        add :{isSaving : false , error :'' , status:""},
        edit :{isSaving : false , error :'', status:""},
        list:{
          isLoading: false,
          error: "",
          values: state.list.values,
          totalCount:state.list.totalCount
        }
      }
      state = newState ;
    },
    
  },
  extraReducers: {
    [getEmployees.pending.type]: (state,  meta ) => {
      state.list.error = "";
      state.list.isLoading = true;
    },
    [getEmployees.fulfilled.type]: (state,  {payload} ) => {
      state.list.isLoading = false;
      state.list.error = "";
      state.list.values = [...payload?.data];
      state.list.totalCount = payload.totalCount;
      state.add = initialState.add;
      state.edit = initialState.edit;
    },
    [getEmployees.rejected.type]: (state, action) => {
      state.list.isLoading = false;
      state.list.error = "something went wrong";
    },
    [addEmployees.pending.type]: (state, action) => {
      state.add.isSaving = true;
      state.add.error = "";
      state.add.status = "";
    },
    [addEmployees.fulfilled.type]: (state, {payload} ) => {
      state.add.isSaving = false;
      state.add.error = "";
      state.add.status = "success";
    },
    [addEmployees.rejected.type]: (state, action) => {
      state.add.isSaving = false;
      state.add.error = "something went wrong";
      state.add.status = "";
    },
    [EditEmployeeStatus.pending.type]: (state, action) => {
      state.edit.isSaving = true;
      state.edit.error = "";
      state.edit.status = "";
    },
    [EditEmployeeStatus.fulfilled.type]: (state, { payload }) => {
      state.edit.isSaving = false;
      state.edit.error = "";
      state.edit.status = "success";
    },
    [EditEmployeeStatus.rejected.type]: (state, action) => {
      state.edit.isSaving = false;
      state.edit.error = "something went wrong";
      state.edit.status = "";
    },
  },
});

export const {resetState} = employeeReducer.actions;
export default employeeReducer.reducer;
