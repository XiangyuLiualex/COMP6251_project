package com.chzfakevox.backend.user

import com.chzfakevox.backend.appointment.GP
import com.chzfakevox.backend.appointment.gpExtension
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
            role = theRole
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

    fun getGpextByUserId(id: Long): GP? {
        return GP.find { gpExtension.gpId eq id }.firstOrNull()
    }

    fun getGps(): List<GP> {
        return GP.all().toList()
    }

    fun deleteUser(id: Long) {
        User.findById(id)?.delete()
    }
    fun validPatient(id:Long) {
        val user = User[id]
        user.ifPatientValid = true
    }
}
