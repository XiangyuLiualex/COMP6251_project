package com.chzfakevox.backend.medical

import org.apache.logging.log4j.util.StringMap


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

data class MedicalTestModel(
    val id: Long?,
    val patientId: Long,
    val testerId: Long?,
    val appointmentId: Long,
    val name: String,
    val date: String,
    val time: String,
    val description: String,
    val result: String?,
    val status: MedicalTestStatus
){
    companion object {
        fun from(medicalTest: MedicalTest) = MedicalTestModel(
            id= medicalTest.id.value,
            patientId = medicalTest.patientId.value,
            testerId = medicalTest.testerId?.value,
            appointmentId = medicalTest.appointmentId.value,
            name = medicalTest.name,
            date = medicalTest.date.toString(),
            time = medicalTest.time,
            description = medicalTest.description,
            result = medicalTest.result,
            status = medicalTest.status
        )
    }
}

data class MedicalTestUpdateModel(
    val id: Long,
    val patientId: Long?,
    val testerId: Long?,
    val appointmentId: Long?,
    val name: String?,
    val date: String?,
    val time: String?,
    val description: String?,
    val result: String?,
    val status: MedicalTestStatus?
)