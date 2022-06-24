// import { css } from '@emotion/react';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import { FC, useState, useRef } from 'react';
// import { Toast, Modal, Tabs, Upload, Button, Input } from '@chakra-ui/react';
// import { useEditorPropsContext } from '../../context/editor-props-context';
// import { InsertImagePayload, INSERT_IMAGE_COMMAND } from '../images-plugin';

// interface InsertImageDialogProps {
//   visible: boolean;
//   onVisibleChange: (visible: boolean) => void;
// }

// const InsetImageDialog: FC<InsertImageDialogProps> = props => {
//   const { visible, onVisibleChange } = props;
//   const [editor] = useLexicalComposerContext();
//   const { handleUploadImages } = useEditorPropsContext();
//   const [currentTab, setCurrentTab] = useState('local');
//   const [removeImageList, setRemoveImageList] = useState<{ src: string }[]>([]);
//   const [fileList, setFileList] = useState<UploadRef['imageList']>([]);
//   const removeUrlRef = useRef<HTMLInputElement>();

//   const onSubmitImage = async () => {
//     let insertImages = [];

//     if (currentTab === 'remote') {
//       const removeUrl = removeUrlRef.current.value;

//       if (!removeUrl) {
//         return removeUrlRef.current.focus();
//       }
//       insertImages = [{ src: removeUrl, altText: '' }];
//     } else if (currentTab === 'local') {
//       if (!fileList.length) {
//         return Toast.warning('请选择图片');
//       }

//       if (!handleUploadImages) {
//         insertImages = fileList.map(img => ({ src: img.url, altText: '' }));
//         insertImage(insertImages);
//       } else {
//         if (!removeImageList.length) {
//           return Toast.warning('请上传图片');
//         }
//         insertImage(removeImageList.map(img => ({ src: img.src, altText: '' })));
//       }
//     }
//   };

//   const insertImage = (payloads: InsertImagePayload[]) => {
//     payloads.forEach(payload => {
//       editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
//     });

//     onVisibleChange(false);
//   };

//   const startUpload = async () => {
//     try {
//       const remoteImages = await handleUploadImages(fileList);

//       setRemoveImageList(remoteImages);
//     } catch (e) {
//       throw new Error(e);
//     }
//   };

//   return (
//     <Modal
//       css={insetImageDialogStyles}
//       visible={visible}
//       onClose={() => onVisibleChange(false)}
//       onOk={onSubmitImage}
//       title="插入图片"
//     >
//       <Tabs value={currentTab} onChange={tab => setCurrentTab(tab)}>
//         <Tabs.Item label="本地图片" value="local">
//           <Upload fileList={fileList} onChange={files => setFileList(files)} />
//           {typeof handleUploadImages === 'function' && (
//             <Button disabled={!fileList.length} type="primary" className="start-upload-btn" onClick={startUpload}>
//               开始上传
//             </Button>
//           )}
//         </Tabs.Item>
//         <Tabs.Item label="远程链接" value="remote">
//           <Input
//             ref={removeUrlRef}
//             placeholder="请输入图片地址"
//             defaultValue="https://static01.imgkr.com/temp/f23eb233e5ec4822a62d98593dd6ece8.png"
//           />
//         </Tabs.Item>
//       </Tabs>
//     </Modal>
//   );
// };

// export default InsetImageDialog;

// const insetImageDialogStyles = css`
//   .start-upload-btn {
//     margin-top: 20px;
//   }
// `;

export default () => null;
