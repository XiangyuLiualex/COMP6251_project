import { Height } from "@mui/icons-material";
import { APIProvider, AdvancedMarker, Map, Marker, Pin } from "@vis.gl/react-google-maps";
import React from "react";


export function MapPage() {
    const API_KEY =
        globalThis.GOOGLE_MAPS_API_KEY ?? (process.env.GOOGLE_MAPS_API_KEY as string);

    const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 });

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    } else {
        console.log("Geolocation is not available in your browser.");
    }
    return (
        <React.Fragment >
            <APIProvider apiKey={API_KEY} libraries={['marker']} >
                <div style={{
                    height: '85vh', width: '100%'
                }}>
                    <Map
                        mapId={'bf51a910020fa25a'}
                        defaultZoom={5}
                        defaultCenter={{ lat: position.longitude, lng: position.latitude }}
                        gestureHandling={'greedy'}
                        disableDefaultUI
                    >
                        simple marker
                        {/* < Marker
                            position={{ lat: 10, lng: 10 }}
                            clickable={true}
                            onClick={() => alert('marker was clicked!')}
                            title={'clickable google.maps.Marker'}
                        /> */}

                        {/* advanced marker with customized pin */}
                        {/* <AdvancedMarker
                            position={{ lat: 20, lng: 10 }}
                            title={'AdvancedMarker with customized pin.'}>
                            <Pin
                                background={'#22ccff'}
                                borderColor={'#1e89a1'}
                                glyphColor={'#0f677a'}></Pin>
                        </AdvancedMarker> */}

                        {/* advanced marker with html pin glyph */}
                        {/* <AdvancedMarker
                            position={{ lat: 15, lng: 20 }}
                            title={'AdvancedMarker with customized pin.'}>
                            <Pin background={'#22ccff'} borderColor={'#1e89a1'} scale={1.4}>
                                {/* children are rendered as 'glyph' of pin */}
                        👀
                        {/* </Pin> */}
                        {/* </AdvancedMarker> */}

                        {/* advanced marker with html-content */}
                        {/* <AdvancedMarker
                            position={{ lat: 30, lng: 10 }}
                            title={'AdvancedMarker with custom html content.'}>
                            <div
                                style={{
                                    width: 16,
                                    height: 16,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    background: '#1dbe80',
                                    border: '2px solid #0e6443',
                                    borderRadius: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}></div>
                        </AdvancedMarker> */}

                        {/* simple positioned infowindow
                        {/* <InfoWindow position={{ lat: 40, lng: 0 }} maxWidth={200}>
                    <p>
                        This is the content for another infowindow with <em>HTML</em>
                        -elements.
                    </p>
                </InfoWindow> */}

                        {/* continously updated marker */}
                        {/* <MovingMarker /> */}

                        {/* simple stateful infowindow */}
                        {/* <MarkerWithInfowindow /> */}
                    </Map>
                </div>
            </APIProvider>



        </React.Fragment >
    );
}