package com.chzfakevox.backend.medical

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
            val model = service.bookSlot(sId)
            ok().body(model)
        }

    }
}