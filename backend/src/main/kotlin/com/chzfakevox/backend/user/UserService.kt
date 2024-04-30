package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.Jwt
import com.chzfakevox.backend.util.PasswordEncoder
import com.chzfakevox.backend.util.tx
import com.chzfakevox.backend.util.unprocessable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class UserService(
    private val userRepository: UserRepository,
    private val selfRegRepository: SelfRegRepository,
    private val jwt: Jwt
) {
    private fun toModel(user: User): UserModel {
        return UserModel.fromModel(user,jwt.generateToken(user))
    }

    fun getUser(id: Long): UserModel = tx {
        val user =userRepository.getUserById(id)
        toModel(user)
    }
    fun createUser(userRequest: RegisterRequest,role:UserRole): UserModel = tx {
        //TODO guest pateint new one
        userRepository.findByEmail(userRequest.email)?.let {
            unprocessable("Email already exists") }
        val userToSave = userRequest.copy(password = PasswordEncoder.encode(userRequest.password))
        val user = userRepository.createUser(userToSave,role)
        toModel(user)
    }

    fun login(payload: LoginRequest): UserModel = tx {
        val user = userRepository.findByEmail(payload.email)
            ?.takeIf { PasswordEncoder.matches(payload.password, it.password) }
            ?: unprocessable("Email or password is invalid")
        toModel(user)

    }

    fun selfRegister(payload: SelfRegisterRequest): UserModel = tx {
        selfRegRepository.saveSelfReg(payload)
        val user = userRepository.getUserById(payload.patientId)
        toModel(user)


    }

}