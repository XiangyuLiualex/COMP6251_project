package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.javatime.date

object ProfileTable : BaseIdTable<Long>("user_profile"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val userId = reference("user_id", UserTable)
    val name = varchar("name", 255).nullable()
    val gender = varchar("gender", 255).nullable()
    val phone = varchar("phone", 255).nullable()
    val medicationName = varchar("medication_name", 255).nullable()
    val birthday = date("birth_date").nullable()
    val profession = varchar("profession",255).nullable()
    val aboutMe = varchar("about_me",255).nullable()
}
class Profile(id: EntityID<Long>) : BaseEntity<Long>(id, ProfileTable) {
    companion object : BaseEntityClass<Long, Profile>(ProfileTable)

    var userId by ProfileTable.userId
    var name by ProfileTable.name
    var gender by ProfileTable.gender
    var phone by ProfileTable.phone
    var birthday by ProfileTable.birthday
    var profession by ProfileTable.profession
    var aboutMe by ProfileTable.aboutMe
}