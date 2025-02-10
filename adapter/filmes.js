const baseUrl = "https://api.themoviedb.org/3/";

export default class FilmesApiAdapter {
    #apiKey;
    constructor() {
        this.#apiKey = "9f44a77a2f370b4bc7c03ea7d02d5ade";
    }

    async consultarFilmes(nome){
        const url = `${baseUrl}search/movie?query=${nome}&api_key=${this.#apiKey}&language=pt-BR`;
        const response = await fetch(url);
        if(response.status != 200){
            return [];
        }
        const json = await response.json();
        return json.results;
    }
}