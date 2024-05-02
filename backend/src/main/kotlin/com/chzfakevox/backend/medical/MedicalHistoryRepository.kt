package com.chzfakevox.backend.medical

import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.springframework.stereotype.Repository
import java.time.LocalDate
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter


@Repository
class MedicalHistoryRepository {
        fun saveBatchRecords(formData: List<MedicalRecord>) : Int {
            return MedicalHistoryTable.batchInsert(formData){
                this[MedicalHistoryTable.patientId] = it.patientId
                this[MedicalHistoryTable.disease] = it.disease
                this[MedicalHistoryTable.diseasedetails] = it.diseasedetails
//                this[MedicalHistoryTable.diagnosedDate] = LocalDate.parse(it.diagnosedDate)
                this[MedicalHistoryTable.diagnosedDate] = OffsetDateTime.parse(it.diagnosedDate, DateTimeFormatter.ISO_OFFSET_DATE_TIME).toLocalDate()
            }.count()
        }

    fun getMedicalRecords(pId: Long): List<MedicalRecord> {
        return MedicalHistoryTable.selectAll().where { MedicalHistoryTable.patientId eq pId }.map {
            MedicalRecord(
                patientId = it[MedicalHistoryTable.patientId],
                disease = it[MedicalHistoryTable.disease],
                diseasedetails = it[MedicalHistoryTable.diseasedetails],
                diagnosedDate = it[MedicalHistoryTable.diagnosedDate].toString()
            )
        }
    }
}