import { Box, Text, VStack, Icon, HStack } from '@chakra-ui/react';
import { PhoneIcon, CalendarIcon, EmailIcon, createIcon } from '@chakra-ui/icons';

import { useUserProfile } from '../context/user-profile-context.jsx';

export const LocationIcon = createIcon({
  displayName: 'LocationIcon',
  viewBox: '0 0 24 24',
  d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
});

function Data() {
  const { userProfile } = useUserProfile();
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      <Box
        as="li"
        w="full"
        py={3}
        px={5}
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderColor="brand.light">
        <HStack
          justifyContent="space-between"
          w="100%"
          p="4"
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          _hover={{ boxShadow: 'md' }}>
          <HStack spacing={4}>
            <Icon as={PhoneIcon} boxSize={5} color="teal.500" />
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Phone
            </Text>
          </HStack>
          <HStack>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="gray.900"
              as="a"
              href={`tel:${userProfile.phone}`}
              _hover={{ textDecoration: 'underline' }}>
              {userProfile.phone}
            </Text>
          </HStack>
        </HStack>

        <HStack
          justifyContent="space-between"
          w="100%"
          p="4"
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          _hover={{ boxShadow: 'md' }}
          mt={2}>
          <HStack spacing={4}>
            <Icon as={EmailIcon} boxSize={5} color="teal.500" />
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Email
            </Text>
          </HStack>
          <HStack>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="gray.900"
              as="a"
              href={`mailto:${userProfile.email}`}
              _hover={{ textDecoration: 'underline' }}>
              {userProfile.email}
            </Text>
          </HStack>
        </HStack>

        <HStack
          justifyContent="space-between"
          w="100%"
          p="4"
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          _hover={{ boxShadow: 'md' }}
          mt={2}>
          <HStack spacing={4}>
            <Icon as={CalendarIcon} boxSize={5} color="teal.500" />
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Birthdate
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color="gray.900">
            {userProfile.birthdate}
          </Text>
        </HStack>

        <HStack
          justifyContent="space-between"
          w="100%"
          p="4"
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          _hover={{ boxShadow: 'md' }}
          mt={2}>
          <HStack spacing={4}>
            <Icon as={LocationIcon} boxSize={5} color="teal.500" />
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Address
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color="gray.900">
            {userProfile.location}
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
}

export default Data;
