export class Api{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    async getMovies(query) {
        try {
            const response = await fetch(`${this.baseUrl}&s=${query}`);
            const data = await response.json();
            
            if (response.status !== 200) {
                throw new Error(response.status);
            }
    
            return data;
        } catch (error) {
            console.log('Error fetching movies:', error);
        }
    }

    
}