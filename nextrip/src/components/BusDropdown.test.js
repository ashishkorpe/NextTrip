import { render, screen, fireEvent } from '@testing-library/react';
import BusDropdown from './BusDropdown';

const mockedroutes = [
    {
        "route_id": "0",
        "agency_id": 0,
        "route_label": "Select a Route"
    },
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

const selectRoute = jest.fn();

test('renders dropdown', () => {
    render(<BusDropdown routes={mockedroutes} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('should correctly set default option', () => {
    render(<BusDropdown routes={mockedroutes} />);
    expect(screen.getByRole("combobox")).toHaveDisplayValue('Select a Route');
});

test('shows correct number of options', () => {
    render(<BusDropdown routes={mockedroutes} />)
    expect(screen.getAllByRole('option').length).toBe(5);
});

test('allows user to select a route from the dropdown', () => {
    render(<BusDropdown routes={mockedroutes}
        selectRoute={selectRoute} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '904' } });
    let options = screen.getAllByTestId('select-option');
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeTruthy();
});