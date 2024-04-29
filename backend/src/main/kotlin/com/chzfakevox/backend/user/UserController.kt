package com.chzfakevox.backend.user

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.router

@Configuration(proxyBeanMethods = false)
class UserRouterConfiguration {

    @Bean
    fun userRouter(service: UserService) = router {
        GET("/hi"){
            ok().body("Hello World!")
        }
        GET("/user/{id}") {
            val id = it.pathVariable("id").toLong()
            val userModel = service.getUser(id)
            ok().body(userModel)
        }
//        POST("/users/login") {
//            val payload = it.body < LoginRequest > ().user
//            val model = service.login(payload)
//            ok().body(UserResponse(model))
//        }
    }
}