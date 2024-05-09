//import { Box, Button, Divider, List, ListItem } from "@mui/material"
import { useApproveSelfRegisterMutation, useGetAllApprovalsQuery } from "../../../../entities/admin/admin.query"
import PartFullFeaturedCrudGrid from "../../patient/selfRegister/onlyreadform.tsx"
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, List, ListItem, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from "react";



export function ApprovalsPage() {

    const { data: approvals, isLoading, error } = useGetAllApprovalsQuery();
    const { mutate } = useApproveSelfRegisterMutation();

    const handleApproveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selfRegiFormId = event.currentTarget.id;
        handleApprove(selfRegiFormId);
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
                                    <Divider />
                                    <PartFullFeaturedCrudGrid role="admin" data={item.formData} />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            )}
        </div>
    );
}

