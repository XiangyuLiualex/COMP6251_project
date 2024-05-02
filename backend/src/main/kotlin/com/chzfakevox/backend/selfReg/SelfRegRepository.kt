package com.chzfakevox.backend.selfReg

import org.springframework.stereotype.Repository

@Repository
class SelfRegRepository {
    fun findByPatientId(id: Long): SelfReg? {
        return SelfReg.find { SelfRegTable.patientId eq id }.firstOrNull()
    }
    fun saveSelfReg(payload: SelfRegisterRequest) {
        SelfReg.new {
            status = SelfStatus.PENDING
            form = payload.formData
            patientId = payload.patientId
            createDateTime = payload.createDateTimeString
        }

    }

    fun approveItem(item: SelfReg) {
        item.status = SelfStatus.APPROVED
    }

    fun findUnapproved(): List<SelfReg> {
        return SelfReg.find { SelfRegTable.status eq SelfStatus.PENDING }.toList()
    }


}
