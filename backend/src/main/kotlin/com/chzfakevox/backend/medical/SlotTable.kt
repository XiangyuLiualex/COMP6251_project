package com.chzfakevox.backend.medical

import com.chzfakevox.backend.util.BaseEntity
import com.chzfakevox.backend.util.BaseEntityClass
import com.chzfakevox.backend.util.BaseIdTable
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.javatime.date

object SlotTable : BaseIdTable<Long>("slots") {
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val pg_id = long("gp_id")
    val date = date("date")
    val day_of_week = enumerationByName("day_of_week", 20, DayOfWeek::class)
    val time =varchar("duration",100)
    val status = enumerationByName("status", 10, SlotStatus::class)
    val booked_by_id = long("booked_by_id").nullable()
}


class Slot(id: EntityID<Long>) : BaseEntity<Long>(id, SlotTable) {
    companion object : BaseEntityClass<Long, Slot>(SlotTable)

    var pg_id by SlotTable.pg_id
    var date by SlotTable.date
    var day_of_week by SlotTable.day_of_week
    var time by SlotTable.time
    var status by SlotTable.status
    var booked_by_id by SlotTable.booked_by_id
}

enum class SlotStatus {
    open, hold
}
enum class DayOfWeek{
    Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}