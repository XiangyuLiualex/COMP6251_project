package com.chzfakevox.backend.user

data class RegisterRequest(
    val email: String, val password: String,
    val firstName: String, val lastName: String)

data class LoginRequest(val email: String, val password: String)
data class UserModel(
    val id : Long,
    val email: String,
    val role: UserRole,
    val token: String,
    val name: String
) {
    companion object{
        fun fromModel(userName:String,user: User,token:String): UserModel = UserModel(
            id = user.id.value,
            email = user.email,
            role = user.role,
            token = token,
            name = userName
        )
    }
}
data class UserResponse(val user: UserModel)
data class UserCheckModel(
    val patientId : Long,
    val ifPatientValid : Boolean,
)