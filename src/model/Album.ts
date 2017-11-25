import {AlbumOptions} from './AlbumOptions';
import {AlbumBase} from './AlbumBase';
import {PictureBase} from './PictureBase';

export class Album extends AlbumBase implements AlbumOptions {

  private _childAlbums: AlbumBase[] = [];
  private _pictures: PictureBase[] = [];
  private _albumTree: { name: string }[] = [];

  constructor(options: AlbumOptions) {
    super(options);
    options.childAlbums.forEach(c => {
      this._childAlbums.push(new AlbumBase(c));
    });

    options.pictures.forEach(p => {
      this._pictures.push(new PictureBase(p));
    });

    options.albumTree && options.albumTree.forEach(node => {
      this._albumTree.push({name: node.name});
    });
  }

  get childAlbums(): AlbumBase[] {
    return this._childAlbums;
  }

  get pictures(): PictureBase[] {
    return this._pictures;
  }

  get albumTree(): { name: string }[] {
    return this._albumTree;
  }
}
