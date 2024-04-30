package com.chzfakevox.backend.config

import com.chzfakevox.backend.util.Jwt
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration(proxyBeanMethods = false)
class WebConfig {
    @Bean
    fun jwt(@Value("\${chzfakevox.jwt.key}") key: String) = Jwt(key)
}