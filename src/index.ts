async function fetchData(): Promise<void> {
  try {
    const response = await fetch("https://esp32-f0f56-default-rtdb.asia-southeast1.firebasedatabase.app/.json");
    const data = await response.json();

    const sensorData = data.sensor;

    const suhuElement = document.getElementById("suhu");
    const kelembabanElement = document.getElementById("kelembaban");

    if (suhuElement && kelembabanElement) {
      suhuElement.textContent = sensorData.suhu;
      kelembabanElement.textContent = sensorData.kelembaban;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

 setInterval(fetchData, 10000);
