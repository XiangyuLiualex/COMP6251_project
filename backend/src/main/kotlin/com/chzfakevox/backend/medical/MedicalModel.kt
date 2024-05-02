package com.chzfakevox.backend.medical


data class PrescriptionModel(
    val id: Long?,
    val patientId: Long,
    val appointmentId: Long,
    val medicationName: String,
    val medicationInstruction: String,
    val quantity: Int
){
    companion object {
        fun from(prescription: Prescription) = PrescriptionModel(
            prescription.id.value,
            prescription.patientId.value,
            prescription.appointmentId.value,
            prescription.medicationName,
            prescription.medicationInstruction,
            prescription.quantity
        )
    }
}
