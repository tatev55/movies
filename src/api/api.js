import { baseUrl } from "../utils/constant";

class Api {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = baseUrl;
    }
  
    async fetchByID(id) {
      try {
        const response = await fetch(
          `${this.baseUrl}?i=${id}&apikey=${this.apiKey}`
        );
        const data = await response.json();
            return data
      } catch (error) {
            return { success: false, data: null, error: error.message };
      }
    }
  
    async fetchMoviesBySearch(query, page ) {
      try {
        const response = await fetch(
          `${this.baseUrl}?s=${encodeURIComponent(query)}&page=${page}&apikey=${
            this.apiKey
          }`
        );
        const data = await response.json();
        
            return data;
      } catch (error) {
            return { success: false, data: [], error: error.message };
      }
    }
  }
  
  export const api = new Api("a71429a8");