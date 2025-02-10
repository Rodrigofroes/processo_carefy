import BaseEntity from "./baseEntity.js";
import { v4 as uuidv4 } from 'uuid';

export default class HistoricoEntity extends BaseEntity {
    #id;
    #filme_id;
    #acao;
    #data_criacao;

    constructor(id, filme_id, acao, data_criacao = new Date()) {
        super();
        this.#id = id;
        this.#filme_id = filme_id;
        this.#acao = acao;
        this.#data_criacao = data_criacao;
    }

    get id() {
        return this.#id;
    }

    get filme_id() {
        return this.#filme_id;
    }

    get acao() {
        return this.#acao;
    }

    get data_criacao() {
        return this.#data_criacao;
    }

    set id(value) {
        this.#id = value;
    }

    set filme_id(value) {
        this.#filme_id = value;
    }

    set acao(value) {
        this.#acao = value;
    }

    set data_criacao(value) {
        this.#data_criacao = value;
    }


}