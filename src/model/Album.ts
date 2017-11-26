import {AlbumOptions} from './AlbumOptions';
import {AlbumBase} from './AlbumBase';
import {Picture} from './Picture';

export class Album extends AlbumBase implements AlbumOptions {

  private _childAlbums: AlbumBase[] = [];
  private _pictures: Picture[] = [];
  private _albumTree: { name: string }[] = [];

  constructor(options: AlbumOptions) {
    super(options);
    options.childAlbums && options.childAlbums.forEach(c => {
      this._childAlbums.push(new AlbumBase(c));
    });

    options.pictures && options.pictures.forEach(p => {
      this._pictures.push(new Picture(p));
    });

    options.albumTree && options.albumTree.forEach(node => {
      this._albumTree.push({name: node.name});
    });
  }

  get childAlbums(): AlbumBase[] {
    return this._childAlbums;
  }

  get pictures(): Picture[] {
    return this._pictures;
  }

  get albumTree(): { name: string }[] {
    return this._albumTree;
  }
}
