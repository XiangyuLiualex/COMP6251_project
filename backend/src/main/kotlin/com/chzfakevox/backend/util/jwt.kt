package com.chzfakevox.backend.util

import com.chzfakevox.backend.user.User
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.time.Instant
import kotlin.time.Duration
import kotlin.time.Duration.Companion.days
import kotlin.time.toJavaDuration

class Jwt(secret: String, private val expiration: Duration = 30.days) {

    private val algorithm = Algorithm.HMAC256(secret)

    private val verifier = JWT.require(algorithm).build()

    /**
     * Returns a token with [userId] as subject.
     * The token will expire in [expiration].
     */
    fun generateToken(user: User, expiration: Duration = this.expiration): String {
        val body = mapOf(
            "id" to user.id,
            "role" to user.role
        )
        return JWT.create()
            .withSubject(body.toString())
            .withExpiresAt(Instant.now() + expiration.toJavaDuration())
            .sign(algorithm)
    }

    /**
     * Returns the user id in [token].
     *
     * @throws JWTVerificationException if [token] is invalid
     */
    fun decodeToken(token: String): String {
        return verifier.verify(token).subject
    }
}