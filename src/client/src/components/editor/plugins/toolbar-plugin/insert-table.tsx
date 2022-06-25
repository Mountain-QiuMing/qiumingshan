import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';
import { NumberInput, useDisclosure } from '@chakra-ui/react';
import { toast } from '@/utils/toast';
import { MyModal } from '@/components/modal';
import { INSERT_TABLE_COMMAND } from '@lexical/table';

interface InsertTableDialogProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const InsetTableDialog: FC<InsertTableDialogProps> = props => {
  const { visible, onVisibleChange } = props;
  const [editor] = useLexicalComposerContext();
  const [columns, setColumns] = useState(4);
  const [rows, setRows] = useState(4);
  const modalState = useDisclosure({ isOpen: visible });

  const onSubmitImage = async () => {
    const r = typeof rows === 'number' && rows >= 2 ? rows : 4;
    const c = typeof columns === 'number' && columns >= 2 ? columns : 4;
    if (r > 10) {
      toast.warning('最多添加 10 行');
      return false;
    }
    if (c > 10) {
      toast.warning('最多添加 10 列');
      return false;
    }
    editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: r, columns: c });
    onVisibleChange(false);
  };

  return (
    <MyModal onOk={onSubmitImage} title="插入表格" {...modalState}>
      <NumberInput key="1" placeholder="行数" value={rows} onChange={(_, e) => setRows(e)} />
      <NumberInput key="2" placeholder="列数" value={columns} onChange={(_, e) => setColumns(e)} />
    </MyModal>
  );
};

export default InsetTableDialog;
