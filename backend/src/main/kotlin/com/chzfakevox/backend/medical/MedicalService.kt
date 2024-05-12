package com.chzfakevox.backend.medical

import com.chzfakevox.backend.appointment.*
import com.chzfakevox.backend.common.NotificationModel
import com.chzfakevox.backend.common.NotificationRepository
import com.chzfakevox.backend.user.GpModel
import com.chzfakevox.backend.user.UserRepository
import com.chzfakevox.backend.util.tx
import com.chzfakevox.backend.util.unprocessable
import org.springframework.stereotype.Service

@Service
class MedicalService (
    private val repository: SlotRepository,
    private val appointmentRepository: AppointmentRepository,
    private val userRepository: UserRepository,
    private val medicalHistoryRepository: MedicalHistoryRepository,
    private val medicalRepository : MedicalRepository,
    private val notificationRepository: NotificationRepository
){
    private fun toAppointmentModel(appointment: Appointment, slot: Slot, gp:GP): AppointmentModel {
        return AppointmentModel(
            id = appointment.id.value,
            patientId = appointment.patientId.value,
            gpId = appointment.gpId.value,
            slotId = appointment.slotId.value,
            gpName = gp.name,
            time = slot.time,
            date = slot.date,
            reason = appointment.reason?:"",
            status = appointment.status
        )
    }

    fun getThisMonthSlots() : List<SlotModel> = tx{
//        repository.getSlots(SlotType.THIS_MONTH)?.let { it.map {  } }
//            ?: unprocessable("No slots found")
        repository.getSlots(SlotType.THIS_MONTH)?.map { SlotModel.fromModel(it) }
            ?: unprocessable("No slots found")
    }
    fun getThisWeekSlots() : List<SlotModel> = tx{
        repository.getSlots(SlotType.THIS_WEEK)?.map { SlotModel.fromModel(it) }
            ?: unprocessable("No slots found")
    }
    fun bookSlot(payload: SlotUpdateRequest, id: Long) : SlotModel = tx{
        val slot = repository.bookSlot(payload, id)
        SlotModel.fromModel(slot)
    }

    fun createAppointment(payload: CreateAppointmentRequest) :AppointmentModel = tx {
        // 1. update slot status
        repository.bookSlot(SlotUpdateRequest(payload.patientId, SlotStatus.hold),payload.slotId )

        // 2. create appointment
        val patient = userRepository.getUserById(payload.patientId)
        val gpExt = userRepository.getGpextByUserId(payload.gpId)?: unprocessable("GP not found")
        val slot = repository.getSlotById(payload.slotId)?:unprocessable("Slot not found")
        val appointment = appointmentRepository.createAppointment(
            inputPatientId = patient.id,
            inputSlotId = slot.id,
            inputGpId = gpExt.gpId,
            inputReason = payload.reason
        )
        toAppointmentModel(appointment,slot,gpExt)
    }
    fun getAppointments(gpId:Long): List<AppointmentModel> = tx {
        appointmentRepository.getByGpId(gpId).let {
            it.map {
                val slot = repository.getSlotById(it.slotId.value)?: unprocessable("Slot not found")
                val gp = userRepository.getGpextByUserId(it.gpId.value)?: unprocessable("GP not found")
                toAppointmentModel(it,slot,gp) }
        }
    }
    fun updateAppointment(aId:Long, payload:UpdateAppointmentRequest) :AppointmentModel = tx{
        val appointment = appointmentRepository.getById(aId)

        // case A slot id not changed and status changed
        // update status only
//        if( payload.status!=null){
        if(payload.slotId == appointment.slotId.value && payload.status!=null){
            updateAppointmentStatus(aId,payload.status)
        }else if(payload.slotId!=null){
            updateAppointmentAll(aId,payload)
        }else{
            unprocessable("Invalid request")
        }
    }
    private fun updateAppointmentAll(aId:Long, payload:UpdateAppointmentRequest) :AppointmentModel = tx{
        // case B slot id changed
        // 1. unbook the original slot
        // 2. book the new slot
        // 3. get new gpExt
        // 3. update the appointment

        val appointment = appointmentRepository.getById(aId)
        val oldSlot= repository.getSlotById(appointment.slotId.value)?:
            unprocessable("Slot not found")
        val patient = oldSlot.booked_by_id?.let { userRepository.getUserById(it) }?:
            unprocessable("Patient not found")

        repository.unBookSlot(appointment.slotId.value)

        if(payload.slotId == null) unprocessable("Invalid request")
        val newSlot = repository.bookSlot(
            SlotUpdateRequest(patient.id.value, SlotStatus.hold)
            ,payload.slotId)

        val newGp = userRepository.getGpextByUserId(newSlot.gpId)?: unprocessable("GP not found")

        appointmentRepository.updateAppointment(appointment, newSlot.id, newGp.id)
        toAppointmentModel(appointment,newSlot,newGp)

    }
    private fun updateAppointmentStatus(aId:Long, status:AppointmentStatus) :AppointmentModel = tx {
        val appointment = appointmentRepository.getById(aId)
        val newApp =appointmentRepository.updateStatus(appointment,status)
        val slot = repository.getSlotById(newApp.slotId.value)?: unprocessable("Slot not found")
        val gp = userRepository.getGpextByUserId(newApp.gpId.value)?: unprocessable("GP not found")
        toAppointmentModel(newApp,slot,gp)
    }

    fun saveMedicalRecords(payload: List<MedicalRecord>) :Int  = tx {
         medicalHistoryRepository.saveBatchRecords(payload)
    }

    fun createPrescription(payload: PrescriptionModel): PrescriptionModel = tx {
        val patient = userRepository.getUserById(payload.patientId)?: unprocessable("Patient not found")
        val appointment = appointmentRepository.getById(payload.appointmentId)?: unprocessable("Appointment not found")
        val prescr= medicalRepository.createPrescription(inGpId = appointment.gpId, inPatientID = patient.id, inAppoId = appointment.id ,payload)
        PrescriptionModel.from(prescr)
    }

    fun getPrescriptionByAppointmentId(aId: Long): List<PrescriptionModel> = tx {
        medicalRepository.getPrescriptionByAppointmentId(aId).map { PrescriptionModel.from(it) }
    }

    fun getGps(): List<GpModel > = tx{
        userRepository.getGps().map { GpModel.fromModel(it) }

    }

    fun getMedicalRecords(pId: Long): List<MedicalRecord> = tx {
        medicalHistoryRepository.getMedicalRecords(pId)
    }

    fun createTest(payload: MedicalTestModel): MedicalTestModel = tx{
        val patient = userRepository.getUserById(payload.patientId)?: unprocessable("Patient not found")
        val appointment = appointmentRepository.getById(payload.appointmentId)?: unprocessable("Appointment not found")
        val mt=medicalRepository.createTest(pId = patient.id, aId = appointment.id,
            payload = payload
        )
        MedicalTestModel.from(mt)
    }

    fun getAllTests(): List<MedicalTestModel> = tx {
        medicalRepository.getAllTests().map { MedicalTestModel.from(it) }
    }
    fun getTestByPatientId(pId: Long): List<MedicalTestModel> = tx {
        medicalRepository.getTestByPatientId(pId).map { MedicalTestModel.from(it) }
    }

    fun updateTest(tId: Long, payload: MedicalTestUpdateModel): MedicalTestModel = tx {
        if(payload.status == MedicalTestStatus.done){
            val test=medicalRepository.getTestById(tId)?: unprocessable("Test not found")
            notificationRepository.createNotification(
                inMessage = "Your test ${test.name} has been done",
                pid = test.patientId,
            )
        }
        MedicalTestModel.from(medicalRepository.updateTest(tId, payload))
    }

    fun getUndoTestByUserId(uId: Long): List<MedicalTestModel> = tx {
        medicalRepository.getUndoTestByUserId(uId).map { MedicalTestModel.from(it) }
    }

    fun getAppointmentsByPatientId(pId: Long): List<AppointmentModel> = tx {
        appointmentRepository.getByPatientId(pId).map {
            val slot = repository.getSlotById(it.slotId.value) ?: unprocessable("Slot not found")
            val gp = userRepository.getGpextByUserId(it.gpId.value) ?: unprocessable("GP not found")
            toAppointmentModel(it, slot, gp)
        }
    }

    fun getNotification(uid: Long): List<NotificationModel> =tx {
        notificationRepository.getUnreadNotification(uid).map { NotificationModel.from(it) }
    }

    fun readNotification(tId: Long): NotificationModel =tx {
        NotificationModel.from(notificationRepository.readNotification(tId))
    }

}
