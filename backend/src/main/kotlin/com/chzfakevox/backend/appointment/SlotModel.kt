package com.chzfakevox.backend.appointment

data class SlotUpdateRequest (
    val bookedByPID: Long,
    val status: SlotStatus,
)

data class SlotModel(
    val id: Long,
    val gpId: Long,
    val date: String,
    val dayOfWeek: String,
    val time: String,
    val status: SlotStatus,
    val bookedById: Long?
){
    companion object{
        fun fromModel(slot: Slot): SlotModel = SlotModel(
            id = slot.id.value,
            gpId = slot.gpId,
            date = slot.date.toString(),
            dayOfWeek = slot.day_of_week.name,
            time = slot.time,
            status = slot.status,
            bookedById = slot.booked_by_id
        )
    }
}
