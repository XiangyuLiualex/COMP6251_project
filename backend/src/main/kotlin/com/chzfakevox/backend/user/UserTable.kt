package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.javatime.date

object UserTable : BaseIdTable<Long>("user_account"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val email = varchar("email", 255).uniqueIndex()
    val password = varchar("password", 255)
    val role = varchar("role", 255)
}
enum class UserRole{
    PATIENT, DOCTOR, ADMIN
}
class User(id: EntityID<Long>) : BaseEntity<Long>(id, UserTable) {
    companion object : BaseEntityClass<Long, User>(UserTable)

    var email by UserTable.email
    var password by UserTable.password
    var role by UserTable.role
}

object ProfileEntity : BaseIdTable<Long>("user_profile"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val userId = reference("user_id", UserTable)
    val name = varchar("name", 255).nullable()
    val gender = varchar("gender", 255).nullable()
    val phone = varchar("phoneNum", 255).nullable()
    val birthday = date("birth_date").nullable()
    val profession = varchar("profession",255).nullable()
    val aboutMe = varchar("about_me",255).nullable()
}
class Profile(id: EntityID<Long>) : BaseEntity<Long>(id, ProfileEntity) {
    companion object : BaseEntityClass<Long, Profile>(ProfileEntity)

    var userId by ProfileEntity.userId
    var name by ProfileEntity.name
    var gender by ProfileEntity.gender
    var phone by ProfileEntity.phone
    var birthday by ProfileEntity.birthday
    var profession by ProfileEntity.profession
    var aboutMe by ProfileEntity.aboutMe
}