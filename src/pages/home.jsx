import { Box, Spinner } from '@chakra-ui/react';
import Cover from '../components/cover';
import Main from '../components/main';
import { useUserProfile } from '../context/user-profile-context.jsx'; // 假设你把上面的代码放在 UserProfileContext.js 文件中

function Home() {
  const { userProfile } = useUserProfile();
  return userProfile ? (
    <>
      <Cover />
      <Main />
    </>
  ) : (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex="1000"
    >
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Box>
  );
}

export default Home;
