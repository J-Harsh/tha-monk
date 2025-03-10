import Container from "./Container";
import Flex from "./Flex";
import Typography from "./Typography";

const Loader = () => {
  return (
    <Flex center className="gap-4 m-6">
      <Typography className="text-primary">Loading</Typography>
      <Container className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></Container>
    </Flex>
  );
};

export default Loader;
