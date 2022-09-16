import React, { useState, useEffect } from 'react';

const BusRoutes = () => {
    const [availableRoutes, setAvailableRoutes] = useState([]);
    const [showRoutes, setShowRoutes] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [availableDirections, setAvailableDirections] = useState([]);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [availableStops, setAvaliableStops] = useState([]);

    useEffect(() => {
        fetch('https://svc.metrotransit.org/nextripv2/routes')
            .then((response) => response.json())
            .then((response) => { setAvailableRoutes(response) })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }, []);

    const selectRoute = (route) => {
        setSelectedRoute(route);
        if (selectedDirection !== null) {
            setSelectedDirection(null);
        }
        if (availableStops.length > 0) {
            setAvaliableStops([]);
        }
        if (selectedRoute === null || route.route_id !== selectedRoute.route_id) {
            fetch(`https://svc.metrotransit.org/nextripv2/directions/${route.route_id}`)
                .then((response) => response.json())
                .then((response) => setAvailableDirections(response))
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
    };

    const selectDirection = (direction) => {
        setSelectedDirection(direction);
        if (selectedDirection === null || direction.direction_id !== selectedDirection.direction_id) {
            fetch(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute.route_id}/${direction.direction_id}`)
                .then((response) => response.json())
                .then((response) => setAvaliableStops(response))
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
    };

    return (
        <>
            <div style={{ display: 'flex', flexDiretion: 'column' }}>
                <div>
                    {/* Routes Display */}
                    <button onClick={() => setShowRoutes(true)}>Show Available Routes</button>
                    {showRoutes && <div>
                        <ul>
                            {availableRoutes.map((availableRoute) =>
                                <li key={availableRoute.route_id}>
                                    <button onClick={() => { selectRoute(availableRoute) }}>
                                        {availableRoute.route_label}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>}
                </div>
                <div>
                    {/* Directions Display */}
                    {selectedRoute !== null && <div>
                        Directions for <span style={{ fontWeight: 'bold' }}>{selectedRoute.route_label}</span> are:
                    </div>}
                    {availableDirections.map((direction) => <div key={direction.direction_id} style={{ margin: '10px' }}>
                        <button onClick={() => { selectDirection(direction) }}>
                            {direction.direction_name}
                        </button>
                    </div>)}
                </div>
                <div>
                    {/* Stops */}
                    {selectedDirection !== null && <div>
                        Stops on <span style={{ fontWeight: 'bold' }}>{selectedRoute.route_label}</span> <span style={{ fontStyle: 'italics' }}>{selectedDirection.direction_name}</span> are:
                    </div>}
                    {availableStops.map((routeStop) => <div key={routeStop.place_code} style={{ margin: '10px' }}><span style={{ fontWeight: 'bold' }}>{routeStop.description}</span><br />
                        Place Code #:{routeStop.place_code}
                    </div>)}
                </div>
            </div>

        </>
    )
}

export default BusRoutes;