import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { getProfile } from '../pages/home/api/index';
const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const toast = useToast();
  useEffect(() => {
    getUserProfile();
  }, []);
  async function getUserProfile() {
    try {
      const res = await getProfile();
      if (res?.data?.user) {
        setUserProfile(res.data.user);
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        position: 'top',
        description: `${error ? error : 'Unable to get profile. Please try again later.'} `,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, getUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
