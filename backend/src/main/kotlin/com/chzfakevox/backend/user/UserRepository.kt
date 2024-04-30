package com.chzfakevox.backend.user

import org.springframework.stereotype.Repository


@Repository
class UserRepository {
    fun getUserById(id: Long): User {
        return User[id]
    }

    fun createUser(payload: RegisterRequest,theRole:UserRole): User {
        val u = User.new {
            email = payload.email
            password = payload.password
            role = theRole.name
        }
        val p = Profile.new {
            userId = u.id
            name = payload.firstName + " " + payload.lastName
        }
        return u
    }

    fun findByEmail(email: String): User? {
        return User.find { UserTable.email eq email }.firstOrNull()
    }
}
