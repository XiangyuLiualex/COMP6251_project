package com.chzfakevox.backend.user

data class RegisterRequest(
    val email: String, val password: String,
    val firstName: String, val lastName: String)

data class LoginRequest(val email: String, val password: String)
data class UserModel(
    val id : Long,
    val email: String,
    val role: UserRole,
    val token: String
) {
    companion object{
        fun fromModel(user: User,token:String): UserModel = UserModel(
            id = user.id.value,
            email = user.email,
            role = user.role,
            token = token,
        )
    }
}
data class UserResponse(val user: UserModel)