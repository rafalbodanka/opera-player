import { cleanup, render, screen } from '@testing-library/react';
import Nav from '../components/Nav';

// Mocked data
const mockedSlideData = [
    {
        "id": 0,
        "text": "As you journey through the mystical forest, you stumble upon an ancient oak tree.",
        "imageURL": "mocked-image-0.jpg",
        "audioURL": "http://localhost:5000/get-audio/0"
      },
      //no need to mock more for Nav component
];

const mockedImageUrls = Array.from({ length: 8 }, (_, index) => `mocked-image-${index}.jpg`);

const renderNav = (slideId = 0) => {
  const { rerender } = render(
    <Nav
      slideData={mockedSlideData}
      imageUrls={mockedImageUrls}
      slideId={slideId}
      imgHeight={100}
      imgWidth={800}
      audioLength={1000}
      currentTime={0}
      setCurrentTime={() => {}}
      isPlaying={false}
      setIsPlaying={() => {}}
      isMuted={false}
      setIsMuted={() => {}}
    />
  );

  return rerender;
};

test('renders the correct number of bar elements', () => {
  // Render the Nav component with the initial slideId
  renderNav();

  // Check the number of 'bar' elements
  const barElements = screen.getAllByTestId('bar');
  expect(barElements.length).toBe(8);

  cleanup()

  // Rerender the component with a different slideId
  renderNav(3);

  // Check the number of 'bar' elements after changing the slideId
  const updatedBarElements = screen.getAllByTestId('bar');
  expect(updatedBarElements.length).toBe(8);
});