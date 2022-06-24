import Excalidraw from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '@chakra-ui/react';

export type ExcalidrawElementFragment = {
  isDeleted?: boolean;
};

type Props = {
  closeOnClickOutside?: boolean;
  /**
   * The initial set of elements to draw into the scene
   */
  initialElements: ReadonlyArray<ExcalidrawElementFragment>;
  /**
   * Controls the visibility of the modal
   */
  isShown?: boolean;
  /**
   * Completely remove Excalidraw component
   */
  onDelete: () => void;
  /**
   * Handle modal closing
   */
  onHide: () => void;
  /**
   * Callback when the save button is clicked
   */
  onSave: (elements: ReadonlyArray<ExcalidrawElementFragment>) => void;
};

export default function ExcalidrawModal({
  // closeOnClickOutside = false,
  onSave,
  initialElements,
  isShown = false,
  onHide,
  onDelete,
}: Props) {
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
    onHide();
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

  if (isShown === false) {
    return null;
  }

  const onChange = els => {
    setElements(els);
  };

  return null;

  // return (
  //   <Modal  visible={isShown} onOk={save} cancelButton={{ children: '撤销' }} onClose={discard}>
  //     <div style={{ height: '70vh' }}>
  //       <Excalidraw
  //         langCode="zh-CN"
  //         onChange={onChange}
  //         initialData={{
  //           appState: { isLoading: false },
  //           elements: initialElements as ExcalidrawElement[],
  //         }}
  //       />
  //     </div>
  //   </Modal>
  // );
}
