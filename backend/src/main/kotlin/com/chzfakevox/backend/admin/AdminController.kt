package com.chzfakevox.backend.admin

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.body
import org.springframework.web.servlet.function.router
@Configuration(proxyBeanMethods = false)
class AdminController {
    @Bean
    fun useRouter(service: AdminService) = router {
        PATCH("/admin/approve/{id}") {
            val pId = it.pathVariable("id").toLong()
            val payload = it.body<ApproveRegRequest>()
            val model = service.approveReg(pId)

            ok().body(model)
        }
        GET("/admin/approvals"){
            val model = service.getUnapprovedSelfReg()
            ok().body(model)
        }
    }
}