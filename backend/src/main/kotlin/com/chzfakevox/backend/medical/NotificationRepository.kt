package com.chzfakevox.backend.medical

import com.chzfakevox.backend.common.Notification
import com.chzfakevox.backend.common.NotificationStatus
import com.chzfakevox.backend.common.NotificationTable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.and
import org.springframework.stereotype.Repository

@Repository
class NotificationRepository {
    fun getUnreadNotification(uid: Long): List<Notification> {
//        return Notification.find { NotificationTable.userId eq uid }.toList()
        return Notification.find { (NotificationTable.userId eq uid) and (NotificationTable.status eq NotificationStatus.unread) }.toList()
    }

    fun readNotification(nid: Long): Notification {
        val notification = Notification[nid]
        notification.status = NotificationStatus.read
        return notification

    }

    fun createNotification(inMessage:String,pid :EntityID<Long>) {
        Notification.new {
            userId = pid
            status = NotificationStatus.unread
            message = inMessage
        }
    }
}