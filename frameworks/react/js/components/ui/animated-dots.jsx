import { Box } from "@chakra-ui/layout";
import { keyframes } from "@emotion/react";

// Define keyframes for pulsing animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

// Animated dots inside a Box
export const AnimatedDots = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <Box
      as="span"
      mx="2.6px"
      width="6px"
      height="6px"
      borderRadius="full"
      backgroundColor="#232734"
      animation={`${pulse} 1s ease-in-out infinite`}
    />
    <Box
      as="span"
      mx="2.6px"
      width="6px"
      height="6px"
      borderRadius="full"
      backgroundColor="#232734"
      animation={`${pulse} 1s ease-in-out infinite`}
      animationDelay="0.9s"
    />
    <Box
      as="span"
      mx="2.6px"
      width="6px"
      height="6px"
      borderRadius="full"
      backgroundColor="#232734"
      animation={`${pulse} 1s ease-in-out infinite`}
      animationDelay="1.2s"
    />
  </Box>
);


// Animated dots inside a Box
export const AnimatedTypingDots = () => (
  <Box display="flex" justifyContent="center" alignItems="center" w='2.6rem' mt='3.5px' >
    <Box
      as="span"
      mx="2.6px"
      width="6px"
      height="5px"
      borderRadius="full"
      backgroundColor="#232734"
      animation={`${pulse} 1s ease-in-out infinite`}
    />
    <Box
      as="span"
      mx="2.6px"
      width="6px"
      height="5px"
      borderRadius="full"
      backgroundColor="#232734"
      animation={`${pulse} 1s ease-in-out infinite`}
      animationDelay="0.9s"
    />
    <Box
      as="span"
      mx="2.6px"
      width="6px"
      height="5px"
      borderRadius="full"
      backgroundColor="#232734"
      animation={`${pulse} 1s ease-in-out infinite`}
      animationDelay="1.2s"
    />
  </Box>
);
