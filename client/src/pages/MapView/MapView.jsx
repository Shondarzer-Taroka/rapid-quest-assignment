// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for the default marker icon
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import useCommon from '../../hooks/useCommon';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
// });

// const MapView = () => {
//     const [cityData, setCityData] = useState([]);
//     const axiosCommon = useCommon()

//     useEffect(() => {
//         // Fetch city data from your backend (Replace with your API call)
//         const fetchCityData = async () => {
//             const response = await axiosCommon.get('/customer-distribution');
//             const data = response.data
//             setCityData(data);
//         };

//         fetchCityData();
//     }, [axiosCommon]);
//     // console.log(cityData);
    

//     // Dummy function to geocode city names to coordinates (should be replaced by a real geocoding API)
//     const geocodeCity = (cityName) => {
//         const cities = {
//             "New York": { lat: 40.7128, lng: -74.0060 },
//             "Los Angeles": { lat: 34.0522, lng: -118.2437 },
//             "Chicago": { lat: 41.8781, lng: -87.6298 },
//             "San Francisco": { lat: 37.7749, lng: -122.4194 },
//             "London": { lat: 51.5074, lng: -0.1278 },
//             "Paris": { lat: 48.8566, lng: 2.3522 },
//             "Tokyo": { lat: 35.6762, lng: 139.6503 },
//             // Add more cities here
//         };
//         return cities[cityName] || { lat: 0, lng: 0 };
//     };

//     return (
//         <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {cityData.map((city, index) => {
//                 const { lat, lng } = geocodeCity(city._id);
//                 return lat && lng ? (
//                     <Marker key={index} position={[lat, lng]}>
//                         <Popup>
//                             {city._id}: {city.customerCount} customers
//                         </Popup>
//                     </Marker>
//                 ) : null;
//             })}
//         </MapContainer>
//     );
// };

// export default MapView;
