<template>
  <div id="casos-mundiais" class=" my-10 p-6 rounded-lg text-center">
    <div v-if="!isCounting">
      <div class="flex md:flex-row flex-col gap-6  justify-around">
        <div>
          <h3 class="text-xl font-semibold">Casos Confirmados</h3>
          <p class="text-5xl font-bold mt-2 text-green-500 counter">{{ confirmedTotal}}</p>
        </div>
        <div class="mt-6 md:mt-0">
          <h3 class="text-xl font-semibold">Mortes</h3>
          <p class="text-5xl font-bold mt-2 text-red-500 counter">{{ deathsTotal}}</p>
        </div>
        <div class="mt-6 md:mt-0">
          <h3 class="text-xl font-semibold">Recuperados</h3>
          <p class="text-5xl font-bold mt-2 text-blue-500 counter">{{ recoveredTotal}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Carregando dados...</p>
    </div>
    <br>
  </div>
</template>
<script>
import covidService from '../services/covidService'
import numeral from 'numeral';


export default {
  data() {
    return {
      isCounting: true,
      confirmedTotal: 0,
      deathsTotal: 0,
      recoveredTotal: 0
    };
  },
  methods: {
  async fetchData() {
    try {
      const countryData = await covidService.fetchCountryData();
      this.calculateTotals(countryData.data); // Passando countryData.data ao invés de countryData
      this.isCounting = false;
      // console.log(countryData.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  },
  calculateTotals(data) {
    // Inicialize os totais
    let confirmedTotal = 0;
    let deathsTotal = 0;
    let recoveredTotal = 0;

    // Iterar sobre os dados de cada país
    data.forEach(country => {
      // Adicionar os valores de confirmed, deaths e recovered aos totais
      confirmedTotal += country.confirmed || 0;
      deathsTotal += country.deaths || 0;
      recoveredTotal += country.recovered || 0;
    });

    // Atribuir os totais às variáveis de dados
    this.confirmedTotal = numeral(confirmedTotal).format('0,0');
    this.deathsTotal = numeral(deathsTotal).format('0,0');
    this.recoveredTotal = numeral(recoveredTotal).format('0,0');
}


},

  mounted() {
    this.fetchData();
  }
};
</script>

