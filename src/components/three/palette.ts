/** Warna scene 3D — sama dengan token di index.css supaya 3D dan UI satu bahasa. */
export const AMBER = '#FFB627'
export const AMBER_DIM = '#B37D18'
export const CHILL = '#6FCBE0'
export const STEEL = '#8A9198'
export const VOID = '#05070B'
export const TEAL = '#3F8494'
export const STEEL_LIGHT = '#C9CFD4'

/** logam terang yang memantulkan Environment */
export const TITANIUM = '#9AA5AE'
export const PLATING = '#4B5560'
export const SOLAR = '#1D3A5C'

/**
 * Pengali emissive untuk material yang harus kena Bloom.
 * Bloom memakai luminanceThreshold 1, jadi hanya warna > 1 (dengan toneMapped=false) yang bersinar.
 */
export const GLOW = 4
