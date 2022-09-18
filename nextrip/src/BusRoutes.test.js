import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BusRoutes from '../src/BusRoutes';
import mockFetch from '../src/mocks/mockFetch';

beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
})

afterEach(() => {
    jest.restoreAllMocks();
})

test('shows dropdown', () => {
    render(<BusRoutes />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});

// test('shows directions after selecting a route', async () => {
//     render(<BusRoutes />);
//     fireEvent.change(screen.getByRole('combobox'), { target: { value: '904' } });   
//     await waitFor(()=>{
//         expect(screen.getByRole('heading',{value:'Directions for METRO Orange Line are:'})).toBeInTheDocument();       
//     })
// });
