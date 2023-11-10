import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Controls from '../components/Controls';

describe('Controls component', () => {
  test('calls increment function when right button is clicked', () => {
    const setCurrentTimeMock = jest.fn();
    const setAudioLengthMock = jest.fn();
    const setIsPlayingMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter initialEntries={['/0']}>
        <Controls
          slideId={0}
          imageUrls={['url1', 'url2']}
          setCurrentTime={setCurrentTimeMock}
          setAudioLength={setAudioLengthMock}
          setIsPlaying={setIsPlayingMock}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText('RIGHT'));

    expect(setCurrentTimeMock).toHaveBeenCalledWith(0);
    expect(setAudioLengthMock).toHaveBeenCalledWith(1000);
  });

  test('calls decrement function when left button is clicked', () => {
    const setCurrentTimeMock = jest.fn();
    const setAudioLengthMock = jest.fn();
    const setIsPlayingMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Controls
          slideId={1}
          imageUrls={['url1', 'url2']}
          setCurrentTime={setCurrentTimeMock}
          setAudioLength={setAudioLengthMock}
          setIsPlaying={setIsPlayingMock}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText('LEFT'));

    expect(setCurrentTimeMock).toHaveBeenCalledWith(0);
    expect(setAudioLengthMock).toHaveBeenCalledWith(1000);
  });
});