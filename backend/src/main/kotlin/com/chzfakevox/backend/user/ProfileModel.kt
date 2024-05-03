package com.chzfakevox.backend.user

import com.chzfakevox.backend.appointment.GP
import java.time.LocalDate

data class ProfileModel(
    val id: Long,
    val userId : Long?,
    val name : String?,
    val gender : String?,
    val phoneNum : String?,
    val birthday : LocalDate?,
    val profession: String?,
    val aboutMe : String?,) {
    companion object {
        fun fromModel(profile: Profile): ProfileModel {
            return ProfileModel(
                id = profile.id.value,
                userId = profile.userId.value,
                name = profile.name,
                gender = profile.gender,
                phoneNum = profile.phone,
                birthday = profile.birthday,
                profession = profile.profession,
                aboutMe = profile.aboutMe,)
        }
    }
}

data class GpModel(
    var id: Long,
    var name :String,
    var treatments :String,
    var yearsInPractice :Int,
    var phone: String
){
    companion object {
        fun fromModel(gp: GP): GpModel {
            return GpModel(
                id = gp.gpId.value,
                name = gp.name,
                treatments = gp.treatments,
                yearsInPractice = gp.yearsInPractice,
                phone = gp.phone
            )
        }
    }
}