// @flow

export type OnChange = (value: string | Array<string>) => void;
export type GalleryConfig = Array<{
  name: string,
  gallery: Array<{ url: string, name: string }>
}>;
export type CustomRequestArgs = {
  onProgress: (event: { percent: number }) => void,
  onError: (event: Error, body?: Object) => void,
  onSuccess: (body: Object) => void,
  data: Object,
  filename: String,
  file: File,
  withCredentials: Boolean,
  action: String,
  headers: Object
};
