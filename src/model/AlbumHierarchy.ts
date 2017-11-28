export type AlbumHierarchy = {
  id: string,
  displayName: string,
  childAlbums: AlbumHierarchy[],
};
