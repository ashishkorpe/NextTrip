import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

const BusRoutes = () => {
    const [availableRoutes, setAvailableRoutes] = useState([]);
    const [showRoutes, setShowRoutes] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [availableDirections, setAvailableDirections] = useState([]);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [availableStops, setAvaliableStops] = useState([]);
    // let history = useHistory();

    useEffect(() => {
        fetch('https://svc.metrotransit.org/nextripv2/routes')
            .then((response) => response.json())
            .then((response) => { setAvailableRoutes(response) })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }, []);

    const selectRoute = (routeID) => {
        setSelectedRoute(routeID);
        console.log(typeof (routeID));
        fetch(`https://svc.metrotransit.org/nextripv2/directions/${routeID}`)
            .then((response) => response.json())
            .then((response) => setAvailableDirections(response))
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    const selectDirection = (directionID) => {
        setSelectedDirection(directionID);
        fetch(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute}/${directionID}`)
            .then((response) => response.json())
            .then((response) => setAvaliableStops(response))
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        // history.push(`/${selectedRoute}/${directionID}`);
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
                                    <button onClick={() => { selectRoute(availableRoute.route_id) }}>
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
                        Selected Route is : {selectedRoute}
                        <br />
                        Directions for this selected Route are:
                    </div>}
                    <ul>
                        {availableDirections.map((direction) => <li key={direction.direction_id}>
                            <button onClick={() => { selectDirection(direction.direction_id) }}>
                                {direction.direction_name}
                            </button>
                        </li>)}
                    </ul>
                </div>
                <div>
                    {/* Stops */}
                    {selectedDirection !== null && <div>
                        SelectedDirection is : {selectedDirection}
                        <br />
                        Stops on this Route are:
                    </div>}
                    <ul>
                        {availableStops.map((routeStop) => <li key={routeStop.place_code}>{routeStop.description} Stop #:{routeStop.place_code}</li>)}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default BusRoutes;