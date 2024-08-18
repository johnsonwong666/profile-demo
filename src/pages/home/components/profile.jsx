import { useState, useRef } from 'react';
import {
  Avatar,
  AvatarBadge,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Input,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UploadErrorModal from './upload-error-modal';
import { useUserProfile } from '../../../context/user-profile-context';
import { validateEmail, validatePhone } from '../../../utils/index';
import { editProfile, uploadImage } from '../api';

function Profile() {
  const { userProfile, getUserProfile } = useUserProfile();
  const [formData, setFormData] = useState(userProfile);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const { isOpen: isOpenEditModal, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
  const { isOpen: isOpenUploadError, onOpen: onOpenUploadError, onClose: onCloseUploadError } = useDisclosure();

  const profileImage = useRef(null);

  const openChooseImage = () => {
    profileImage.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // 清除当前字段的错误信息
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : 'This field is required',
    }));
  };

  const handleSave = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (Object.keys(newErrors).length === 0) {
      const payload = {
        id: formData.id,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        birthdate: formData.birthdate,
        location: formData.location,
      };

      editProfile(payload)
        .then(() => {
          toast({
            title: 'Profile updated.',
            position: 'top',
            description: 'Your profile was updated successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          getUserProfile();
          onCloseEditModal();
        })
        .catch((error) => {
          toast({
            title: 'An error occurred.',
            position: 'top',
            description: `${error ? error : 'Unable to update profile. Please try again later.'} `,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      setErrors(newErrors); // 否则设置错误状态
    }
  };

  const changeProfileImage = (event) => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const selected = event.target.files[0];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      const formDataInstance = new FormData();
      formDataInstance.append('image', selected);

      uploadImage(formDataInstance)
        .then(async (res) => {
          if (res?.data.url) {
            await editProfile({
              id: userProfile.id,
              avatar: res.data.url,
            });
            getUserProfile();
          }
        })
        .catch((error) => {
          toast({
            title: 'An error occurred.',
            position: 'top',
            description: `${error ? error : 'Unable to upload image. Please try again later.'} `,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      onOpenUploadError();
    }
  };

  return (
    <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
      <Avatar
        size="2xl"
        name={userProfile.username}
        cursor="pointer"
        onClick={openChooseImage}
        src={userProfile.avatar}>
        <AvatarBadge bg="brand.blue" boxSize="1em">
          <svg width="0.4em" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </AvatarBadge>
      </Avatar>
      <input hidden type="file" ref={profileImage} onChange={changeProfileImage} />
      <Button leftIcon={<EditIcon />} onClick={onOpenEditModal} position="absolute" top="10px" right="10px">
        Edit
      </Button>
      <UploadErrorModal isOpen={isOpenUploadError} onClose={onCloseUploadError} />

      <Modal isOpen={isOpenEditModal} onClose={onCloseEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="username" mb={4} isInvalid={errors.username}>
              <FormLabel>UserName</FormLabel>
              <Input name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl id="phone" mb={4} isInvalid={errors.phone}>
              <FormLabel>Phone</FormLabel>
              <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
              <FormErrorMessage>{errors.phone}</FormErrorMessage>
            </FormControl>

            <FormControl id="email" mb={4} isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl id="birthdate" mb={4} isInvalid={errors.birthdate}>
              <FormLabel>Birthdate</FormLabel>
              <Input
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                placeholder="Enter birthdate"
              />
              <FormErrorMessage>{errors.birthdate}</FormErrorMessage>
            </FormControl>

            <FormControl id="location" mb={4} isInvalid={errors.location}>
              <FormLabel>Address</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} placeholder="Enter address" />
              <FormErrorMessage>{errors.location}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onCloseEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={1}>
        <Heading as="h3" fontSize="xl" color="brand.dark">
          {userProfile.username}
        </Heading>
      </VStack>
    </VStack>
  );
}

export default Profile;
