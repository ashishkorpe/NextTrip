import React, { useState, useEffect } from 'react';
import BusDropdown from '../src/components/BusDropdown';
import DirectionIcons from './components/DirectionIcons';

const BusRoutes = () => {
    const [availableRoutes, setAvailableRoutes] = useState([]);
    const [selectedRouteId, setSelectedRouteId] = useState(0);
    const [selectedRouteLabel, setSelectedRouteLabel] = useState('Select a Route');
    const [availableDirections, setAvailableDirections] = useState([]);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [availableStops, setAvaliableStops] = useState([]);

    useEffect(() => {
        fetch('https://svc.metrotransit.org/nextripv2/routes')
            .then((response) => response.json())
            .then((response) => { addADefaultRoute(response) })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }, []);

    const addADefaultRoute = (routes) => {
        let defaultRoute = { route_id: 0, route_label: 'Select a Route' };
        routes.unshift(defaultRoute);
        setAvailableRoutes(routes);
        setSelectedRouteId(routes[0].route_id);
    };

    const selectRoute = (routeID) => {
        let newlySelectedRoute = availableRoutes.filter((route) => route.route_id === routeID);
        if (selectedDirection !== null) {
            setSelectedDirection(null);
        }
        if (availableStops.length > 0) {
            setAvaliableStops([]);
        }

        if (Number(routeID) !== 0 && routeID !== selectedRouteId) {
            console.log('routeID :', routeID);
            fetch(`https://svc.metrotransit.org/nextripv2/directions/${routeID}`)
                .then((response) => response.json())
                .then((response) => setAvailableDirections(response))
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
        if (newlySelectedRoute.length === 0) {
            setSelectedRouteId(0);
            setAvailableDirections([]);
        } else {
            setSelectedRouteId(newlySelectedRoute[0].route_id);
            setSelectedRouteLabel(newlySelectedRoute[0].route_label);
        }
    };

    const selectDirection = (direction) => {
        setSelectedDirection(direction);
        let newRouteID = Number(selectedRouteId);
        if (selectedDirection === null || direction.direction_id !== selectedDirection.direction_id) {
            fetch(`https://svc.metrotransit.org/nextripv2/stops/${newRouteID}/${direction.direction_id}`)
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
            <div className="w-full flex mt-8 mb-8 justify-center space-x-10">
                <div className="w-1/6 border-solid border-2 h-16">
                    {/* Routes Display */}
                    <BusDropdown routes={availableRoutes}
                        selectedRouteId={selectedRouteId}
                        selectRoute={selectRoute}
                    />
                </div>
                <div className="w-1/6 border-solid border-2 h-48">
                    {/* Directions Display */}
                    <div className="mt-2">
                        {selectedRouteId !== 0 && <h4>
                            Directions for <span style={{ fontWeight: 'bold' }}>{selectedRouteLabel}</span> are:
                        </h4>
                        }
                    </div>
                    {availableDirections.map((direction) => <div className="m-4 grid justify-items-center" key={direction.direction_id}>
                        <button className="flex justify-center py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-full" onClick={() => { selectDirection(direction) }}>
                            <span className="">{direction.direction_name}</span> <span className="ml-4">{DirectionIcons[direction.direction_name]}</span>
                        </button>
                    </div>)}
                </div>
                <div className="w-1/6 border-solid border-2">
                    {/* Stops */}
                    <div className="mt-2 px-2">
                        {selectedDirection !== null && <h4>
                            Stops on <span style={{ fontWeight: 'bold' }}>{selectedRouteLabel}</span> <span className="italic">{selectedDirection.direction_name}</span> are:
                        </h4>}
                    </div>
                    {availableStops.map((routeStop) => <div className="m-4 bg-indigo-600 text-white text-center text-base font-semibold rounded-lg" key={routeStop.place_code}><span className="font-bold">{routeStop.description}</span><br />
                        <span className="text-sm">Place Code #:{routeStop.place_code}</span>
                    </div>)}
                </div>
            </div>

        </>
    )
}

export default BusRoutes;