package com.chzfakevox.backend.medical

import com.chzfakevox.backend.appointment.CreateAppointmentRequest
import com.chzfakevox.backend.appointment.SlotUpdateRequest
import com.chzfakevox.backend.appointment.UpdateAppointmentRequest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.body
import org.springframework.web.servlet.function.router


@Configuration(proxyBeanMethods = false)
class MedicalController {
    @Bean
    fun medicalRouter(service:MedicalService) = router{

        GET("/slots"){
            // all slots get
            val model = service.getThisMonthSlots()
            ok().body(model)
        }
        PATCH("/slots/{id}"){
            val sId = it.pathVariable("id").toLong()
            val payload = it.body<SlotUpdateRequest>()
            val model = service.bookSlot(payload,sId)
            ok().body(model)
        }
        POST("/appointment"){
            val payload = it.body<CreateAppointmentRequest>()
            val model = service.createAppointment(payload)
            ok().body(model)
        }
        GET("/appointment"){
            val gpId = it.param("gpId").orElse("0").toLong()
            val model = service.getAppointments(gpId)
            ok().body(model)
        }
        PATCH("/appointment/{id}"){
            val aId = it.pathVariable("id").toLong()
            val payload = it.body<UpdateAppointmentRequest>()
            val model = service.updateAppointment(aId,payload)
            ok().body(model)
        }
        POST("/medical-history"){
            val payload = it.body<List<MedicalRecord>>()
            val count = service.saveMedicalRecords(payload)
            val res = "$count records has been saved"
            ok().body(res)
        }

        GET("/prescription"){
            val appoId = it.param("appointmentId").orElse("0").toLong()
            val model = service.getPrescriptionByAppointmentId(appoId)
            ok().body(model)
        }

        POST("/prescription"){
            val payload = it.body<PrescriptionModel>()
            val model = service.createPrescription(payload)
            ok().body(model)
        }


    }
}