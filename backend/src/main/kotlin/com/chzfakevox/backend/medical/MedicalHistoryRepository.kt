package com.chzfakevox.backend.medical

import org.jetbrains.exposed.sql.batchInsert
import org.springframework.stereotype.Repository
import java.time.LocalDate
import java.time.OffsetDateTime


@Repository
class MedicalHistoryRepository {
        fun saveBatchRecords(formData: List<MedicalRecord>) {
            MedicalHistoryTable.batchInsert(formData){
                this[MedicalHistoryTable.patientId] = it.patientId
                this[MedicalHistoryTable.disease] = it.disease
                this[MedicalHistoryTable.diseasedetails] = it.diseasedetails
                this[MedicalHistoryTable.diagnosedDate] = OffsetDateTime.parse(it.diagnosedDate)
            }
        }
}