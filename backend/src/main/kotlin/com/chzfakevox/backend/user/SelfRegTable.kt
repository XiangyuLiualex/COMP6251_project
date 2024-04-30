package com.chzfakevox.backend.user;

import com.chzfakevox.backend.util.BaseIdTable;
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.json.jsonb
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.json.json

/**
 * @author chz
 */

data class selfRegForm(
    val formData: List<MedicalRecord>
)

data class MedicalRecord(
    val name : String,
    val vals: String
)

val format = Json { prettyPrint = true }
object SelfRegTable : BaseIdTable<Long>("self_reg"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val status: Column<SelfStatus> = enumerationByName("status", 10, SelfStatus::class)
    val form = json<selfRegForm>("self_reg",format)
}

enum class SelfStatus {
    PENDING, APPROVED, REJECTED
}
