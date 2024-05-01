package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.unprocessable
import org.springframework.stereotype.Repository


@Repository
class ProfileRepository {
    companion object {
        fun updateProfile(payload: ProfileModel, id: Long): Profile {
            val prof = Profile.findById(id) ?: unprocessable("Profile not found")
            payload.name?.let { prof.name = it }
            payload.gender?.let{prof.gender = it}
            payload.phone?.let{prof.phone = it}
            payload.birthday?.let{prof.birthday = it}
            payload.profession?.let{prof.profession = it}
            payload.aboutMe?.let{prof.aboutMe = it}
            return prof
        }

        fun getProfile(id: Long): Profile {
            return Profile.findById(id) ?: unprocessable("Profile not found")
        }
    }
}