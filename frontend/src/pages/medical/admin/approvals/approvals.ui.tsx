import { Button, Divider } from "@mui/material"
import { useApproveSelfRegisterMutation, useGetAllApprovalsQuery } from "../../../../entities/admin/admin.query"
import FullFeaturedCrudGrid from "../../patient/selfRegister/form"



export function ApprovalsPage() {
    const { data: approvals, isLoading, error } = useGetAllApprovalsQuery()
    const { mutate } = useApproveSelfRegisterMutation()
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
                    {approvals.map((item) =>
                        <>
                            <div>id:{item.id} statues:{item.statues} patient: {item.patientId} createTime:{item.createDateTimeString}</div>
                            <Button variant="contained" color="primary" onClick={() => handleApprove(item.id)
                            }>Approve</Button>
                            <Divider />
                            <FullFeaturedCrudGrid role="admin" data={item.formData} />
                        </>
                    )}
                </div>
            )}
        </div>
    )
}