//import { Box, Button, Divider, List, ListItem } from "@mui/material"
import { useApproveSelfRegisterMutation, useGetAllApprovalsQuery } from "../../../../entities/admin/admin.query"
import PartFullFeaturedCrudGrid from "../../patient/selfRegister/onlyreadform.tsx"
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, List, ListItem, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from "react";
import { ViewProfile } from "../../general/generalProfile.ui.jsx";
import { apiPrefix } from "../../config/path.ts";
import { useSnackbar } from 'notistack';



export function ApprovalsPage() {

    const { data: approvals, isLoading, error } = useGetAllApprovalsQuery();
    const { mutate } = useApproveSelfRegisterMutation();
    const { enqueueSnackbar } = useSnackbar();

    const handleApproveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selfRegiFormId = event.currentTarget.id;
        handleApprove(selfRegiFormId);
    }
    const handleRejcet = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selfRegiFormId = event.currentTarget.id;
        fetch(apiPrefix("/admin/approve/reject/" + selfRegiFormId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                enqueueSnackbar('Rejected', { variant: 'success' });
            }
        });
    }


    function handleApprove(selfRegiFormId: string): void {

        mutate(selfRegiFormId);
        console.log('Approve:', selfRegiFormId);
    }


    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <h1>Approvals Page</h1>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}


            {approvals && (
                <List component="nav">
                    {approvals.map((item) => (
                        <Accordion key={item.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>patient: {item.patientId}   createTime:{item.createDateTimeString} status:{item.status}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    <Button variant="contained" color="primary" id={item.patientId} onClick={handleApproveClick}>Approve</Button>
                                    <Button variant="contained" color="secondary" id={item.patientId} onClick={handleRejcet} >Reject</Button>
                                    <ViewProfile patientId={item.patientId} ifReadOnly={true} />
                                    <Divider />
                                    <PartFullFeaturedCrudGrid role="admin" data={item.formData} />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            )
            }
        </div >
    );
}

