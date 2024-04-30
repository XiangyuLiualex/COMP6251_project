package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.Jwt
import com.chzfakevox.backend.util.PasswordEncoder
import com.chzfakevox.backend.util.tx
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class UserService(
    private val userRepository: UserRepository,
    private val jwt: Jwt
) {
    fun getUser(id: Long): UserModel = tx {
        val user =userRepository.getUserById(id)
        toModel(user)
    }
    fun createUser(userRequest: RegisterRequest,role:UserRole): UserModel = tx {
        userRepository.findByEmail(userRequest.email)?.let {
            throw ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Email already exists") }
        val userToSave = userRequest.copy(password = PasswordEncoder.encode(userRequest.password))
        val user = userRepository.createUser(userToSave,role)
        toModel(user)
    }

    fun login(payload: LoginRequest): UserModel = tx {
        val user = userRepository.findByEmail(payload.email)
            ?.takeIf { PasswordEncoder.matches(payload.password, it.password) }
            ?: throw ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Email or password is invalid")
        toModel(user)

    }
    private fun toModel(user: User): UserModel {
        return UserModel.fromModel(user,jwt.generateToken(user))
    }

}