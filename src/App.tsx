import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet_Map from './Components/Map/Leaflet_Map';
import { Button } from 'semantic-ui-react';
import LeafletMacLocation from './Components/Map/LeafletMacLocation';
function App() {
  return (
    <>
    {/* <Leaflet_Map /> */}
    <LeafletMacLocation />
    </>
  );
}

export default App;
