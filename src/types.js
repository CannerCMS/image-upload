// @flow

export type OnChange = (value: string | Array<string>) => void;
export type ServiceConfig = any;
export type GalleryConfig = Array<{
  name: string,
  gallery: Array<{ url: string, name: string }>
}>;
