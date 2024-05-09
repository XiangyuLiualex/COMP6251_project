package com.chzfakevox.backend.medical

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.and
import org.springframework.stereotype.Repository
import java.time.LocalDate

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

    fun createTest(pId:EntityID<Long>,
                   aId:EntityID<Long>,payload: MedicalTestModel): MedicalTest {
        return MedicalTest.new {
            patientId = pId
            appointmentId = aId
            name = payload.name
            time = payload.time
            description = payload.description
            status = payload.status
            date = LocalDate.parse(payload.date)
        }
    }

    fun getAllTests(): List<MedicalTest> {
        return MedicalTest.all().toList()
    }

    fun getTestByPatientId(pId: Long): List<MedicalTest> {
        return MedicalTest.find { MedicalTestTable.patientId eq pId }.toList()
    }
    fun updateTest(tId: Long, payload: MedicalTestUpdateModel): MedicalTest {
        val test = MedicalTest[tId]
        payload.name?.let { test.name = it }
        payload.date?.let { test.date = LocalDate.parse(it) }
        payload.time?.let { test.time = it }
        payload.description?.let { test.description = it }
        payload.result?.let { test.result = it }
        payload.status?.let { test.status = it }

        return test
    }

    fun getUndoTestByUserId(uId: Long): List<MedicalTest> {
        return MedicalTest.find { (MedicalTestTable.patientId eq uId) and (MedicalTestTable.status eq MedicalTestStatus.undo) }.toList()

    }

    fun getTestById(tId: Long): MedicalTest {
        return MedicalTest[tId]
    }

//    fun userCheckTest(tId: Long): MedicalTest? {
//        val test = MedicalTest[tId]
//        test.status = MedicalTestStatus.done
//        return test
//    }
}