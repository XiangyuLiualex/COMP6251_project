package com.chzfakevox.backend.user

import com.chzfakevox.backend.config.credential
import com.chzfakevox.backend.selfReg.SelfRegisterRequest
import com.chzfakevox.backend.util.unauthorized
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.function.body
import org.springframework.web.servlet.function.router

@Configuration(proxyBeanMethods = false)
class UserRouterConfiguration {

    @Bean
    fun userRouter(service: UserService) = router {
        GET("/user/{id}") {
            val id = it.pathVariable("id").toLong()
            val userModel = service.getUser(id)
            ok().body(userModel)
        }
        POST("/signup") {
            val payload = it.body<RegisterRequest>()
            if(payload.email.isBlank() || payload.password.isBlank()){
                unauthorized("email or password cannot be empty")
            }
            val model = service.createUser(payload, UserRole.PATIENT)
            ok().body(model)
        }
        POST("/login") {
            req->
            val payload = req.body<LoginRequest>()
            val model = service.login(payload)
            ok().body(model)
        }
        POST("/patient/self-reg"){
//            val userId = it.userId()?.toLong()
            val payload = it.body<SelfRegisterRequest>()
//            if(userId != payload.patientId){
//                unauthorized("not your token")
//            }
            val model = service.selfRegister(payload)
            ok().body(model)
        }

        PATCH("/profile/{id}"){
            // todo only update id= tokenId
            val id = it.pathVariable("id").toLong()
            val payload = it.body<ProfileModel>()
            val model = service.updateProfile(payload,id)
            ok().body(model)
        }
        GET("/profile"){
            // todo only update id= tokenId
            val uId = it.param("userId").orElse("0").toLong()
            val model = service.getProfile(uId)
            ok().body(model)
        }
        POST("/profile"){
            ok().body("profile should be created by default, use PATCH to update profile")
        }
        GET("/patient/guest-check/{id}"){
            val id = it.pathVariable("id").toLong()
            val model = service.getGuestCheck(id)
            ok().body(model)
        }
        POST("/patient/delete-account"){
            val id = it.credential()?.id?:unauthorized("not your token")
            val numRecords = service.deleteAccount(id)
            ok().body("deleted $numRecords medical records")
        }

    }
}

