import Excalidraw from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { FC, useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { MyModal } from '@/components/modal';

export type ExcalidrawElementFragment = {
  isDeleted?: boolean;
};

interface ExcalidrawModalProps {
  visible: boolean;
  onVisibileChange: (visible: boolean) => void;
  initialElements: ReadonlyArray<ExcalidrawElementFragment>;
  onDelete: () => void;
  onHide: () => void;
  onSave: (elements: ReadonlyArray<ExcalidrawElementFragment>) => void;
}

const ExcalidrawModal: FC<ExcalidrawModalProps> = props => {
  const { onSave, initialElements, onDelete, visible } = props;
  const confirmState = useDisclosure();
  const excalidrawRef = useRef(null);
  const excaliDrawModelRef = useRef(null);
  const [elements, setElements] = useState<ReadonlyArray<ExcalidrawElementFragment>>(initialElements);
  const cancelRef = useRef();

  useEffect(() => {
    if (excaliDrawModelRef.current !== null) {
      excaliDrawModelRef.current.focus();
    }
  }, []);

  const save = () => {
    if (elements.filter(el => !el.isDeleted).length > 0) {
      onSave(elements);
    } else {
      onDelete();
    }
    props.onHide();
  };

  const discard = () => {
    if (elements.filter(el => !el.isDeleted).length === 0) {
      onDelete();
    } else {
      confirmState.onOpen();
    }
  };

  useEffect(() => {
    excalidrawRef?.current?.updateScene({ elements: initialElements });
  }, [initialElements]);

  if (visible === false) {
    return null;
  }

  const onChange = els => {
    setElements(els);
  };

  return (
    <>
      <MyModal onOk={save} isOpen={visible} onClose={discard} size="6xl" closeOnOverlayClick={false} title="编辑画板">
        <div style={{ height: '70vh' }}>
          <Excalidraw
            langCode="zh-CN"
            onChange={onChange}
            initialData={{
              appState: { isLoading: false },
              elements: initialElements as ExcalidrawElement[],
            }}
          />
        </div>
      </MyModal>
      <AlertDialog isOpen={confirmState.isOpen} onClose={confirmState.onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              警告
            </AlertDialogHeader>

            <AlertDialogBody>你确定要撤销本次全部的更改吗？</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={confirmState.onClose}>取消</Button>
              <Button colorScheme="red" onClick={props.onHide} ml={3}>
                确定
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ExcalidrawModal;
