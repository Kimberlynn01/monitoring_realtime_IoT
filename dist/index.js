"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://esp32-f0f56-default-rtdb.asia-southeast1.firebasedatabase.app/.json");
            const data = yield response.json();
            // Extract sensor data
            const sensorData = data.sensor;
            // Update HTML elements
            const suhuElement = document.getElementById("suhu");
            const kelembabanElement = document.getElementById("kelembaban");
            if (suhuElement && kelembabanElement) {
                suhuElement.textContent = sensorData.suhu;
                kelembabanElement.textContent = sensorData.kelembaban;
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
// Call fetchData on page load
fetchData();
// Refresh data every 10 seconds
setInterval(fetchData, 10000);
