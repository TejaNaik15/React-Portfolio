import styled from 'styled-components';

export const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; /* Ensures it stays in the background */

  .BgAnimation__svg {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the SVG covers the container */
  }

  @media (max-width: 768px) {
    /* Optional: Adjust for smaller screens if the animation appears too busy or off-center */
    /* For example, you might scale it or reduce its opacity */
  }
`;