package com.chzfakevox.backend.admin

import com.chzfakevox.backend.selfReg.SelfRegModel
import com.chzfakevox.backend.selfReg.SelfRegRepository
import com.chzfakevox.backend.user.UserRepository
import com.chzfakevox.backend.util.tx
import com.chzfakevox.backend.util.unprocessable
import org.springframework.stereotype.Service


@Service
class AdminService (
    private val selfRegRepository: SelfRegRepository,
    private val userRepository: UserRepository
){
    private fun toModel(){}
    fun approveReg(patientId: Long): SelfRegModel = tx{
        val formItem = selfRegRepository.findByPatientId(patientId)
            ?: unprocessable("Form not found")
        selfRegRepository.approveItem(formItem)
        userRepository.validPatient(patientId)
        SelfRegModel.fromModel(formItem)
    }

    fun getUnapprovedSelfReg(): List<SelfRegModel> = tx{
        selfRegRepository.findUnapproved().map { SelfRegModel.fromModel(it) }
    }

    fun rejectReg(pId: Long): Any =tx {
        selfRegRepository.rejectItem(pId)
    }


}