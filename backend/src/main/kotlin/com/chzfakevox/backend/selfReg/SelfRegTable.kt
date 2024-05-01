package com.chzfakevox.backend.selfReg;

import com.chzfakevox.backend.medical.MedicalRecord
import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable;
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.json.json

/**
 * @author chz
 */

val format = Json { prettyPrint = true }
object SelfRegTable : BaseIdTable<Long>("self_reg"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val status = enumerationByName("status",10, SelfStatus::class)
    val form = json<List<MedicalRecord>>("form", format)
    val patientId = long("patient_id")
    val createDateTime = varchar("create_date_time_string",255)
}

class SelfReg(id: EntityID<Long>):BaseEntity<Long>(id, SelfRegTable){
    companion object : BaseEntityClass<Long, SelfReg>(SelfRegTable)

    var status by SelfRegTable.status
    var form by SelfRegTable.form
    var patientId by SelfRegTable.patientId
    var createDateTime by SelfRegTable.createDateTime
}

enum class SelfStatus {
    PENDING, APPROVED, REJECTED
}
