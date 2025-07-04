// Import necessary React and Leaflet components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

// Default map center: latitude and longitude of Bangladesh
const position = [23.6850, 90.3563];

// Optional: Define a custom Leaflet marker icon
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which corresponds to marker's location
});

// A helper component to programmatically move the map to a given set of coordinates
function FlyToDistrict({ coords }) {
    const map = useMap(); // Access the Leaflet map instance
    if (coords) {
        // If coordinates are available, fly (animate) to the location
        map.flyTo(coords, 14, { duration: 1.5 });
    }
    return null; // This component doesn't render anything visually
}

// Main map component
const BangladeshMap = ({ serviceCenters }) => {
    // State for the search input text
    const [searchText, setSearchText] = useState('');

    // Coordinates to fly to when a district is found
    const [activeCoords, setActiveCoords] = useState(null);

    // Keep track of the currently active district (for auto-opening popup)
    const [activeDistrict, setActiveDistrict] = useState(null);

    // Handle the district search form submission
    const handleSearch = (e) => {
        e.preventDefault();

        // Find the district object whose name matches the search input
        const district = serviceCenters.find(d =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );

        // If found, update the map coordinates and active district
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district);
        }
    };

    return (
        <div className="h-[800px] w-full rounded-lg overflow-hidden shadow-lg relative">
            {/* Search bar on top of the map */}
            <form
                onSubmit={handleSearch}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md px-4 flex bg-gray-400"
            >
                <input
                    type="text"
                    placeholder="Search district..."
                    className="flex-1 px-4 py-2 border rounded-l-md outline-none"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} // Update input state on change
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                    Go
                </button>
            </form>

            {/* Leaflet Map container */}
            <MapContainer
                center={position}      // Initial center of the map
                zoom={8}               // Initial zoom level
                scrollWheelZoom={false} // Disable zooming by scroll wheel
                className="h-full w-full z-0" // Full height/width
            >
                {/* Load OpenStreetMap tiles */}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* If coordinates are provided, move the map to that location */}
                <FlyToDistrict coords={activeCoords} />

                {/* Render a Marker for each service center */}
                {
                    serviceCenters.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]} // Marker position
                            icon={customIcon} // Custom marker icon
                        >
                            {/* Popup shows district name and covered areas */}
                            <Popup autoOpen={center.district === activeDistrict}>
                                <strong>{center.district}</strong><br />
                                {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    );
};

export default BangladeshMap;
