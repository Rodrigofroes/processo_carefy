import BaseEntity from "./baseEntity.js";
import { v4 as uuidv4 } from 'uuid';

export default class FilmeEntity extends BaseEntity {
    #id;
    #tmdb_id;
    #titulo;
    #sinopse;
    #data_lancamento;
    #genero;
    #caminho_poster;
    #nota;
    #data_criacao;

    constructor(id = uuidv4(), tmdb_id, titulo, sinopse, data_lancamento, genero, caminho_poster, nota, data_criacao = new Date()) {
        super();
        this.#id = id;
        this.#tmdb_id = tmdb_id;
        this.#titulo = titulo;
        this.#sinopse = sinopse;
        this.#data_lancamento = data_lancamento;
        this.#genero = genero;
        this.#caminho_poster = caminho_poster;
        this.#nota = nota;
        this.#data_criacao = data_criacao;
    }

    get id() {
        return this.#id;
    }

    get tmdb_id() {
        return this.#tmdb_id;
    }

    get titulo() {
        return this.#titulo;
    }

    get sinopse() {
        return this.#sinopse;
    }

    get data_lancamento() {
        return this.#data_lancamento;
    }

    get genero() {
        return this.#genero;
    }

    get caminho_poster() {
        return this.#caminho_poster;
    }

    get nota() {
        return this.#nota;
    }

    get data_criacao() {
        return this.#data_criacao;
    }

    set id(value) {
        this.#id = value;
    }

    set tmdb_id(value) {
        this.#tmdb_id = value;
    }

    set titulo(value) {
        this.#titulo = value;
    }

    set sinopse(value) {
        this.#sinopse = value;
    }

    set data_lancamento(value) {
        this.#data_lancamento = value;
    }

    set genero(value) {
        this.#genero = value;
    }

    set caminho_poster(value) {
        this.#caminho_poster = value;
    }

    set nota(value) {
        this.#nota = value;
    }

    set data_criacao(value) {
        this.#data_criacao = value;
    }

    
}