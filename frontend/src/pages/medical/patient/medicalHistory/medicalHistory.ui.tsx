import { useHistoryQuery } from "../../../../entities/patient/history.query"
export function MedicalHistoryPage() {
    // const data = [{ "id": 12, "name": "asb" }, { "id": 13, "name": "asb" }]
    const id = "12";
    const { data } = useHistoryQuery(id)
    console.log(data)
    // TODO refactor based on https://mui.com/material-ui/react-list/
    return (
        <div>
            <h1>Medical History</h1>
            {data?.map((item) => {
                return (
                    <div key={item.id}>
                        <p>{item.userId}</p>
                        <p>{item.dissese}</p>
                        <p>{item.discription}</p>
                        <p>{item.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}