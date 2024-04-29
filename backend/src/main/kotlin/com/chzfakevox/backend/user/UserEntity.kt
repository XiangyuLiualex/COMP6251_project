package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID

object UserEntity : BaseIdTable<Long>("user_account"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val email = varchar("email", 255).uniqueIndex()
    val password = varchar("password", 255)
}
class User(id: EntityID<Long>) : BaseEntity<Long>(id, UserEntity) {
    companion object : BaseEntityClass<Long, User>(UserEntity)

    var email by UserEntity.email
    var password by UserEntity.password
}


