package com.chzfakevox.backend.appointment

import com.chzfakevox.backend.medical.SlotTable
import com.chzfakevox.backend.user.UserTable
import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID

object AppointmentTable : BaseIdTable<Long>("appointment"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val gpId = reference("gp_id", UserTable.id)
    val slotId = reference("slot_id",SlotTable.id)
    val status = enumerationByName("status", 10, AppointmentStatus::class)
    val createDateTime = varchar("create_date_time_string", 255)
}

enum class AppointmentStatus {
    

}

class Appointment(id: EntityID<Long>) : BaseEntity<Long>(id, AppointmentTable) {
    companion object : BaseEntityClass<Long, Appointment>(AppointmentTable)

    var patientId by AppointmentTable.patientId
    var doctorId by AppointmentTable.doctorId
    var appointmentDateTime by AppointmentTable.appointmentDateTime
    var status by AppointmentTable.status
    var createDateTime by AppointmentTable.createDateTime
}

object gpExtension : BaseIdTable<Long>("gp") {
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val patientId = reference("user_id", UserTable.id)
    val name = varchar("name", 255)
    val treatments = varchar("treatments", 255)
    val yearsInPractice = integer("years_in_practice")
    val phone = varchar("phone", 255)
}