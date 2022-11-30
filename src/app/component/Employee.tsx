import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AlertContext } from "../context/GlobalAlertContext";
import {
  EditEmployeeStatus,
  getEmployees,
} from "../redux/slice/EmployeeApi";
import { Employee } from "../redux/slice/EmployeeSlice";
import { AppDispatch, RootState } from "../redux/store";
import EmployeeStatus from "../shared/componanet/EmployeeStatus";
import Loading from "../shared/componanet/Loading";
export default function Employee2() {
  const { setOpen, setText } = useContext(AlertContext);
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {
    values: employees,
    totalCount,
    error,
    isLoading: loading,
  } = useSelector((state: RootState) => state.employees.list);
  const {
    isSaving,
    error: editError,
    status: editstatus,
  } = useSelector((state: RootState) => state.employees.edit);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getEmployees({ page, limit: rowsPerPage }));
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (editstatus) {
      setPage(0);
      setRowsPerPage(5);
      dispatch(getEmployees({ page, limit: rowsPerPage }));
    }
  }, [editstatus]);
  useEffect(() => {
    if (error || editError) {
      setText("something went wrong please try again later");
      setOpen(true);
    }
  }, [error, editError]);
  const handleStatusChange = useCallback((emplyee: Employee) => {
    return (newStatus: string) => {
      dispatch(EditEmployeeStatus({ ...emplyee, status: newStatus }));
    };
  }, []);

  return (
    <>
      {loading || isSaving ? (
        <Loading />
      ) : (
        <>
          <main>
            <Container sx={{ py: 8 }} maxWidth="md">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Employees
              </Typography>

              <Link to={`/addEmployee`} style={{ textDecoration: "none" }}>
                <Button variant="contained">Add Employee</Button>
              </Link>

              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-label="custom pagination table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>name</TableCell>
                      <TableCell>status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">
                          <EmployeeStatus
                            status={row.status}
                            handleStatusChange={handleStatusChange(row)}
                          ></EmployeeStatus>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={2}
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Container>
          </main>
        </>
      )}
    </>
  );
}
