package com.chzfakevox.backend.appointment

import java.time.LocalDate

data class AppointmentModel (
    val id : Long,
    val patientId: Long,
    val gpId: Long,
    val slotId : Long,
    val gpName: String,
    val time : String,
    val date : LocalDate,
    val reason: String,
    val status: AppointmentStatus
)
data class UpdateAppointmentRequest(
    val gpId: Long?,
    val slotId: Long?,
    val gpName: String?,
    val time: String?,
    val date: LocalDate?,
    val status: AppointmentStatus?,
)

data class CreateAppointmentRequest(
    val patientId : Long,
    val gpId :Long,
    val slotId :Long,
    val gpName : String,
    val time : String ,
    val date : LocalDate,
    val reason : String,
    val status: AppointmentStatus
)