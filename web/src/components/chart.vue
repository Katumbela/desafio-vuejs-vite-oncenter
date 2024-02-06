<!-- src/components/Chart.vue -->
<template>
    <div class="md:px-16 px-4 h- py-10">
        <center>
            <h1 class="text-3xl text-red-700 font-bold">CASOS CONFIRMADOS</h1>
        </center>
        <div class="bg-red-500 w-20 my-3 rounded-full h-1 mx-auto"></div>
        <br>
        <h1 class="text-2xl font-bold mb-4 text-black ">Casos de COVID-19 por país</h1>
        <hr>
        <canvas class="w-6/12" ref="chart"></canvas>
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
                // console.log('Dados da API:', countryData);

                const labels = countryData.data.map(country => country.country);
                const data = countryData.data.map(country => country.confirmed);

                chart.value = new Chart(chart.value, {
                    type: 'bar', // Alterado para 'bar' para usar um gráfico de barras
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Casos confirmados',
                            backgroundColor: '#F22424',
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
  