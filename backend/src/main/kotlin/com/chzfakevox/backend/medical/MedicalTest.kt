package com.chzfakevox.backend.medical

import com.chzfakevox.backend.appointment.AppointmentTable
import com.chzfakevox.backend.user.UserTable
import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import com.chzfakevox.backend.util.BaseTable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.javatime.Date
import org.jetbrains.exposed.sql.javatime.date

object MedicalTestTable :BaseIdTable<Long>("medical_test") {
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val patientId = reference("patient_id", UserTable.id)
    val testerId = reference("tester_id", UserTable.id).nullable()
    val appointmentId = reference("appointment_id",AppointmentTable.id)
    val name = varchar("name", 255)
    val date = date("date")
    val time = varchar("time", 255)
    val description = varchar("description",1000)
    val result = varchar("result",1000).nullable()
    val status = enumerationByName("status", 10, MedicalTestStatus::class)
}

enum class MedicalTestStatus {
    undo, done
}

class MedicalTest (id: EntityID<Long>) : BaseEntity<Long>(id, MedicalTestTable) {
    companion object : BaseEntityClass<Long, MedicalTest>(MedicalTestTable)

    var patientId by MedicalTestTable.patientId
    var testerId by MedicalTestTable.testerId
    var appointmentId by MedicalTestTable.appointmentId
    var name by MedicalTestTable.name
    var date by MedicalTestTable.date
    var time by MedicalTestTable.time
    var description by MedicalTestTable.description
    var result by MedicalTestTable.result
    var status by MedicalTestTable.status
}