import '../../App.css';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMapEvents, Circle, Popup, LayersControl } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

function Leaflet_Map() {
    const [position, setPosition] = useState<any>(null)
    const [currentLocFromNavigator, setCurrentLocFromNavigator] = useState<[number,number]>([0,0])
    const places: { loc_name: string, coords: number[] }[] = [
        { 'loc_name': 'Mumbai', coords: [19.0760, 72.8777] },
        { 'loc_name': 'Thane', coords: [19.2183, 72.9781] },
        { 'loc_name': 'Navi Mumbai', coords: [19.033, 73.0297] },
        { 'loc_name': 'Dadar', coords: [19.010982, 72.846378] }
    ];
    const positions = [
        { lat: 19.0760, lng: 72.8777 },
        { lat: 19.2183, lng: 72.9781 },
        { lat: 19.0330, lng: 73.0297 },
        { lat: 19.010982, lng: 72.846378 },
    ];
useEffect(() => {
    navigator.geolocation.getCurrentPosition(position =>{
        setCurrentLocFromNavigator([position.coords.latitude,position.coords.longitude])
    })
}, [])

const LocationMarker = () =>{
    const map = useMapEvents({
      click(e) {
          setPosition([e.latlng.lat,e.latlng.lng])
        // console.log(e.latlng.lat,e.latlng.lng)
      },
        locationfound(e) {
        //   setPosition(e.latlng)
        //   map.flyTo(e.latlng, map.getZoom())
        },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

    return (
        <div className="leaflet-container">
            <MapContainer center={[19.0760, 72.8777]} zoom={11} scrollWheelZoom={true}>
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

                {/* <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                /> */}
                {/* https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png */}
                {/* https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x} */}
                <Polyline color='blue' positions={positions} />
                {/* <Rectangle bounds={rectangle} /> */}
                <Circle center={[18.9894, 73.1175]}  radius={3000} >
                    <Popup>Popup in Panvel</Popup>
                </Circle>

                {places.map((place: any) => (
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
                ))}

                {/* <Marker position={[19.0760, 72.8777]}> */}
                {/* <Tooltip>Mumbai</Tooltip> */}


                {/* </Marker> */}
               <LocationMarker />
            </MapContainer>
        </div>
    );
}

export default Leaflet_Map;
