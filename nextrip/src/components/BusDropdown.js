/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';

const BusDropdown = (props) => {
    const { routes, selectRoute, selectedRouteId } = props;
    return (
        <div>
            <select value={selectedRouteId} onChange={(e) => selectRoute(e.target.value)} className="bg-indigo-700 text-white rounded-lg h-11 w-52 mt-2">
                {routes.map((route) => <option data-testid="select-option" role="option" key={route.route_id} value={route.route_id}>{route.route_label}</option>)}
            </select>
        </div>
    )
}
export default BusDropdown;
