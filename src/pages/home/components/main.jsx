import { Container, Box } from '@chakra-ui/layout';
import InfoList from './info-list';
import Profile from './profile';

export default function Main() {
  return (
    <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
      <Box
        as="aside"
        flex={1}
        mr={{ base: 0, md: 5 }}
        mb={{ base: 5, md: 0 }}
        bg="white"
        rounded="md"
        borderWidth={1}
        borderColor="brand.light"
        style={{ transform: 'translateY(-100px)' }}>
        <Profile />
        <InfoList />
      </Box>
    </Container>
  );
}
