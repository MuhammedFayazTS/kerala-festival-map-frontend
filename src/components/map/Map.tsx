import { useRef, useEffect, type FC } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import FestivalMarker from './FestivalMarker'
import { createRoot } from 'react-dom/client'
import type { Festival } from '@/types/festival'

interface IMapProps {
    festivals: Festival[]
}

const Map: FC<IMapProps> = ({ festivals }) => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard',
            center: [76.2999, 9.9816],
            zoom: 10,
            pitch: 0,
            bearing: 0,
            minZoom: 6,
            maxZoom: 15,
            doubleClickZoom: false,
            interactive: true
        });

        festivals.map((festival, i) => {

            const markerEl = document.createElement('div')
            markerEl.style.width = 'auto'
            markerEl.style.height = 'auto'

            createRoot(markerEl).render(
                <FestivalMarker festival={festival} />
            )

            if (mapRef.current) {
                new mapboxgl.Marker(markerEl)
                    .setLngLat([
                        festival.location.coordinates.longitude || 76.2999 + (0.002 * i), //for testing - dummy coordinates
                        festival.location.coordinates.latitude || 9.9816 + (0.002 * i) //for testing - dummy coordinates
                    ])
                    .addTo(mapRef.current);
            }
        })

        return () => {
            mapRef.current?.remove()
        }
    }, [festivals])

    return (
        <section className='px-3 pb-2 sm:pb-0 relative overflow-hidden w-full h-full rounded-xl bg-gray-50 dark:bg-neutral-900'>
            <div className="absolute w-full h-full rounded-xl" ref={mapContainerRef} />
        </section>
    )
}

export default Map