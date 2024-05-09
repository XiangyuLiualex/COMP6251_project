package com.chzfakevox.backend.common

import com.google.gson.Gson
import com.google.gson.JsonObject
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class MapService(
    private val restTemplate: RestTemplate
) {
    fun getPharmacies(): Any {
        return "Pharmacies"

    }
    fun getAddress(latitude: Double, longitude: Double): Address? {
        val googleApiKey = System.getenv("GOOGLE_API_KEY")
        val url  = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$latitude,$longitude&key=$googleApiKey"

        val response: ResponseEntity<String> = restTemplate.exchange(url, HttpMethod.GET, null, String::class.java)

        // Parse the response body
        val responseBody = Gson().fromJson(response.body, JsonObject::class.java)
        val results = responseBody.getAsJsonArray("results")
        if (results.size() > 0) {
            val firstResult = results.get(0).asJsonObject
            val addressComponents = firstResult.getAsJsonArray("address_components")
            val addressParts = Address("","","","")
            for (i in 0 until addressComponents.size()) {
                val component = addressComponents.get(i).asJsonObject
                val types = component.getAsJsonArray("types")
                for (j in 0 until types.size()) {
                    when (types.get(j).asString) {
                        "route" -> addressParts.ADDRESS_FIELD1 = component.get("long_name").asString
                        "locality" -> addressParts.ADDRESS_FIELD2 = component.get("long_name").asString
                        "administrative_area_level_1" -> addressParts.ADDRESS_FIELD3 = component.get("long_name").asString
                        "country" -> addressParts.ADDRESS_FIELD4 = component.get("long_name").asString
                    }
                }
            }
            return addressParts
        }
        return null
    }



}
