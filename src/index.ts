let lastUpdate = 0;
const maxStaleTime = 10 * 1000; // 10 seconds

// Circular Chart Instances
let suhuChart: Chart;
let kelembabanChart: Chart;
let kelembabanTanahChart: Chart;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize charts after DOM loaded
  suhuChart = createCircularChart("suhuChart", "#2196F3");
  kelembabanChart = createCircularChart("kelembabanChart", "#4CAF50");
  kelembabanTanahChart = createCircularChart("kelembabanTanahChart", "#203c69");

  // Start fetching data
  fetchData();
  setInterval(fetchData, 1000);
  setInterval(updateDisplayIfStale, 1000);
});

async function fetchData() {
  try {
    const response = await fetch("https://esp32-f0f56-default-rtdb.asia-southeast1.firebasedatabase.app/.json");
    const data = await response.json();

    if (data && data.sensor) {
      const sensorData = data.sensor;
      const currentTimestamp = Date.now();

      displayData(parseFloat(sensorData.suhu), parseFloat(sensorData.kelembaban), parseFloat(sensorData.kelembaban_tanah));

      lastUpdate = currentTimestamp;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateDisplayIfStale() {
  const currentTimestamp = Date.now();
  const timeSinceLastUpdate = currentTimestamp - lastUpdate;

  if (timeSinceLastUpdate > maxStaleTime) {
    displayData(0, 0, 0);
  }
}

function displayData(suhu: number, kelembaban: number, kelembaban_tanah: number): void {
  const suhuValueElement = document.getElementById("suhuValue");
  const kelembabanValueElement = document.getElementById("kelembabanValue");
  const kelembabanTanahValueElement = document.getElementById("kelembabanTanahValue");

  // Update chart values
  updateCircularChart(suhuChart, suhu);
  updateCircularChart(kelembabanChart, kelembaban);
  updateCircularChart(kelembabanTanahChart, kelembaban_tanah);

  // Update displayed text with 1 decimal point
  if (suhuValueElement) suhuValueElement.textContent = `${suhu.toFixed(1)}°`;
  if (kelembabanValueElement) kelembabanValueElement.textContent = `${kelembaban.toFixed(1)}%`;
  if (kelembabanTanahValueElement) kelembabanTanahValueElement.textContent = `${kelembaban_tanah.toFixed(1)}%`;
}

function createCircularChart(canvasId: string, color: string): Chart {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error(`Canvas context not found for id: ${canvasId}`);
  }

  return new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [0, 100],
          backgroundColor: [color, "#E5E7EB"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      // cutout: "70%",
      plugins: {
        tooltip: { enabled: false },
      },
    },
  });
}

function updateCircularChart(chart: Chart, value: number): void {
  chart.data.datasets![0].data = [value, 100 - value];
  chart.update();
}
