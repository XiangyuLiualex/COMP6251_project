package com.chzfakevox.backend.user

import org.jetbrains.exposed.dao.id.EntityID
import java.time.LocalDate
import java.util.*

data class ProfileModel(
    val userId : Long?,
    val name : String?,
    val gender : String?,
    val phone : String?,
    val birthday : LocalDate?,
    val profession: String?,
    val aboutMe : String?,) {
    companion object {
        fun fromModel(profile: Profile): ProfileModel {
            return ProfileModel(
                userId = profile.userId.value,
                name = profile.name,
                gender = profile.gender,
                phone = profile.phone,
                birthday = profile.birthday,
                profession = profile.profession,
                aboutMe = profile.aboutMe,)
        }
    }
}