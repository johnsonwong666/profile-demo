import { useRef } from 'react';
import { Box, Button, Image, Text, useDisclosure } from '@chakra-ui/react';
import UploadErrorModal from './upload-error-modal';
import { useUserProfile } from '../context/user-profile-context.jsx';
import api from '../libs/api';

export default function Cover() {
  const { userProfile, getUserProfile } = useUserProfile();
  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openChooseFile = () => {
    inputRef.current.click();
  };

  const handleChangeCover = (event) => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const selected = event.target.files[0];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      const formData = new FormData();
      formData.append('image', selected);

      api
        .post('api/common/upload', formData)
        .then(async (data) => {
          if (data?.data.url) {
            await api.post('api/profile/edit-profile', {
              id: userProfile.id,
              cover: data.data.url,
            });
            getUserProfile();
          } else {
            console.error('Upload failed:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      onOpen();
    }
  };

  return (
    <Box h={60} overflow="hidden">
      <Image
        w="full"
        h="full"
        objectFit="cover"
        src={
          userProfile.cover
            ? userProfile.cover
            : 'cdn.jsdelivr.net/gh/johnsonwong666/img/DALL%C2%B7E%202024-08-17%2019.14.25%20-%20A%20simple%2C%20clean%20background%20image%20with%20a%20pure%20white%20background.%20The%20design%20should%20be%20entirely%20minimalistic%2C%20with%20no%20gradients%2C%20textures%2C%20or%20additional%20.webp'
        }
        alt="Cover"
      />
      <Button onClick={openChooseFile} position="absolute" top={4} right={4} variant="ghost">
        <svg width="1.2em" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
        <Text ml={2}>Change Cover</Text>
        <input ref={inputRef} type="file" onChange={handleChangeCover} hidden />
      </Button>
      <UploadErrorModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
