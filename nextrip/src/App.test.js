import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Metro Transit Next Trip Screen', () => {
  render(<App />);
  const HeaderElement = screen.getByText(/Metro Transit Next Trip/i);
  expect(HeaderElement).toBeInTheDocument();
});

test('renders Metro Transit bus map', ()=>{
  render(<App />);
  const BusMapElement = screen.getByAltText(/map of metro routes/i);
  expect(BusMapElement).toBeInTheDocument();
});

test('renders Route selection dropdown', ()=>{
  render(<App />);
  const RouteSelectionElement = screen.getByRole("combobox");
  expect(RouteSelectionElement).toBeInTheDocument();
});