import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AlertContext } from "../context/GlobalAlertContext";
import { addEmployees } from "../redux/slice/EmployeeApi";
import { AppDispatch, RootState } from "../redux/store";
import Loading from "../shared/componanet/Loading";

export default function AddEmployee() {
  const { setOpen, setText , setSeverity} = useContext(AlertContext);
  const [userName, setUserName] = useState("");
  const {
    status,
    isSaving: loading,
    error,
  } = useSelector((state: RootState) => state.employees.add);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      setText("users successfully added");
      setSeverity?.("success")
      setOpen(true);
      navigate("/");
    }
  }, [status]);

  useEffect(() => {
    if (error) {
      setText("something went wrong");
      setOpen(true);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <main>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Add Employee
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "45vh",
                justifyContent: "center",
              }}
            >
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const formElements = form.elements as typeof form.elements & {
                    username: { value: string };
                  };
                  if (!formElements.username.value) {
                    setText("username is required");
                    setOpen(true);
                    return;
                  }
                  dispatch(
                    addEmployees({
                      name: formElements.username.value,
                      status: "added",
                    })
                  );
                }}
              >
                <Stack>
                  <TextField
                    value={userName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setUserName(event.target.value);
                    }}
                    id="username"
                    label="username"
                    variant="standard"
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: "20px" }}
                  >
                    Add
                  </Button>
                </Stack>
              </form>
            </Box>
          </Container>
        </main>
      )}
    </>
  );
}
