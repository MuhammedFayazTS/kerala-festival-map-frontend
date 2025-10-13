import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard',
            center: [77.0394, 9.9956],
            zoom: 8.9,
            pitch: 0,
            bearing: 0,
            minZoom: 6,
            maxZoom: 15,
            doubleClickZoom: false,
            interactive: true
        });

        return () => {
            mapRef.current?.remove()
        }
    }, [])
    return (
        <section className='px-3 pb-2 sm:pb-0 relative overflow-hidden w-full h-full rounded-xl bg-gray-50 dark:bg-neutral-900'>
            <div className="absolute w-full h-full rounded-xl" ref={mapContainerRef} />
        </section>
    )
}

export default Map