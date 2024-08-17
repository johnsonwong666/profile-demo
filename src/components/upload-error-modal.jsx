import {
  Badge,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function UploadErrorModal(props) {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Something went wrong</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>File not supported!</Text>
          <HStack mt={1}>
            <Text color="brand.cadet" fontSize="sm">
              Supported types:
            </Text>
            <Badge colorScheme="green">PNG</Badge>
            <Badge colorScheme="green">JPG</Badge>
            <Badge colorScheme="green">JPEG</Badge>
            <Badge colorScheme="green">WEBP</Badge>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

UploadErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
};
