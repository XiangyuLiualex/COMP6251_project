package com.chzfakevox.backend.config

import com.auth0.jwt.exceptions.JWTVerificationException
import com.chzfakevox.backend.util.Jwt
import com.chzfakevox.backend.util.unauthorized
import org.springframework.beans.factory.getBean
import org.springframework.http.HttpHeaders
import org.springframework.web.context.WebApplicationContext
import org.springframework.web.servlet.function.ServerRequest
import org.springframework.web.servlet.support.RequestContextUtils

fun ServerRequest.context(): WebApplicationContext {
    return RequestContextUtils.findWebApplicationContext(this.servletRequest())!!
}
fun ServerRequest.userId(): String? {
    val token = token() ?: unauthorized("Token not found")
    val jwt = context().getBean<Jwt>()

    try {
        return jwt.decodeToken(token)
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

