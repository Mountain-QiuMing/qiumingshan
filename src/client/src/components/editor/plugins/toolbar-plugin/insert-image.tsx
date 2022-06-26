import { css } from '@emotion/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState, useRef } from 'react';
import { Tabs, Button, Input, TabList, Tab, TabPanels, TabPanel, UseDisclosureReturn } from '@chakra-ui/react';
import { useEditorPropsContext } from '../../context/editor-props-context';
import { InsertImagePayload, INSERT_IMAGE_COMMAND } from '../images-plugin';
import { toast } from '@/utils/toast';
import Upload, { UploadRef } from '@/components/upload';
import { MyModal } from '@/components/modal';

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
      } else {
        if (!removeImageList.length) {
          return toast.warning('请上传图片');
        }
        insertImages = removeImageList.map(img => ({ src: img.src, altText: '' }));
      }
    }

    insertImage(insertImages);
  };

  const insertImage = (payloads: InsertImagePayload[]) => {
    payloads.forEach(payload => {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    });
    setCurrentTab(0);
    setRemoveImageList([]);
    setFileList([]);
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
    <MyModal css={insetImageDialogStyles} onOk={onSubmitImage} title="插入图片" {...props} size="lg">
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
              defaultValue="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
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
