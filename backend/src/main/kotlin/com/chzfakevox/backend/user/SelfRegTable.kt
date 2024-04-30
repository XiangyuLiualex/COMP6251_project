package com.chzfakevox.backend.user;

import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable;
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.json.jsonb
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import kotlinx.serialization.Serializable
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
    val status = enumerationByName("status",10,SelfStatus::class)
    val form = json<List<MedicalRecord>>("form",format)
    val patientId = long("patient_id")
}

class SelfReg(id: EntityID<Long>):BaseEntity<Long>(id,SelfRegTable){
    companion object : BaseEntityClass<Long, SelfReg>(SelfRegTable)

    var status by SelfRegTable.status
    var form by SelfRegTable.form
    var patientId by SelfRegTable.patientId
}

enum class SelfStatus {
    PENDING, APPROVED, REJECTED
}
