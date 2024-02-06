<!-- src/components/Chart.vue -->
<template>
    <div  class="w-full h-screen" >
      <canvas class="w-full h-screen" ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  import covidService from '../services/covidService';
  
  
  
export default {
  setup() {
    const chart = ref(null);

    onMounted(async () => {
      try {
        const countryData = await covidService.fetchCountryData();
        console.log('Dados da API:', countryData);

        const labels = countryData.data.map(country => country.country);
        const data = countryData.data.map(country => country.confirmed);

        chart.value = new Chart(chart.value, {
          type: 'line', // Alterado para 'line' para usar um gráfico de linha
          data: {
            labels: labels,
            datasets: [{
              label: 'Confirmed Cases',
              borderColor: '#f87979',
              backgroundColor: 'transparent',
              data: data
            }]
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      chart
    };
  }
};
  </script>
  