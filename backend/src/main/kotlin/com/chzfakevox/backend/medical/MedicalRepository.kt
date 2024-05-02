package com.chzfakevox.backend.medical

import org.jetbrains.exposed.dao.id.EntityID
import org.springframework.stereotype.Repository

@Repository
class MedicalRepository {
    fun createPrescription(inGpId :EntityID<Long>,inPatientID: EntityID<Long>,inAppoId:EntityID<Long>,payload: PrescriptionModel) : Prescription {
        return Prescription.new {
            gpId = inGpId
            patientId = inPatientID
            appointmentId = inAppoId
            medicationInstruction = payload.medicationInstruction
            medicationName = payload.medicationName
            quantity = payload.quantity
        }
    }

    fun getPrescriptionByAppointmentId(aId: Long): List<Prescription> {
        return Prescription.find { PrescriptionTable.appointmentId eq aId }.toList()
    }


}