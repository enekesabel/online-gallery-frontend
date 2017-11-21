import {HasId} from '../model/HasId';
import Vue from 'vue';


export abstract class AbstractApi<T extends HasId> {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      resolve(this.createEntity({}));
    });
  }

  async getAll(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      resolve([this.createEntity({})]);
    });
  }

  create(t: T) {

  }

  delete(id: string) {

  }

  update(id: string, t: T) {

  }

  abstract createEntity(o: Object): T;

}
