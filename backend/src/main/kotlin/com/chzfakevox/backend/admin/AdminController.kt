package com.chzfakevox.backend.admin

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.body
import org.springframework.web.servlet.function.router
@Configuration(proxyBeanMethods = false)
class AdminController {
    @Bean
    fun useRouter(service: AdminService) = router {
        PATCH("/admin/approve-reg/{id}") {
            val id = it.pathVariable("id").toLong()
            val payload = it.body<ApproveRegRequest>()
            val model = service.approveReg(id)
            ok().body(model)
        }
    }
}