import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { Search, MapPin, Crosshair, Route } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import polyline from '@mapbox/polyline';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  lat: number;
  lon: number;
  display_name: string;
}

// OpenRouteService API key
const ORS_API_KEY = import.meta.env.VITE_ORS_KEY;

// Custom component to handle map click events
const MapClickHandler: React.FC<{
  onLocationSelect: (lat: number, lon: number) => void
}> = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
};

type LocationPickerProps = {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
};

export default function LocationPicker({ selectedLocation, setSelectedLocation }: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [mapKey, setMapKey] = useState(0);
  const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([]);
  const [routeDistance, setRouteDistance] = useState<number | null>(null);

  const VENDOR_LOCATION: Location = {
    lat: -6.175402,
    lon: 106.827169,
    display_name: 'Jakarta, Indonesia'
  };

  // Function to calculate driving route and distance
  const calculateRoute = async () => {
    try {
      const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
          'Content-Type': 'application/json',
          'Authorization': ORS_API_KEY
        },
        body: JSON.stringify({
          coordinates: [
            [VENDOR_LOCATION.lon, VENDOR_LOCATION.lat],
            [selectedLocation.lon, selectedLocation.lat]
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Route calculation failed');
      }

      const data = await response.json();

      // Decode the geometry string into an array of [lat, lon] coordinates
      const decodedGeometry = polyline.decode(data.routes[0].geometry).map(
        (coords: number[]) => [coords[0], coords[1]] as [number, number]
      );

      setRouteGeometry(decodedGeometry);

      // Distance is in meters
      setRouteDistance(data.routes[0].summary.distance);
    } catch (error) {
      console.error('Error calculating route:', error);
      setRouteGeometry([]);
      setRouteDistance(null);
    }
  };

  // Recalculate route whenever selected location changes
  useEffect(() => {
    if (selectedLocation && selectedLocation.lat !== VENDOR_LOCATION.lat && selectedLocation.lon !== VENDOR_LOCATION.lon) {
      calculateRoute();
    }
  }, [selectedLocation]);

  const searchLocations = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      const data = await response.json();

      const formattedLocations: Location[] = data.map((loc: any) => ({
        lat: parseFloat(loc.lat),
        lon: parseFloat(loc.lon),
        display_name: loc.display_name
      }));

      setLocations(formattedLocations);
    } catch (error) {
      console.error('Error searching locations:', error);
      setLocations([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchLocations();
    }
  };

  const selectLocation = async (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.display_name);
    setLocations([]);
    setRouteGeometry([]);
    setRouteDistance(null);
    // Force map to re-render and center
    setMapKey(prev => prev + 1);
  };

  const handleMapLocationSelect = async (lat: number, lon: number) => {
    try {
      // Reverse geocoding to get location details
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
      );
      const data = await response.json();

      const location: Location = {
        lat: lat,
        lon: lon,
        display_name: data.display_name || `${lat}, ${lon}`
      };

      setSelectedLocation(location);
      setSearchQuery(location.display_name);
      setLocations([]);
      setRouteGeometry([]);
      setRouteDistance(null);
      // Force map to re-render and center
      setMapKey(prev => prev + 1);
    } catch (error) {
      console.error('Error getting location details:', error);

      // Fallback if reverse geocoding fails
      const location: Location = {
        lat: lat,
        lon: lon,
        display_name: `${lat}, ${lon}`
      };
      setSelectedLocation(location);
      setSearchQuery(location.display_name);
      setLocations([]);
      setRouteGeometry([]);
      setRouteDistance(null);
      // Force map to re-render and center
      setMapKey(prev => prev + 1);
    }
  };

  return (
    <div className="w-full mx-auto space-y-4">
      <div className="relative">
        <div className="flex items-center border rounded-md">
          <input
            type="text"
            placeholder="Search for a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => {
              // Clear locations after a short delay to allow click selection
              setTimeout(() => setLocations([]), 200);
            }}
            onKeyPress={handleKeyPress}
            className="w-full p-2 rounded-md focus:outline-none"
          />
          <button
            onClick={searchLocations}
            disabled={isSearching}
            className="p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            {isSearching ? '...' : <Search size={20} />}
          </button>
        </div>

        {locations.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-md shadow-lg mt-1 z-[10000]">
            {locations.map((location, index) => (
              <li
                key={index}
                onClick={() => selectLocation(location)}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <MapPin size={16} className="mr-2 text-gray-500" />
                {location.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Rest of the component remains the same */}
      <div className="h-96 w-full relative">
        <MapContainer
          key={mapKey}
          center={[selectedLocation.lat, selectedLocation.lon]}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full w-full rounded-md z-[0]"
        >
          <MapClickHandler onLocationSelect={handleMapLocationSelect} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Vendor Marker */}
          <Marker
            position={[VENDOR_LOCATION.lat, VENDOR_LOCATION.lon]}
            icon={L.divIcon({
              className: 'bg-blue-500 text-white p-2 rounded-full text-center',
              html: 'V',
              iconSize: [30, 30]
            })}
          >
            <Popup>Vendor Location</Popup>
          </Marker>

          {/* Selected Location Marker */}
          <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
            <Popup>
              {selectedLocation.display_name}
            </Popup>
          </Marker>

          {/* Route Polyline */}
          {routeGeometry.length > 0 && (
            <Polyline
              positions={routeGeometry}
              color="blue"
              weight={5}
              opacity={0.7}
            />
          )}
        </MapContainer>
        <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md">
          <Crosshair
            size={24}
            className="text-gray-600 cursor-help"
          />
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-4 p-4 bg-secondary-500 shadow-lg rounded-md">
          <h3 className="font-bold">Lokasi Pengiriman</h3>
          <p>{selectedLocation.display_name}</p>
          <p>Latitude: {selectedLocation.lat.toFixed(6)}</p>
          <p>Longitude: {selectedLocation.lon.toFixed(6)}</p>

          {routeDistance !== null && (
            <div className="flex items-center mt-2">
              <Route size={20} className="mr-2 text-blue-500" />
              <p>
                Jarak Tempuh: {(routeDistance / 1000).toFixed(2)} km
                ({routeDistance.toFixed(0)} meters)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}