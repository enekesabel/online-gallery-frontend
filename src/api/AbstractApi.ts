import {HasId} from '../model/HasId';

export abstract class AbstractApi<T extends HasId> {
  private url: string;

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
      const results = [];
      for (let i = 0; i < 5; i++) {
        results.push(this.createEntity({}));
      }
      resolve(results);
    });
  }

  async create(t: T) {
    return new Promise<T>((resolve, reject) => {
      resolve(t);
    });
  }

  async delete(id: string) {
    return new Promise<T>((resolve, reject) => {
      resolve();
    });
  }

  async update(id: string, t: T) {
    return new Promise<T>((resolve, reject) => {
      resolve(t);
    });
  }

  abstract createEntity(o: Object): T;

}
