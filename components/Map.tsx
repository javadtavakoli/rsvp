import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "/icons/location.svg",
  iconRetinaUrl: "/icons/location.svg",

  iconSize: new L.Point(40, 40),
});
const MapComponent = () => {
  return (
    <MapContainer
      center={[29.565774, 55.545162]}
      style={{ height: "100%", width: "100%" }}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={markerIcon} position={[29.565774, 55.545162]}></Marker>
    </MapContainer>
  );
};
export default MapComponent;
