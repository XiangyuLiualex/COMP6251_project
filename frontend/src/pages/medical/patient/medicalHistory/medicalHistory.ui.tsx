import { useHistoryQuery } from "../../../../entities/patient/history.query"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {sessionStore} from "../../../../entities/session";
import {MedicalHistoryPage} from "../../common/MedicalHistory.tsx";

export function PatientMedicalHistoryPage() {
    const id = sessionStore.getState().uid
    return(
        <MedicalHistoryPage id = {id} />

    )
}




