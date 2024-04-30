package com.chzfakevox.backend.user

import org.springframework.stereotype.Repository

@Repository
class SelfRegRepository {
    fun saveSelfReg(payload: SelfRegisterRequest) {
        SelfReg.new {
            status = SelfStatus.PENDING
            form = payload.formData
            patientId = payload.patientId
        }

    }

}
