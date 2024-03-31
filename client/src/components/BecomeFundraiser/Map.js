import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconImage from "../../assets/icon.svg";
import L from "leaflet";

const API_MAPBOX =
  "https://api.mapbox.com/styles/v1/keva2133/clu3sx8ok006h01qr1oxzbd6i/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2V2YTIxMzMiLCJhIjoiY2x1M3NyNjd3MTlzNDJrbnlqenRxeXdqbSJ9.zWd3NeTbrQ_waGdE47ovLA";

const icon = L.icon({
  iconUrl: iconImage,
  iconSize: [38, 38],
});

function ResetCenterView(props) {
  const { position } = props;
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(L.latLng(position[0], position[1]), map.getZoom(), {
        animate: true,
      });
    }
  }, [position]);

  return null;
}

const Map = ({ positionSelect }) => {
  const position = [positionSelect[0], positionSelect[1]];
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: 250 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={API_MAPBOX}
      />
      <Marker position={position} icon={icon} >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <ResetCenterView position={position} />
    </MapContainer>
  );
};

export default Map;
