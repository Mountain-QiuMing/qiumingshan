import Excalidraw from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { FC, useEffect, useRef, useState } from 'react';
import { UseDisclosureReturn } from '@chakra-ui/react';
import { MyModal } from '../../../modal';

export type ExcalidrawElementFragment = {
  isDeleted?: boolean;
};

interface ExcalidrawModalProps extends UseDisclosureReturn {
  initialElements: ReadonlyArray<ExcalidrawElementFragment>;
  onDelete: () => void;
  onHide: () => void;
  onSave: (elements: ReadonlyArray<ExcalidrawElementFragment>) => void;
}

const ExcalidrawModal: FC<ExcalidrawModalProps> = props => {
  const { onSave, initialElements, onDelete, ...modalState } = props;
  const excalidrawRef = useRef(null);
  const excaliDrawModelRef = useRef(null);
  const [elements, setElements] = useState<ReadonlyArray<ExcalidrawElementFragment>>(initialElements);

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
      quiteConfirm();
    }
  };

  const quiteConfirm = () => {
    // Modal.confirm({
    //   title: '撤销',
    //   content: '你确定要撤销全部的更改吗？',
    //   onOk: onHide,
    // });
  };

  useEffect(() => {
    excalidrawRef?.current?.updateScene({ elements: initialElements });
  }, [initialElements]);

  if (modalState.isOpen === false) {
    return null;
  }

  const onChange = els => {
    setElements(els);
  };

  return (
    <MyModal onOk={save} {...modalState} onClose={discard} size="6xl" closeOnOverlayClick={false}>
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
  );
};

export default ExcalidrawModal;
