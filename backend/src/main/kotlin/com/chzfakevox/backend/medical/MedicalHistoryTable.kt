package com.chzfakevox.backend.medical

import com.chzfakevox.backend.util.BaseIdTable
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.timestampWithTimeZone
import java.time.OffsetDateTime

object MedicalHistoryTable : BaseIdTable<Long>("medical_history"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val disease = varchar("disease", 255)
    val diseasedetails = varchar("disease_details", 255)
    val diagnosedDate = timestampWithTimeZone("diagnosed_date")
    val patientId = long("patient_id")
}

@Serializable
class MedicalRecord(

    val disease : String,
    val diseasedetails: String,
    val diagnosedDate: String,
    val patientId: Long
)