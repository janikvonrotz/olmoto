import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

class EventMap extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              height: '400px',
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => (this._googleMapComponent = map)}
            defaultZoom={13}
            defaultCenter={{ lat: 52.4987802, lng: 13.4357891 }}
          >
            {this.props.markers.map((marker, index) => {
              return (
                <Marker
                  { ...marker }
                />
              );
            })}
          </GoogleMap>
        }
      />
    );
  }
}

export default EventMap;
