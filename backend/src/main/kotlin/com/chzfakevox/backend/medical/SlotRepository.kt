package com.chzfakevox.backend.medical

import com.chzfakevox.backend.util.unprocessable
import org.springframework.stereotype.Repository
import java.time.LocalDate


@Repository
class SlotRepository {
    fun getSlots(type: SlotType ): List<Slot>? {
        val today = LocalDate.now()
        val interval : Long = when {
            SlotType.THIS_MONTH == type -> {
                30
            }

            SlotType.THIS_WEEK==type -> {
                7
            }

            SlotType.TODAY==type -> {
                1
            }

            else -> {
                7
            }
        }
        val nextTime = today.plusDays(interval)
        return Slot.find { SlotTable.date.between(today,nextTime) }.toList()
    }

    fun bookSlot(id: Long) :Slot {
        val slot = Slot.findById(id) ?: unprocessable("Slot not found")
        if (slot.status != SlotStatus.open) {
            unprocessable("Slot already booked")
        }
        slot.status = SlotStatus.hold
        return slot

    }
}

enum class SlotType {
    TODAY,
    THIS_WEEK,
    THIS_MONTH,
    ALL
}