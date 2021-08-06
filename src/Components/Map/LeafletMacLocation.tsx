import '../../App.css';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMapEvents, Circle, Popup, LayersControl } from 'react-leaflet';
import { LatLngExpression,Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import myData from './MOCK_DATA.json';
import lightLocationSVG from "./light-loc.svg";
import darkLocationSVG from "./dark-loc.svg";
import combLocationSvg from './round.svg'

export default function LeafletMacLocation() {
    const places: { loc_name: string, coords: number[] }[] = [
        { 'loc_name': 'Mumbai', coords: [19.0760, 72.8777] },
        { 'loc_name': 'Thane', coords: [19.2183, 72.9781] },
        { 'loc_name': 'Navi Mumbai', coords: [19.033, 73.0297] },
        { 'loc_name': 'Dadar', coords: [19.010982, 72.846378] }
    ];
    const lightIcon = new Icon({
        iconUrl: lightLocationSVG,
        iconSize: [30, 30]
      });
      const darkIcon = new Icon({
        iconUrl: darkLocationSVG,
        iconSize: [30, 30]
      });
      const combIcon = new Icon({
        iconUrl: combLocationSvg,
        iconSize: [30, 30]
      });
    
      const handleMapClick =(place: any) =>{
            console.log(place)
      }


    return (
        <div className="leaflet-container">
            <MapContainer center={[19.0760, 72.8777]} zoom={5} scrollWheelZoom={true}>
            <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>


                    <LayersControl.BaseLayer name="OpenStreetMap.SatelitView">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>


                {myData.map((place: any) => (
                    
                    

                    <Marker
                        key={place.id}
                        position={[place.lat,place.lng]}
                        icon={place.status === 'M' ? darkIcon : (place.status ==='F' ? lightIcon : combIcon) }
                        eventHandlers={{ click: () => handleMapClick(place) }}

                    >
                        <Tooltip>{place.id}</Tooltip>
                        <Popup>
                            Server :{place.id} Off <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Popup>
                    </Marker>
                ))}

                   {/* {places.map((place: any) => (
                    <Marker
                        key={place.loc_name}
                        position={place.coords}
                        eventHandlers={{ click: () => console.log(place) }}
                    >
                        <Popup>
                            Location : {place.loc_name} <br />
                            Lat : {place.coords[0]}  <br />
                            Lag : {place.coords[1]}  <br />
                            Server : Off <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Popup>
                    </Marker>
                ))} */}
                {/* <Marker position={[52.665669,36.3693158]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    )
}
