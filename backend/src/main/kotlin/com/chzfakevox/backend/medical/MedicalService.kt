package com.chzfakevox.backend.medical

import com.chzfakevox.backend.util.tx
import com.chzfakevox.backend.util.unprocessable
import org.springframework.stereotype.Service

@Service
class MedicalService (
    private val repository: SlotRepository
){

    fun getThisMonthSlots() : List<SlotModel> = tx{
//        repository.getSlots(SlotType.THIS_MONTH)?.let { it.map {  } }
//            ?: unprocessable("No slots found")
        repository.getSlots(SlotType.THIS_MONTH)?.map { SlotModel.fromModel(it) }
            ?: unprocessable("No slots found")
    }
    fun bookSlot(id: Long) :SlotModel = tx{
        val slot = repository.bookSlot(id)
        SlotModel.fromModel(slot)
    }
}