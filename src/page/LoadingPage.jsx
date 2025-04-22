// components/LoadingOverlay.jsx
import { Spinner } from "@chakra-ui/react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/10   backdrop-blur-md flex items-center justify-center z-50">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
};

export default LoadingOverlay;
