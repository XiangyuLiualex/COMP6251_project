package com.chzfakevox.backend.medical

import com.chzfakevox.backend.appointment.CreateAppointmentRequest
import com.chzfakevox.backend.appointment.SlotUpdateRequest
import com.chzfakevox.backend.appointment.UpdateAppointmentRequest
import com.chzfakevox.backend.config.credential
import com.chzfakevox.backend.util.unauthorized
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
        GET("/gpss"){
            // all slots get
            val model = service.getGps()
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
            if(it.param("gpId").isPresent){
                val gpId = it.param("gpId").orElse("0").toLong()
                val model = service.getAppointments(gpId)
                ok().body(model)}
            else if (it.param("patientId").isPresent){
                val pId = it.param("patientId").orElse("0").toLong()
                val model = service.getAppointmentsByPatientId(pId)
                ok().body(model)
            }
            else{
                ok().body("No parameter found")
            }
//            val gpId = it.param("gpId").orElse("0").toLong()
//            val model = service.getAppointments(gpId)
//            ok().body(model)
        }
//        GET("/appointment"){
//            val pId = it.param("patientId").orElse("0").toLong()
//            val model = service.getAppointmentsByPatientId(pId)
//            ok().body(model)
//        }
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
        GET("/medical-history"){
            val pId = it.param("patientId").orElse("0").toLong()
            val model = service.getMedicalRecords(pId)
            ok().body(model)
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

        POST("/test"){
            val payload = it.body<MedicalTestModel>()
            val model = service.createTest(payload)
            ok().body(model)
        }
        GET("/test"){
            //get all tests
            val model = service.getAllTests()
            ok().body(model)

        }
        GET("/test"){
            val pId = it.param("patientId").orElse("0").toLong()
            val model = service.getTestByPatientId(pId)
            ok().body(model)
        }
        PATCH("/test/{id}"){
            val tId = it.pathVariable("id").toLong()
            val payload = it.body<MedicalTestUpdateModel>()
            val model = service.updateTest(tId,payload)
            ok().body(model)
        }

        GET("/test/notification"){
            // get if any tests notification and unread
            val payload = it.credential()?: unauthorized("User not found")
            val model  = service.getUndoTestByUserId(payload.id)
            ok().body(model)
        }
        GET("/notification"){
            // get if any tests notification and unread
            val payload = it.credential()?: unauthorized("User not found")
            val model  = service.getNotification(payload.id)
            ok().body(model)
        }

        PATCH("/notification/{id}"){
            // check the notification
            val tId = it.pathVariable("id").toLong()
            val model = service.readNotification(tId)
            ok().body("")
        }


    }
}