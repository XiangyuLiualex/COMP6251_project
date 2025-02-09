package com.chzfakevox.backend.user

import com.chzfakevox.backend.medical.MedicalHistoryRepository
import com.chzfakevox.backend.selfReg.SelfRegRepository
import com.chzfakevox.backend.selfReg.SelfRegisterRequest
import com.chzfakevox.backend.util.Jwt
import com.chzfakevox.backend.util.PasswordEncoder
import com.chzfakevox.backend.util.tx
import com.chzfakevox.backend.util.unprocessable
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val selfRegRepository: SelfRegRepository,
    private val medicalHistoryRepository: MedicalHistoryRepository,
    private val profileRepository: ProfileRepository,
    private val jwt: Jwt
) {
    private fun toModel(user: User): UserModel {

        val userName = profileRepository.getProfileByUid(user.id.value)?.name ?: "Unknown"
        return UserModel.fromModel(userName,user,jwt.generateToken(user))
    }
    private fun toProfileModel(profile : Profile): ProfileModel{
        return ProfileModel.fromModel(profile)
    }

    fun getUser(id: Long): UserModel = tx {
        val user =userRepository.getUserById(id)
        toModel(user)
    }
    fun createUser(userRequest: RegisterRequest,role:UserRole): UserModel = tx {
        userRepository.findByEmail(userRequest.email)?.let {
            unprocessable("Email already exists") }
        val userToSave = userRequest.copy(password = PasswordEncoder.encode(userRequest.password))
        val user = userRepository.createUser(userToSave,role)
        toModel(user)
    }

    fun login(payload: LoginRequest): UserModel = tx {
        val user = userRepository.findByEmail(payload.email)
            ?.takeIf { PasswordEncoder.matches(payload.password, it.password) }
//            ?.takeIf { payload.password == it.password }
            ?: unprocessable("Email or password is invalid")
        toModel(user)
    }

    fun selfRegister(payload: SelfRegisterRequest): UserModel = tx {
        selfRegRepository.saveSelfReg(payload)
        val user = userRepository.getUserById(payload.patientId)
        medicalHistoryRepository.saveBatchRecords(payload.formData)
        toModel(user)
    }

    fun updateProfile(payload: ProfileModel,id:Long): ProfileModel = tx{
        toProfileModel(profileRepository.updateProfile(payload,id))
    }

    fun getProfile(uId: Long): ProfileModel = tx {
        val uid = userRepository.getUserById(uId).id
        profileRepository.getProfileByUid(uId)?.let{
            toProfileModel(it)
        } ?: toProfileModel(profileRepository.createProfile(uid))
    }
    fun getGuestCheck(id: Long) = tx {
        val user = userRepository.getUserById(id)
        val res = UserCheckModel(user.id.value,user.ifPatientValid)
        if(user.role == UserRole.PATIENT){
            res
        }else{
            unprocessable("Not a patient")
        }

    }

    fun deleteAccount(id: Long): Any {
        return tx {
            userRepository.deleteUser(id)
            val deleteRecords = medicalHistoryRepository.deleteRecordsByPatientId(id)
            profileRepository.deleteProfileByUid(id)
            selfRegRepository.deleteSelfRegByPatientId(id)
            deleteRecords
        }
    }

}