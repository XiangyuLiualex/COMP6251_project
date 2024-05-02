package com.chzfakevox.backend.selfReg

import com.chzfakevox.backend.medical.MedicalRecord

data class SelfRegisterRequest(
    val patientId: Long,
    val createDateTimeString: String,
    val formData: List<MedicalRecord>,
    val status: String
)

data class SelfRegModel(
    val id: Long,
    val patientId: Long,
    val createDateTimeString: String,
    val status: String,
    val formData: List<MedicalRecord>
){
    companion object{
        fun fromModel(selfReg: SelfReg): SelfRegModel = SelfRegModel(
                id= selfReg.id.value,
                patientId = selfReg.patientId,
                status = selfReg.status.name,
                createDateTimeString = selfReg.createDateTime,
                formData = selfReg.form
            )

    }

}
