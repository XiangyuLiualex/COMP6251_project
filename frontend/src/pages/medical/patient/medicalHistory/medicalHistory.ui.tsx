import { sessionStore } from "../../../../entities/session";
import { MedicalHistoryPage } from "../../common/MedicalHistory.tsx";

export function PatientMedicalHistoryPage() {
    const id = sessionStore.getState().uid
    return (
        <MedicalHistoryPage id={id} />

    )
}




