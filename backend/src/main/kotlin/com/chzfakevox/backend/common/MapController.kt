package com.chzfakevox.backend.common

import com.chzfakevox.backend.medical.MedicalService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.router


@Configuration(proxyBeanMethods = false)
class MapController {
    @Bean
    fun MapRouter(service: MapService) = router {
        GET("/pharmacies"){
            val latitude = it.param("latitude").orElse("0").toDouble()
            val longitude = it.param("longitude").orElse("0").toDouble()
            val model = service.getPharmacies()
            ok().body(model)
        }

    }
}
