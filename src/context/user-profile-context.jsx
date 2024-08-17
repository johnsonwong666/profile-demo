import { createContext, useContext, useState, useEffect } from 'react';
import api from '../libs/api';
const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    getUserProfile();
  }, []);
  async function getUserProfile() {
    const res = await api.get('api/profile/get-profile');
    if (res?.data?.user) {
      setUserProfile(res.data.user);
    }
  }
  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, getUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
