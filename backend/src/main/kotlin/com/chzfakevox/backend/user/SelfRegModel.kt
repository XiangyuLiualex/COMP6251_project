package com.chzfakevox.backend.user

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
    val status: String
){
    companion object{
        fun fromModel(selfReg: SelfReg): SelfRegModel = SelfRegModel(
                id= selfReg.id.value,
                patientId = selfReg.patientId,
                status = selfReg.status
            )

    }

}