import { render, screen, cleanup, waitFor } from '@testing-library/react';
import App from './App';

afterEach(cleanup)

test('renders Main component when path is /:slideId', () => {

    const location = {
        ...window.location,
        pathname: '/2'
      };
      Object.defineProperty(window, 'location', {
        writable: true,
        value: location,
      })

    render(
        <App />
    );
    const mainElement = screen.getByTestId('main-component');
    expect(mainElement).toBeInTheDocument();
});

test('invalid route navigates to /0', () => {

    const location = {
        ...window.location,
        pathname: '/asd'
      };
      Object.defineProperty(window, 'location', {
        writable: true,
        value: location,
      })

    render(
        <App />
    );

    waitFor(() => {
        expect(window.location.pathname).toBe('/0')
    })
});