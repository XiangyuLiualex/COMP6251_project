package com.chzfakevox.backend.appointment

import com.chzfakevox.backend.util.unprocessable
import org.springframework.stereotype.Repository
import java.time.LocalDate


@Repository
class SlotRepository {
    fun getSlotById(id: Long): Slot? {
        return Slot[id]
    }
    fun getSlots(type: SlotType): List<Slot>? {
        val today = LocalDate.now()
        val interval : Long = when {
            SlotType.THIS_MONTH == type -> {
                30
            }

            SlotType.THIS_WEEK ==type -> {
                7
            }

            SlotType.TODAY ==type -> {
                1
            }

            else -> {
                7
            }
        }
        val nextTime = today.plusDays(interval)
        return Slot.find { SlotTable.date.between(today,nextTime) }.toList()
    }

    fun bookSlot(payload: SlotUpdateRequest, slotId:Long) : Slot {
        val slot = Slot.findById(slotId) ?: unprocessable("Slot not found")
        if (slot.status != SlotStatus.open) {
            unprocessable("Slot already booked")
        }
        slot.status = SlotStatus.hold
        slot.booked_by_id = payload.bookedByPID
        return slot
    }

    fun unBookSlot(slotId: Long): Slot {
        val slot = Slot.findById(slotId) ?: unprocessable("Slot not found")
        if (slot.status != SlotStatus.hold) {
            unprocessable("Slot not booked")
        }
        slot.status = SlotStatus.open
        return slot
    }
}

enum class SlotType {
    TODAY,
    THIS_WEEK,
    THIS_MONTH,
    ALL
}