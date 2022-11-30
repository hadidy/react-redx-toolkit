import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { userStatuses } from "../constant";


export default function EmployeeStatus({ status , handleStatusChange}: { status: string , handleStatusChange:(status:string)=>void }) {

  return (
    <ButtonGroup>
      {userStatuses.map((userStatus) => {
        return (
          <Button key={userStatus} variant={status === userStatus ? "contained" : "outlined"}
          onClick={()=>{
            handleStatusChange(userStatus)
          }}>
            {userStatus}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
