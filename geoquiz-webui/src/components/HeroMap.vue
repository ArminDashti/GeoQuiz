<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import L, { type GeoJSON as LeafletGeoJSON, type Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { colorForCountryId } from '@/lib/countryColors'

const mapContainer = ref<HTMLDivElement | null>(null)
const mapRef = shallowRef<LeafletMap | null>(null)
const countriesLayerRef = shallowRef<LeafletGeoJSON | null>(null)

const STYLE = {
  weight: 0.55,
  opacity: 0.4,
  color: '#1C2B36',
  fillOpacity: 0.58,
}

async function loadWorld(): Promise<GeoJSON.FeatureCollection> {
  const base = import.meta.env.BASE_URL || '/'
  const res = await fetch(`${base}world-110m.geojson`)
  if (!res.ok) throw new Error(`Hero map data failed (${res.status})`)
  return (await res.json()) as GeoJSON.FeatureCollection
}

async function initMap() {
  if (!mapContainer.value) return

  const map = L.map(mapContainer.value, {
    center: [18, 12],
    zoom: 2,
    minZoom: 2,
    maxZoom: 4,
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false,
  })

  mapRef.value = map

  try {
    const geojson = await loadWorld()
    countriesLayerRef.value = L.geoJSON(geojson as GeoJSON.GeoJsonObject, {
      style: (feature) => {
        const id = Number(feature?.id ?? feature?.properties?.id ?? 0)
        return {
          ...STYLE,
          fillColor: colorForCountryId(id),
        }
      },
      interactive: false,
    }).addTo(map)
  } catch {
    // Decorative only — sea wash still shows if data fails to load.
  }

  requestAnimationFrame(() => {
    map.invalidateSize()
  })
}

onMounted(() => {
  void initMap()
})

onBeforeUnmount(() => {
  mapRef.value?.remove()
  mapRef.value = null
  countriesLayerRef.value = null
})
</script>

<template>
  <div ref="mapContainer" class="h-full w-full" aria-hidden="true" />
</template>
