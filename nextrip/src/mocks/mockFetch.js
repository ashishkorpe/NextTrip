const routeListResponse = [    
    {
        "route_id": "901",
        "agency_id": 0,
        "route_label": "METRO Blue Line"
    },
    {
        "route_id": "991",
        "agency_id": 0,
        "route_label": "Blue Line Bus"
    },
    {
        "route_id": "902",
        "agency_id": 0,
        "route_label": "METRO Green Line"
    },
    {
        "route_id": "904",
        "agency_id": 0,
        "route_label": "METRO Orange Line"
    }
];

const directionsListResponse = [
    {
        "direction_id": 0,
        "direction_name": "Northbound"
    },
    {
        "direction_id": 1,
        "direction_name": "Southbound"
    }
];

const stopsListResponse = [
    {
        "place_code": "BHOC",
        "description": "Burnsville Heart of the City Station"
    },
    {
        "place_code": "BVPK",
        "description": "I-35W & Burnsville Pkwy Station"
    },
    {
        "place_code": "98ST",
        "description": "I-35W & 98th St Station"
    },
    {
        "place_code": "KNAM",
        "description": "Knox Ave & American Blvd Station"
    },
    {
        "place_code": "KN76",
        "description": "Knox Ave & 76th St Station"
    }
];

export default async function mockFetch(url) {
    switch (url) {
        case "https://svc.metrotransit.org/nextripv2/routes": {
            return {
                ok: true,
                status: 200,
                json: async () => routeListResponse
            };
        }
        case "https://svc.metrotransit.org/nextripv2/directions/904": {
            return {
                ok: true,
                status: 200,
                json: async () => directionsListResponse
            };
        }
        case "https://svc.metrotransit.org/nextripv2/stops/904/0": {
            return {
                ok: true,
                status: 200,
                json: async () => stopsListResponse
            };
        }
        default: {
            throw new Error('Unhandled request');
        }
    }
}