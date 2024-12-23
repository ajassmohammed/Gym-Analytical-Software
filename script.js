
document.addEventListener("DOMContentLoaded", () => {

  const exerciseForm = document.getElementById("exerciseForm");
  const exerciseTypeInput = document.getElementById("exerciseType");
  const durationInput = document.getElementById("duration");
  const caloriesInput = document.getElementById("calories");
  const clearChartButton = document.getElementById("clearChart");

  
  const ctx = document.getElementById("analyticsChart").getContext("2d");
  let analyticsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Duration (minutes)",
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
          data: [],
        },
        {
          label: "Calories Burned",
          backgroundColor: "rgba(234, 88, 12, 0.7)",
          borderColor: "rgba(234, 88, 12, 1)",
          borderWidth: 1,
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  
  function addDataToChart(exercise, duration, calories) {
    
    analyticsChart.data.labels.push(exercise);

    
    analyticsChart.data.datasets[0].data.push(duration);
    analyticsChart.data.datasets[1].data.push(calories);

    
    analyticsChart.update();
  }

  
  function clearChart() {
    analyticsChart.data.labels = [];
    analyticsChart.data.datasets[0].data = [];
    analyticsChart.data.datasets[1].data = [];
    analyticsChart.update();
  }

  
  exerciseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    
    const exerciseType = exerciseTypeInput.value.trim();
    const duration = parseInt(durationInput.value.trim());
    const calories = parseInt(caloriesInput.value.trim());

    
    if (!exerciseType || isNaN(duration) || isNaN(calories) || duration <= 0 || calories <= 0) {
      alert("Please enter valid exercise details.");
      return;
    }

    
    addDataToChart(exerciseType, duration, calories);

    
    exerciseForm.reset();
  });

  
  clearChartButton.addEventListener("click", () => {
    const confirmClear = confirm("Are you sure you want to clear all chart data?");
    if (confirmClear) {
      clearChart();
    }
  });
});
