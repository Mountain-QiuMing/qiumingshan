import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOk?: () => void;
  onClose: () => void;
  children: ReactNode;
}

export const MyModal = (props: ModalProps) => {
  const { children, ...modalProps } = props;
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            取消
          </Button>
          <Button variant="ghost" onClick={props.onOk}>
            确定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
