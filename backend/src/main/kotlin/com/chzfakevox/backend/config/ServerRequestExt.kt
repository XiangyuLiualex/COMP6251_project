package com.chzfakevox.backend.config

import com.auth0.jwt.exceptions.JWTVerificationException
import com.chzfakevox.backend.user.UserRole
import com.chzfakevox.backend.util.Jwt
import com.chzfakevox.backend.util.unauthorized
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.google.gson.Gson
import org.springframework.beans.factory.getBean
import org.springframework.boot.json.GsonJsonParser
import org.springframework.http.HttpHeaders
import org.springframework.web.context.WebApplicationContext
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.support.RequestContextUtils

fun ServerRequest.context(): WebApplicationContext {
    return RequestContextUtils.findWebApplicationContext(this.servletRequest())!!
}
fun ServerRequest.credential(): UserCredentials? {
    val token = token() ?: unauthorized("Token not found")
    val jwt = context().getBean<Jwt>()
    val mapper = jacksonObjectMapper()
    val gson = Gson()

    try {
        val str = jwt.decodeToken(token)
        val userCredentials = gson.fromJson(str, UserCredentials::class.java)
        return userCredentials

    } catch (e: JWTVerificationException) {
        unauthorized(e.message)
    }
}

fun ServerRequest.token(): String? {
    return headers()
        .header(HttpHeaders.AUTHORIZATION)
        .getOrNull(0)
        ?.takeIf { it.startsWith("Bearer ", true) }
        ?.substring("Bearer ".length)
}



data class UserCredentials(val id: Long, val role: UserRole)