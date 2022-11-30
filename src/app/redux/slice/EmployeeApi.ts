import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";
import { Employee } from "./EmployeeSlice";
const devEnv = process.env.NODE_ENV !== "production";

export const getEmployees = createAsyncThunk(
    "employee/getEmployee",
    async ({page, limit}:{page:number , limit:number}) => {
      try {
        const response= await API.get(`/employee?${devEnv?"_page":"offset" }=${page}&${devEnv?"_limit":"limit" }=${limit}`);
        let totalCount ;
        if (typeof response.headers.get === 'function') {
          totalCount =response.headers.get?.('X-Total-Count');
        }
        return { data: response.data , totalCount :devEnv? totalCount : 100}
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