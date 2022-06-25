import { css } from '@emotion/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState, useRef } from 'react';
import { Tabs, Button, Input, TabList, Tab, TabPanels, TabPanel, UseDisclosureReturn } from '@chakra-ui/react';
import { useEditorPropsContext } from '../../context/editor-props-context';
import { InsertImagePayload, INSERT_IMAGE_COMMAND } from '../images-plugin';
import { toast } from '../../../../utils/toast';
import { MyModal } from '../../../modal';
import Upload, { UploadRef } from '../../../upload';

interface InsertImageDialogProps extends UseDisclosureReturn {}

const InsetImageDialog: FC<InsertImageDialogProps> = props => {
  const [editor] = useLexicalComposerContext();
  const { handleUploadImages } = useEditorPropsContext();
  const [currentTab, setCurrentTab] = useState(0);
  const [removeImageList, setRemoveImageList] = useState<{ src: string }[]>([]);
  const [fileList, setFileList] = useState<UploadRef['imageList']>([]);
  const removeUrlRef = useRef<HTMLInputElement>();

  const onSubmitImage = async () => {
    let insertImages = [];

    if (currentTab === 1) {
      const removeUrl = removeUrlRef.current.value;

      if (!removeUrl) {
        return removeUrlRef.current.focus();
      }
      insertImages = [{ src: removeUrl, altText: '' }];
    } else if (currentTab === 0) {
      if (!fileList.length) {
        return toast.warning('请选择图片');
      }

      if (!handleUploadImages) {
        insertImages = fileList.map(img => ({ src: img.url, altText: '' }));
        insertImage(insertImages);
      } else {
        if (!removeImageList.length) {
          return toast.warning('请上传图片');
        }
        insertImage(removeImageList.map(img => ({ src: img.src, altText: '' })));
      }
    }
  };

  const insertImage = (payloads: InsertImagePayload[]) => {
    payloads.forEach(payload => {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    });

    props.onClose();
  };

  const startUpload = async () => {
    try {
      const remoteImages = await handleUploadImages(fileList);

      setRemoveImageList(remoteImages);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <MyModal css={insetImageDialogStyles} onOk={onSubmitImage} title="插入图片" {...props}>
      <Tabs onChange={e => setCurrentTab(e)}>
        <TabList>
          <Tab>本地图片</Tab>
          <Tab>远程链接</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Upload fileList={fileList} onChange={files => setFileList(files)} />
            {typeof handleUploadImages === 'function' && (
              <Button disabled={!fileList.length} className="start-upload-btn" onClick={startUpload}>
                开始上传
              </Button>
            )}
          </TabPanel>
          <TabPanel>
            <Input
              ref={removeUrlRef}
              placeholder="请输入图片地址"
              defaultValue="https://static01.imgkr.com/temp/f23eb233e5ec4822a62d98593dd6ece8.png"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MyModal>
  );
};

export default InsetImageDialog;

const insetImageDialogStyles = css`
  .start-upload-btn {
    margin-top: 20px;
  }
`;
