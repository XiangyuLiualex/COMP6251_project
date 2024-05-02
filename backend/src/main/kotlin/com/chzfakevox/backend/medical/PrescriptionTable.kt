package com.chzfakevox.backend.medical

import com.chzfakevox.backend.appointment.AppointmentTable
import com.chzfakevox.backend.user.UserTable
import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID

object PrescriptionTable : BaseIdTable<Long>("prescription"){
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val patientId = reference("patient_id", UserTable.id)
    val gpId = reference("gp_id", UserTable.id)
    val appointmentId = reference("appointment_id", AppointmentTable.id)
    val mdeicationName = varchar("medication_name", 255)
    val medicationInstruction = varchar("medication_instruction", 255)
    val quantity = integer("quantity")
}

class Prescription(id: EntityID<Long>) : BaseEntity<Long>(id, PrescriptionTable) {
    companion object : BaseEntityClass<Long, Prescription>(PrescriptionTable)

    var patientId by PrescriptionTable.patientId
    var gpId by PrescriptionTable.gpId
    var appointmentId by PrescriptionTable.appointmentId
    var medicationName by PrescriptionTable.mdeicationName
    var medicationInstruction by PrescriptionTable.medicationInstruction
    var quantity by PrescriptionTable.quantity
}