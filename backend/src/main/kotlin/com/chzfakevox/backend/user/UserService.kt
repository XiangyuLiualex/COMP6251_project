package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.tx
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun getUser(id: Long): UserModel = tx {
        val user =userRepository.getUserById(id)
        toModel(user)
    }

    private fun toModel(user: User): UserModel {
        return UserModel.fromModel(user)
    }
}