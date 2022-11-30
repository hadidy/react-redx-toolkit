import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";
import { Employee } from "./EmployeeSlice";

export const getEmployees = createAsyncThunk(
    "employee/getEmployee",
    async ({page, limit}:{page:number , limit:number}) => {
      try {
        const response= await API.get(`/employee?_page=${page}&_limit=${limit}`);
        let totalCount ;
        if (typeof response.headers.get === 'function') {
          totalCount =response.headers.get?.('X-Total-Count');
        }
        return { data: response.data , totalCount}
      } catch (err: any) {
        return err.response.data;
      }
    }
  );
  export const addEmployees = createAsyncThunk(
    "employee/addEmployee",
    async (employee : Omit<Employee, "id"> ) => {
      try {
        const response = await API.post("/employee", employee);
        return response.data;
      } catch (err: any) {
        return err.response.data;
      }
    }
  );
  
  export const EditEmployeeStatus = createAsyncThunk(
    "employee/EditEmployeeStatus",
    async (employee : Employee) => {
      try {
        const response = await API.patch(`/employee/${employee.id}`, employee);
        return response.data;
      } catch (err: any) {
        return err.response.data;
      }
    }
  );