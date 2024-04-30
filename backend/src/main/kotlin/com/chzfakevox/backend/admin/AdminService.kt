package com.chzfakevox.backend.admin

import com.chzfakevox.backend.user.SelfRegModel
import com.chzfakevox.backend.user.SelfRegRepository
import org.springframework.stereotype.Service


@Service
class AdminService (
    private val selfRegRepository: SelfRegRepository
){
    private fun toModel(){}
    fun approveReg(id: Long): SelfRegModel {
        val formItem = selfRegRepository.findById(id).orElseThrow { Exception("SelfReg not found") }
        selfRegRepository.update(formItem.copy(approved = "APPROVED"))
        //TODO guest remove
        return SelfRegModel.fromModel(formItem)
    }


}