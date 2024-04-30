package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.BaseIdTable
import kotlinx.serialization.Serializable

object MedicalHistoryTable : BaseIdTable<Long>("medical_history"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val disease = varchar("disease", 100)
    val diseasedetails = varchar("diseasedetails", 100)
    val diagnosedDate = varchar("diagnosed_date", 100)
    val patientId = long("patient_id")
}

class MedicalRecord(


    val disease : String,
    val diseasedetails: String,
    val diagnosedDate: String,
    val patientId: Long
)