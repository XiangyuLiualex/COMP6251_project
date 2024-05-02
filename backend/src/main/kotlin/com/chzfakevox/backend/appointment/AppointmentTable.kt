package com.chzfakevox.backend.appointment

import com.chzfakevox.backend.user.UserTable
import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID

object AppointmentTable : BaseIdTable<Long>("appointment"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val patientId = reference("patient_id", UserTable.id)
    val gpId = reference("gp_id", UserTable.id)
    val slotId = reference("slot_id", SlotTable.id)
    val status = enumerationByName("status", 20, AppointmentStatus::class)
    val reason = varchar("reason", 255).nullable()
}

enum class AppointmentStatus(val displayName: String)  {
    beforeApprove("before Approve"),
    Accepted("Accepted"),
    Rejected("Rejected"),
    done("done");
    override fun toString(): String {
        return displayName
    }
}

class Appointment(id: EntityID<Long>) : BaseEntity<Long>(id, AppointmentTable) {
    companion object : BaseEntityClass<Long, Appointment>(AppointmentTable)

    var patientId by AppointmentTable.patientId
    var gpId by AppointmentTable.gpId
    var slotId by AppointmentTable.slotId
    var status by AppointmentTable.status
    var reason by AppointmentTable.reason
}

object gpExtension : BaseIdTable<Long>("gp") {
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val gpId = reference("user_id", UserTable.id)
    val name = varchar("name", 255)
    val treatments = varchar("treatments", 255)
    val yearsInPractice = integer("years_in_practice")
    val phone = varchar("phone", 255)
}
class GP (id: EntityID<Long>) : BaseEntity<Long>(id, gpExtension) {
    companion object : BaseEntityClass<Long, GP>(gpExtension)

    var gpId by gpExtension.gpId
    var name by gpExtension.name
    var treatments by gpExtension.treatments
    var yearsInPractice by gpExtension.yearsInPractice
    var phone by gpExtension.phone
}