import { useRef, useEffect, type FC } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FestivalMarker from "./FestivalMarker";
import { createRoot } from "react-dom/client";
import { useFestivalContext } from "@/context/FilteredFestivalContext";
import MapSettingsPopover from "./MapSettingsPopover";

const MapComponent: FC = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { filteredFestivals, autoPanEnabled } = useFestivalContext();
    const markersRef = useRef<Map<number, mapboxgl.Marker>>(new Map());

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/standard",
            center: [76.2999, 9.9816],
            zoom: 8,
            minZoom: 6,
            maxZoom: 15,
        });

        return () => mapRef.current?.remove();
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        const focusZoomOnClick = (id: number) => {
            const festival = filteredFestivals?.find((f) => f.id === id);
            if (!festival || !mapRef.current) return;
            mapRef.current.flyTo({
                center: [
                    festival.location.coordinates.longitude,
                    festival.location.coordinates.latitude,
                ],
                zoom: 10,
                essential: true,
            });
        }

        const currentMarkers = markersRef.current;

        // Remove old markers that are no longer in the filtered list
        currentMarkers.forEach((marker, id) => {
            if (!filteredFestivals?.some((f) => f.id === id)) {
                marker.remove();
                currentMarkers.delete(id);
            }
        });

        // Add new markers
        filteredFestivals?.forEach((festival) => {
            if (currentMarkers.has(festival.id)) return;

            const markerEl = document.createElement("div");
            markerEl.style.width = "auto";
            markerEl.style.height = "auto";

            createRoot(markerEl).render(<FestivalMarker festival={festival} focusZoomOnClick={focusZoomOnClick} />);

            const marker = new mapboxgl.Marker(markerEl)
                .setLngLat([
                    festival.location.coordinates.longitude,
                    festival.location.coordinates.latitude,
                ])
                .addTo(mapRef.current!);

            currentMarkers.set(festival.id, marker);
        });

        if (autoPanEnabled && filteredFestivals && filteredFestivals.length > 0) {
            const first = filteredFestivals[0];
            mapRef.current.flyTo({
                center: [
                    first.location.coordinates.longitude,
                    first.location.coordinates.latitude,
                ],
                zoom: 10,
                essential: true,
            });
        }
    }, [filteredFestivals, autoPanEnabled]);

    return (
        <section className="px-2 sm:px-3 py-2 sm:py-0 relative overflow-hidden w-full h-full rounded-xl bg-gray-50 dark:bg-neutral-900">
            <div className="absolute w-full h-full rounded-xl" ref={mapContainerRef} />
            <MapSettingsPopover />
        </section>
    );
};

export default MapComponent;
