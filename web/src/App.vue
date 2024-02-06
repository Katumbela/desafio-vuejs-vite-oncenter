<template>
  <div>
    <!-- Menu -->
    <div class="bg-[#fff] text-black flex justify-between items-center place-center p-4">
      <div class="flex gap-4 items-center place-center">
        <img src="./assets/logo.png" class="h-[50px]" alt="Logo">
        <h3 class="font-bold text-2xl">Dados Covid 19</h3>
      </div>
      <div class="items">
        <a class="mr-6 cursor-pointer"><span href="#" class="hover:text-violet-800">Casos Mundiais</span></a>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="mt-4">
      <h1 class="text-2xl font-bold mb-4">COVID-19 Cases by Country</h1>
      <Chart :chart-data="chartData" />
    </div>

    <!-- Tabela -->
    <div class="mt-4 px-5">
      <h2 class="text-2xl font-bold mb-4">Tabela de Dados</h2>
      <table class="min-w-full table table-auto">
        <!-- Cabeçalho da tabela -->
        <thead class="table-header-group">
          <tr>
            <th class="table-cell px-4 py-2">País</th>
            <th class="table-cell px-4 py-2">Casos</th>
            <th class="table-cell px-4 py-2">Confirmados</th>
            <th class="table-cell px-4 py-2">Mortes</th>
            <th class="table-cell px-4 py-2">Recuperados</th>
          </tr>
        </thead>
        <!-- Corpo da tabela -->
        <tbody class="table-row-group">
          <tr v-for="country in countries" :key="country.country">
            <td class="table-cell px-4 py-2">{{ country.country }}</td>
            <td class="table-cell text-black">{{ country.cases }}</td>
            <td class="table-cell px-4 py-2">{{ country.confirmed }}</td>
            <td class="table-cell px-4 py-2">{{ country.deaths }}</td>
            <td class="table-cell px-4 py-2">{{ country.recovered }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Chart from './components/chart.vue'
import covidService from './services/covidService'

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartData: {},
      countries: [] // Inicializa a propriedade countries como uma array vazia
    }
  },
  async mounted() {
    try {
      const countryData = await covidService.fetchCountryData();
      console.log('Dados da API:', countryData);
      const data = countryData.data;

      this.countries = data; // Atribui os dados dos países à propriedade countries

      const labels = data.map(country => country.country);
      const confirmedCases = data.map(country => country.confirmed);

      this.chartData = {
        labels: labels,
        datasets: [{
          label: 'Confirmed Cases',
          backgroundColor: '#f87979',
          data: confirmedCases
        }]
      };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
</script>
