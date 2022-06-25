import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MyModalProps extends ModalProps {
  onOk?: () => void;
  title?: string;
  children: ReactNode;
}

export const MyModal = (props: MyModalProps) => {
  const { title, children, ...modalProps } = props;
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={props.onClose}>
            取消
          </Button>
          <Button colorScheme="primary" onClick={props.onOk}>
            确定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
