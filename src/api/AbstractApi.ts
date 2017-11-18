import {HasId} from '../model/HasId';

export abstract class AbstractApi<T extends HasId> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get(id: string): Promise<T> {
    return new Promise<T>(() => {
      return this.createEntity({});
    });
  }

  async getAll(): Promise<T[]> {
    return new Promise<T[]>(() => {
      return [this.createEntity({})];
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
