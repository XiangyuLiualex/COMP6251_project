package com.chzfakevox.backend.util

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

fun unauthorized(message :String?): Nothing{
    throw ResponseStatusException(HttpStatus.UNAUTHORIZED, message)
}

fun unprocessable(message : String ): Nothing{
    throw ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,message)
}

