import type { CountryGeoJSON } from '@/lib/api'

export const REVEAL_MS = 5000

/* Atlas wash — sea, land, coral pin, chart gold (no neon/purple kit) */
const PALETTE = [
  '#3A7A8C',
  '#5B9A8B',
  '#2F6B7A',
  '#7BA3AE',
  '#C9922A',
  '#E05A33',
  '#D4784A',
  '#4A8F7A',
  '#6B8F9E',
  '#A67C52',
  '#3D9B8F',
  '#B86B4A',
]

export function colorForCountryId(id: number): string {
  const index = Math.abs(id) % PALETTE.length
  return PALETTE[index] ?? '#94a3b8'
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function countryNameFromProperties(
  properties: Record<string, unknown> | null | undefined,
): string {
  if (!properties) return 'Unknown'
  const name = properties.name
  return typeof name === 'string' && name ? name : 'Unknown'
}

export function withCountryColors(geojson: CountryGeoJSON): CountryGeoJSON {
  return {
    ...geojson,
    features: geojson.features.map((feature) => {
      const id = feature.properties?.id ?? feature.id ?? 0
      return {
        ...feature,
        properties: {
          ...feature.properties,
          color: feature.properties.color ?? colorForCountryId(id),
        },
      }
    }),
  }
}
