import {AlbumBaseOptions} from './AlbumBaseOptions';
import {PictureBaseOptions} from './PictureBaseOptions';

export type AlbumOptions = AlbumBaseOptions & {
  childAlbums: AlbumBaseOptions[];
  pictures: PictureBaseOptions[];
};
