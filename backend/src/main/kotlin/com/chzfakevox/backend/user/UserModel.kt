package com.chzfakevox.backend.user

data class UserModel(
    val id : Long,
    val email: String,
) {
    companion object{
        fun fromModel(user: User): UserModel = UserModel(
            id = user.id.value,
            email = user.email,
        )
    }
}