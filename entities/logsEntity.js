import BaseEntity from "./baseEntity.js";
import { v4 as uuidv4 } from 'uuid';

export default class LogsEntity extends BaseEntity {
    #id;
    #metodo;
    #url;
    #status;
    #filme_id;
    #data_criacao;

    constructor(id = uuidv4(), metodo, url, status, filme_id, data_criacao = new Date()) {
        super();
        this.#id = id;
        this.#metodo = metodo;
        this.#url = url;
        this.#status = status;
        this.#filme_id = filme_id;
        this.#data_criacao = data_criacao;
    }

    get id() {
        return this.#id;
    }

    get metodo() {
        return this.#metodo;
    }

    get url() {
        return this.#url;
    }

    get status() {
        return this.#status;
    }

    get filme_id() {
        return this.#filme_id;
    }

    get data_criacao() {
        return this.#data_criacao;
    }

    set id(value) {
        this.#id = value;
    }

    set metodo(value) {
        this.#metodo = value;
    }

    set url(value) {
        this.#url = value;
    }

    set status(value) {
        this.#status = value;
    }

    set filme_id(value) {
        this.#filme_id = value;
    }

    set data_criacao(value) {
        this.#data_criacao = value;
    }
}