import { useEffect, useState } from "react";
import { useTestQuery,useUpdateTestMutation,useDoneTestMutation } from "../../../../entities/practitioner/test.query";
import { Table, TableContainer } from "@mui/material";
import { sessionStore } from "../../../../entities/session";
  import * as React from "react";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import Button from '@mui/material/Button';
  import TextField from '@mui/material/TextField';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogContentText from '@mui/material/DialogContentText';
  import DialogTitle from '@mui/material/DialogTitle';



//   {
//     "id": 1,
//     "patientId": "5",
//     "testerId": "8",
//     "appointmentId": "5",
//     "name": "blood test",
//     "date": "2024-08-08",
//     "time": "09:00-10:00",
//     "description": "Do not eat anything",
//     "status": "undo",
//     "result": "good"
//   }


function UpdateTest({ test, onUpdateTest }) {
    const [open, setOpenAlt] = React.useState(false);
    const handleClickOpen = () => {
      setOpenAlt(true);
    };
    const handleClose = () => {
      setOpenAlt(false);
    };

    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Upload Result
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const testId = test.id;
              const testerId= sessionStore.getState().uid;
              const result=formJson.result;
              onUpdateTest(testId,testerId,result)
              handleClose();
            },
          }}
        >
          <DialogTitle>Add Test Result</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Add Test Result:
            </DialogContentText>
            <TextField
              margin="dense"
              id="result"
              name="result"
              label="Result"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }



export function TestTable({ tests,onUpdateTest,onDoneTest}) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>PatientId</TableCell>
              <TableCell align="right">Test Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.filter(test => test.status === "undo").map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.patientId}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <UpdateTest test={row}
                              onUpdateTest={onUpdateTest}
                  />
                </TableCell>
                <TableCell align="right">
                    <Button variant="contained"
                        onClick={()=>onDoneTest(row.id)}
                    >Done</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


export function MedicalTestsPage() {
    const { data, isLoading, error, refetch } =useTestQuery()
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const { mutate: mutateTestResult} = useUpdateTestMutation();
    const { mutate: mutateTestDone, isSuccess } = useDoneTestMutation()
  
    useEffect(() => {
      if (isSuccess) {
        setShouldRefetch(true);
      }
    }, [isSuccess]);
  
    useEffect(() => {
      if (shouldRefetch) {
        refetch();
        setShouldRefetch(false);  // 重置状态，确保不会无限循环触发 refetch
      }
    }, [shouldRefetch, refetch]);
// testId,result
    const handleUpdateTest=(testId,testerId,result)=>{
        mutateTestResult({
            testId:testId,
            testerId:testerId,
            result:result
        });
    };

    const handleDoneTest=(testId)=>{
        mutateTestDone({
            testId:testId
        });
    };

    
  
    if (error) return <h4>Error: {error.message}, retry again</h4>;
    if (isLoading) return <h4>...Loading data</h4>;
  
    const tests = data.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      let timeA = a.time.split('-')[0]; // 获取开始时间 "8:00"
      let timeB = b.time.split('-')[0]; // 获取开始时间 "9:00"
      let minutesA = parseInt(timeA.split(':')[0]) * 60 + parseInt(timeA.split(':')[1]);
      let minutesB = parseInt(timeB.split(':')[0]) * 60 + parseInt(timeB.split(':')[1]);
      return minutesA - minutesB;
    });
  
   
  
    return (
      <div>
        <h1>Medical Test</h1>
        <TestTable tests={tests}
                   onUpdateTest={handleUpdateTest}
                   onDoneTest={handleDoneTest}
        />
      </div>
    );
}