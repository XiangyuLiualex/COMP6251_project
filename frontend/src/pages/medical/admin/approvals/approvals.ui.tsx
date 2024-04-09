import { useGetAllApprovalsQuery } from "../../../../entities/admin/admin.query"

type Approval = {
    id: number
}

export function ApprovalsPage() {
    const { data, isLoading, error } = useGetAllApprovalsQuery()
    return (
        <div>
            <h1>Approvals Page</h1>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && (
                <div>
                    <h2>Approvals</h2>
                    <ul>
                        {data.map((approval: Approval) => (
                            <li key={approval.id}>
                                approval ...
                                {/* {approval.name} - {approval.age} */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}