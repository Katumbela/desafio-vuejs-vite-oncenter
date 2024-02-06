<template>
  <div>
    <!-- Menu -->
    <Menu />

    <!-- Hero -->
    <Hero title="Casos de Covid 19"
      description="Dados de casos confirmados de covid 19 enquanto a pandemia estava intensa mundialmente" />

    <!-- Conteúdo principal -->
    <div class="mt-4">
      <Chart :chart-data="chartData" />
    </div>

    <!-- Jumbotron -->
    <div class=" lg:mt-8 mb-16">
      <Jumbotron />
    </div>
    <div>

      <GlobalStats />
    </div>
    <!-- Tabela mundial -->
    <div class="flex  md:flex-row flex-col ">
      <div class="md:w-4/12 mb-12 md:mb-0 flex items-center gap-4 content-center flex-col justify-center p-18">

        <img src="./assets/cov2.png" class="md:w-[60%]" alt="">
        <h2 class="text-covid  font-extrabold text-4xl">SARS-COV 2</h2>

      </div>
      <div id="paises" class="md:w-8/12">

        <div class=" w-full  overflow-auto">
          <div class="bg-slate-200 text-center px-2 py-3">
            <h2 class="text-xl font-bold">Dados Mundiais COVID-19</h2>
          </div>
          <table class=" overflow-auto text-sm table table-auto w-full">
            <!-- Cabeçalho da tabela -->
            <thead class="table-header-group">
              <tr class="bg-slate-100">
                <th class=" text-start  px-4 py-2">País</th>
                <th class=" px-4 text-start py-2">Casos</th>
                <th class=" px-4 text-start py-2">Confirmados</th>
                <th class=" px-4 text-start py-2">Mortes</th>
                <th class=" px-4 text-start py-2">Recuperados</th>
              </tr>
            </thead>
            <!-- Corpo da tabela -->
            <tbody class="bg-gray-50">
              <tr v-for="(country, index) in paginatedCountries" :key="index">
                <td class=" px-4 text-start py-2">{{ country.country }}</td>
                <td class=" text-black">{{ country.cases ?? "Indeter." }}</td>
                <td class="px-4 text-start py-2" :class="{
                  'bg-red-200': country.confirmed >= 5001 && country.confirmed <= 10000,
                  'bg-green-500': country.confirmed <= 5000,
                  'bg-orange-200': country.confirmed > 10001
                }">{{ country.confirmed }}</td>

                <td class=" px-4 text-start py-2">{{ country.deaths }}</td>
                <td class=" px-4 text-start py-2">{{ country.recovered ?? "Indeter." }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Controles de Paginação -->
        <div class="mt-4 text-center">
          <button :class="{
            'btn-pagina': true,
            'text-slate-400 border-slate-400': currentPage === 1,
            'cursor-not-allowed': currentPage === 1
          }" @click="previousPage" :disabled="currentPage === 1">
            Anterior
          </button>
          <span class="mx-4 text-md font-normal">{{ currentPage }} de {{ totalPages }}</span>
          <button :class="{
            'btn-pagina': true,
            'text-slate-400  border-slate-400': currentPage === totalPages,
            'cursor-not-allowed': currentPage === totalPages
          }" @click="nextPage" :disabled="currentPage === totalPages">
            Próxima
          </button>
        </div>


      </div>

    </div>
    <Footer />
  </div>
</template>

<script>
import Chart from './components/chart.vue'
import Hero from './components/hero.vue'
import Menu from './components/menu.vue'
import Footer from './components/footer.vue'
import Jumbo from './components/jumbotron.vue'
import covidService from './services/covidService'
import Jumbotron from './components/jumbotron.vue'
import GlobalStats from './components/globalStats.vue'


export default {
  components: {
    Chart,
    Hero,
    Menu,
    Footer,
    Jumbotron,
    GlobalStats,
  },
  data() {
    return {
      chartData: {},
      countries: [],
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    // Calcula o total de páginas com base no número de países e itens por página
    totalPages() {
      return Math.ceil(this.countries.length / this.itemsPerPage)
    },
    // Retorna os países para a página atual
    paginatedCountries() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.countries.slice(startIndex, endIndex)
    }
  },
  methods: {
    // Avança para a próxima página
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    // Retrocede para a página anterior
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    async fetchData() {
      try {
        const countryData = await covidService.fetchCountryData();
        // console.log('Dados da API:', countryData);
        const data = countryData.data;

        this.countries = data; // Atribui os dados dos países à propriedade countries

        const labels = data.map(country => country.country);
        const confirmedCases = data.map(country => country.confirmed);

        this.chartData = {
          labels: labels,
          datasets: [{
            label: 'Casos confirmados',
            backgroundColor: '#FF0C0C',
            data: confirmedCases
          }]
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  async mounted() {
    this.fetchData();
  }
};
</script>
