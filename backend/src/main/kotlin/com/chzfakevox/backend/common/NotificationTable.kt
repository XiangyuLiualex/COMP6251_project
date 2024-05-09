package com.chzfakevox.backend.common

import com.chzfakevox.backend.user.UserTable
import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID


object NotificationTable : BaseIdTable<Long>("notification") {
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val userId = reference("user_id", UserTable.id)
    val message = varchar("message", 255)
    val status = enumerationByName("status", 255, NotificationStatus::class)
}
class Notification(id: EntityID<Long>) : BaseEntity<Long>(id, NotificationTable) {
    companion object : BaseEntityClass<Long, Notification>(NotificationTable)

    var userId by NotificationTable.userId
    var message by NotificationTable.message
    var status by NotificationTable.status
}

data class NotificationModel(
    val id: Long,
    val userId: Long,
    val message: String,
    val status: NotificationStatus
){
    companion object{
        fun from(notification: Notification) = NotificationModel(
            id = notification.id.value,
            userId = notification.userId.value,
            message = notification.message,
            status = notification.status
        )
    }
}
enum class NotificationStatus {
    read, unread
}
