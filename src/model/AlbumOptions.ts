import {AlbumBaseOptions} from './AlbumBaseOptions';
import {PictureOptions} from './PictureOptions';

export type AlbumOptions = AlbumBaseOptions & {
  childAlbums: AlbumBaseOptions[];
  pictures: PictureOptions[];
  albumTree: { name: string }[];
};
