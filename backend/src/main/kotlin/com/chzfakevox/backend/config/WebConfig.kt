package com.chzfakevox.backend.config

import com.chzfakevox.backend.util.Jwt
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration(proxyBeanMethods = false)
class WebConfig {
    @Bean
    fun corsFilter(): CorsFilter {
        val config = CorsConfiguration().apply {
            allowedOriginPatterns = listOf(CorsConfiguration.ALL)
            allowedMethods = listOf(CorsConfiguration.ALL)
            allowedHeaders = listOf(CorsConfiguration.ALL)
            allowCredentials = false
        }

        val source = UrlBasedCorsConfigurationSource()
            .apply { registerCorsConfiguration("/**", config) }

        return CorsFilter(source)
    }
    @Bean
    fun jwt(@Value("\${chzfakevox.jwt.key}") key: String) = Jwt(key)
}