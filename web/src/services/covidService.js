// src/services/covidService.js
import axios from 'axios'

// este link nao funciona no entanto peguei um outro link no mesmo site para consumir os dados
// https://covid19-brazil-api-docs.vercel.app/#req_53a5a4926c534c59b36ffb08a667ed3a

const API_URL = 'https://covid19-brazil-api.now.sh'

export default {
  async fetchCountryData() {
    try {
      const response = await axios.get(`${API_URL}/api/report/v1/countries`);
      // console.log('Dados da API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching country data:', error);
      throw error;
    }
    
  }
}
