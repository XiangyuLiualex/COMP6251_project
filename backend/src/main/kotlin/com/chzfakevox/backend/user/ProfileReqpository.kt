package com.chzfakevox.backend.user

import com.chzfakevox.backend.util.unprocessable
import org.jetbrains.exposed.dao.id.EntityID
import org.springframework.stereotype.Repository


@Repository
class ProfileRepository {
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

        fun getProfileByUid(id: Long): Profile? {
            return Profile.find { ProfileTable.userId eq id }.firstOrNull()
        }
        fun createProfile(uId: EntityID<Long>): Profile {
            return Profile.new {
                userId = uId
            }
        }
}