export interface GPUInfoData {
  vendor: string;
  renderer: string;
  webglVersion: string;
  shadingLanguageVersion: string;
  maxTextureSize: number;
  maxViewportDims: [number, number];
  isHardwareAccelerated: boolean;
}
export interface WebGLSupport {
  isSupported: boolean;
  isHardwareAccelerated: boolean;
  vendor: string;
  renderer: string;
  webglVersion: string;
  isLoading: boolean;
}
// export interface GPUProviderData extends GPUInfoData {
//   isSupported: boolean;
//   isHardwareAccelerated: boolean;
//   vendor: string;
//   renderer: string;
//   webglVersion: string;
//   isLoading: boolean;

// }
export interface GPUProviderData {
  gpuInfo: GPUInfoData | null;
  webglSupport: WebGLSupport | null;
}
