package com.chzfakevox.backend.user

import org.springframework.stereotype.Repository


@Repository
class UserRepository {
    fun getUserById(id: Long): User {
        return User[id]
    }
}
