package com.chzfakevox.backend.appointment

import org.jetbrains.exposed.dao.id.EntityID
import org.springframework.stereotype.Repository

@Repository
class AppointmentRepository {
    fun getById(id: Long): Appointment {
        return Appointment[id]
    }
    fun getByGpId(gpId: Long): List<Appointment> {
        return Appointment.find { AppointmentTable.gpId eq gpId }.toList()
    }
    fun createAppointment(inputPatientId:EntityID<Long>,
                          inputSlotId:EntityID<Long>,
                          inputGpId:EntityID<Long>,
                          inputReason:String): Appointment {
        return Appointment.new {
            patientId = inputPatientId
            slotId= inputSlotId
            gpId= inputGpId
            status = AppointmentStatus.beforeApprove
            reason = inputReason
        }
    }

    fun updateAppointment(appointment: Appointment, newSlotId: EntityID<Long>,newGpId: EntityID<Long>) : Appointment {
        appointment.slotId = newSlotId
        appointment.gpId = newGpId
        return appointment
    }
    fun updateStatus(appointment: Appointment, newStatus: AppointmentStatus) : Appointment {
        appointment.status = newStatus
        return appointment
    }

    fun getByPatientId(pId: Long): List<Appointment> {
        return Appointment.find { AppointmentTable.patientId eq pId }.toList()
    }
}