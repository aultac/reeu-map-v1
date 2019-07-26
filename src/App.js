import React from 'react';
import './App.css';

import md5 from 'md5';
import { state,sequences } from 'cerebral';
import { connect } from '@cerebral/react';

// Need to include the leaflet CSS file
import 'leaflet/dist/leaflet.css';

import { Map, TileLayer, GeoJSON } from 'react-leaflet';

const zoom = 13;

export default connect({
  color: state`color`,
  center: state`center`,
  boundary: state`boundary`,

  mapClicked: sequences`mapClicked`,
  loadBoundary: sequences`loadBoundary`,

}, function App(props) {
console.log('redrawing!!! boundary = ', md5(JSON.stringify(props.boundary)));
  return (
    <div className="App">
      <button onClick={() => props.loadBoundary()}>Load Boundary</button>
      <Map style={{height: "100vh"}} center={props.center} zoom={zoom}>
        <TileLayer
          url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
          subdomains={['mt0','mt1','mt2','mt3']}
        />
        <GeoJSON key={md5(JSON.stringify(props.boundary))} data={props.boundary} color={props.color} onClick={() => props.mapClicked() }/>
      </Map>

    </div>
  );
});

