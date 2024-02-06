// src/services/covidService.js
import axios from 'axios'

const API_URL = 'https://covid19-brazil-api.now.sh'

export default {
  async fetchCountryData() {
    try {
      const response = await axios.get(`${API_URL}/api/report/v1/countries`);
      console.log('Dados da API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching country data:', error);
      throw error;
    }
    
  }
}
