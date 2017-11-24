import {HasId} from '../model/HasId';
import {Serializable} from '../model/Serializable';
import Vue from 'vue';


export abstract class AbstractApi<T extends HasId & Serializable> {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      Vue.axios.get(this.url + '/' + id).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  }

  async getAll(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      Vue.axios.get(this.url).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  }

  async create(t: T) {
    return new Promise<any>((resolve, reject) => {
      Vue.axios.post(this.url, t.toObject()).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  }

  async delete(id: string) {
    return new Promise<any>((resolve, reject) => {
      Vue.axios.delete(this.url + '/' + id).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  }

  async update(id: string, t: T) {
    return new Promise<any>((resolve, reject) => {
      Vue.axios.path(this.url + '/' + id, t.toObject()).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
