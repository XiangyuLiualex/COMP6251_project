package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID

object UserTable : BaseIdTable<Long>("user_account"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val email = varchar("email", 255).uniqueIndex()
    val password = varchar("password", 255)
    val role = varchar("role", 255)
    val ifPatientValid = bool("if_patient_valid").default(false)
}
enum class UserRole{
    PATIENT, GP, ADMIN
}
class User(id: EntityID<Long>) : BaseEntity<Long>(id, UserTable) {
    companion object : BaseEntityClass<Long, User>(UserTable)

    var email by UserTable.email
    var password by UserTable.password
    var role by UserTable.role
    var ifPatientValid by UserTable.ifPatientValid
}

