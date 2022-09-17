import React from 'react';

const BusDropdown = (props) => {
    const { routes, selectRoute, selectedRoute } = props;
    return (
        <div>
            <select value={selectedRoute} onChange={(e) => selectRoute(e.target.value)} className="bg-indigo-700 text-white rounded-lg h-11 w-52 mt-2">
                {routes.map((route) => <option key={route.route_id} value={route.route_id}>{route.route_label}</option>)}
            </select>
        </div>
    )
}
export default BusDropdown;
