package com.chzfakevox.backend.medical

import com.chzfakevox.backend.util.BaseIdTable

object SlotTable : BaseIdTable<Long>("slot") {
    override val id = long("id").autoIncrement().entityId()
    override val primaryKey = PrimaryKey(id)
    val pg_id = long("doctor_id")
    val date = long("patient_id").nullable()
    val day_of_week = varchar("start_date_time_string", 255)
    val time = varchar("end_date_time_string", 255)
    val status = enumerationByName("status", 10, SlotStatus::class)
    val booked_by_id = long("booked_by_id").nullable()
}
enum class SlotStatus {
    AVAILABLE, BOOKED, CANCELLED
}