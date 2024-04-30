import { Box, Button, Divider, List, ListItem } from "@mui/material"
import { useApproveSelfRegisterMutation, useGetAllApprovalsQuery } from "../../../../entities/admin/admin.query"
import PartFullFeaturedCrudGrid from "../../patient/selfRegister/onlyreadform.tsx"



export function ApprovalsPage() {
    const { data: approvals, isLoading, error } = useGetAllApprovalsQuery()
    const { mutate } = useApproveSelfRegisterMutation()

    // using mui to handle data bind and submit
    const handleApproveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selfRegiFormId = event.currentTarget.id
        handleApprove(selfRegiFormId)
    }
    function handleApprove(selfRegiFormId: string): void {
        mutate(selfRegiFormId)
        console.log('Approve:', selfRegiFormId)
    }
    return (
        <div>
            <h1>Approvals Page</h1>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {approvals && (
                <div>
                    <h2>Approvals</h2>
                    {/* TODO dynamicly create list of togglable page
                    ref https://stackoverflow.com/a/52136908/16982682
                    and mui example https://mui.com/material-ui/react-list/ */}
                    <List component="nav">
                        {approvals.map((item) => {
                            return <ListItem key={item.id} >
                                <Box>
                                    <div>id:{item.id} statues:{item.statues} patient: {item.patientId} createTime:{item.createDateTimeString}</div>
                                    <Button variant="contained" color="primary" id={item.patientId} onClick={handleApproveClick}>Approve</Button>
                                    <Divider />
                                    <PartFullFeaturedCrudGrid role="admin" data={item.formData} />
                                </Box>
                            </ListItem>
                        })}

                    </List>
                </div>
            )}
        </div>
    )
}