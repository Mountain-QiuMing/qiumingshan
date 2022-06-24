import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
  OUTDENT_CONTENT_COMMAND,
  INDENT_CONTENT_COMMAND,
} from 'lexical';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  $getSelectionStyleValueForProperty,
  $wrapLeafNodesInElements,
  $isAtNodeEnd,
  $patchStyleText,
} from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
  INSERT_CHECK_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $createCodeNode, $isCodeNode, getDefaultCodeLanguage, getCodeLanguages } from '@lexical/code';
import {
  Button,
  // ColorPicker,
  // ConfigProviderProps,
  Divider,
  IconButton,
  // Dropdown,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  Select,
  Toast,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import {
  AddBoxLineIcon,
  ArrowGoBackLineIcon,
  ArrowGoForwardLineIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  H4Icon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  FontSize2Icon,
  CodeSSlashLineIcon,
  IndentDecreaseIcon,
  IndentIncreaseIcon,
  LinksLineIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  DoubleQuotesLIcon,
  SubscriptIcon,
  SuperscriptIcon,
  SeparatorIcon,
  ImageLineIcon,
  Table2Icon,
  DrawImageIcon,
  PollIcon,
  CheckboxLineIcon,
  FontColorIcon,
  ArrowDropDownFillIcon,
  NeteaseCloudMusicFillIcon,
  FormulaIcon,
} from 'ultra-icon';
import { css, Global } from '@emotion/react';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { INSERT_EXCALIDRAW_COMMAND } from './excalidraw-plugin';
import { INSERT_POLL_COMMAND } from './poll-plugin';
import InsetImageDialog from './toolbar-plugin/insert-image';
import LinkEditor from '../components/link-editor';
import { INSERT_NETEAST_MUSIC_COMMAND } from './neteast-music-plugin';
import getUrlParam from '../utils/get-url-param';
import EquationModal from '../components/equation-modal';
import codeBlockThemes from '../themes/code-block-themes';

const LowPriority = 1;

const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'ul', 'ol']);

const fontSizeList = ['12px', '13px', '14px', '15px', '16px', '18px', '20px', '24px', '28px', '30px', '32px', '40px'];

function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();

  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();

  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function BlockOptionsDropdownList({ editor, blockType, setBlockType }) {
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingType: HeadingTagType) => {
    if (blockType !== headingType) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode(headingType));
        }
      });
    }
  };

  const typeMap = {
    paragraph: formatParagraph,
    h1: () => formatHeading('h1'),
    h2: () => formatHeading('h2'),
    h3: () => formatHeading('h3'),
    h4: () => formatHeading('h4'),
  };

  const onChangeBlockType = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setBlockType(type);
    typeMap[type]();
  };

  return (
    <Select
      css={blockSelectStyle}
      value={Object.keys(typeMap).includes(blockType) ? blockType : 'paragraph'}
      onChange={onChangeBlockType}
      width={20}
    >
      <option label="正文" value="paragraph">
        {/* <AlignJustifyIcon />
        <span className="text">正文</span> */}
      </option>
      <option label="标题1" value="h1">
        {/* <H1Icon />
        <span className="h1">标题1</span> */}
      </option>
      <option label="标题2" value="h2">
        {/* <H2Icon />
        <span className="h2">标题2</span> */}
      </option>
      <option label="标题3" value="h3">
        {/* <H3Icon />
        <span className="h3">标题3</span> */}
      </option>
      <option label="标题4" value="h4">
        {/* <H4Icon />
        <span className="h4">标题4</span> */}
      </option>
    </Select>
  );
}

const blockSelectStyle = css`
  .ultra-select-option,
  .ultra-select__selection {
    display: flex;
    align-items: center;
    .ultra-icon {
      margin-right: 10px;
    }
  }
`;

const codeBlockThemeList = Object.keys(codeBlockThemes);

export default function ToolbarPlugin() {
  // const { theme } = useUltraContext();
  // const { primaryColor } = theme.style;
  // const { textColor } = theme[theme.mode];
  const theme = useTheme();
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [fontSize, setFontSize] = useState('14px');
  const [fontColor, setFontColor] = useState('#000');
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [codeTheme, setCodeTheme] = useState<keyof typeof codeBlockThemes>('atom-one-dark');
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const rowsRef = useRef<HTMLInputElement>();
  const columnsRef = useRef<HTMLInputElement>();
  const questionRef = useRef<HTMLInputElement>();
  const [equationVisible, setEquationVisible] = useState(false);
  const neteastMusicRef = useRef<HTMLInputElement>();
  const [insertImageModalVisible, setInsertImageModalVisible] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();

          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();

          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }

      setIsBold(selection.hasFormat('bold'));
      setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '14px'));
      setFontColor($getSelectionStyleValueForProperty(selection, 'color', fontColor));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));

      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        _payload => {
          updateToolbar();

          return false;
        },
        LowPriority,
      ),
      editor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);

          return false;
        },
        LowPriority,
      ),
      editor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);

          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  const onCodeLanguageSelect = useCallback(
    value => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);

          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [editor, selectedElementKey],
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const applyStyleText = useCallback(
    styles => {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [editor],
  );

  const onFontSizeSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      applyStyleText({ 'font-size': e.target.value });
    },
    [applyStyleText],
  );

  const onFontColorSelect = useCallback(
    value => {
      applyStyleText({ color: value });
    },
    [applyStyleText],
  );

  const inSertCodeBlock = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createCodeNode());
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, {});
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, {});
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, {});
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, {});
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  };

  return (
    <div className="toolbar" css={toolbarStyles()} ref={toolbarRef}>
      <Global
        styles={css`
          ${codeTheme && codeBlockThemes[codeTheme]};
          .ultra-icon {
            svg {
              width: 18px;
              height: 18px;
              fill: currentColor;
              /* font-size: var(--ck-fontSizes-xs); */
            }
            & + * {
              margin-left: 8px;
            }
          }
        `}
      ></Global>

      {/* <InsetImageDialog visible={insertImageModalVisible} onVisibleChange={setInsertImageModalVisible} /> */}

      {/* <Dropdown
        trigger="click"
        content={
          <>
            <Dropdown.Item onClick={inSertCodeBlock}>
              <CodeSSlashLineIcon />
              <span>代码块</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setInsertImageModalVisible(true)}>
              <ImageLineIcon />
              <span>图片</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                editor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, {});
              }}
            >
              <DrawImageIcon />
              <span>画板</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setEquationVisible(true)}>
              <FormulaIcon />
              <span>公式</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, {});
              }}
            >
              <CheckboxLineIcon />
              <span>待办事项</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                // Modal.confirm({
                //   title: '插入表格',
                //   content: (
                //     <>
                //       <Input key="1" label="行数" defaultValue="4" ref={rowsRef} />
                //       <br />
                //       <Input key="2" label="列数" defaultValue="4" ref={columnsRef} />
                //     </>
                //   ),
                //   onOk: () => {
                //     const rows = parseInt(rowsRef.current.value);
                //     const columns = parseInt(columnsRef.current.value);
                //     const r = typeof rows === 'number' && rows >= 2 ? rows : 4;
                //     const c = typeof columns === 'number' && columns >= 2 ? columns : 4;
                //     if (r > 10) {
                //       Toast.warning('最多添加 10 行');
                //       return false;
                //     }
                //     if (c > 10) {
                //       Toast.warning('最多添加 10 列');
                //       return false;
                //     }
                //     editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: r, columns: c });
                //   },
                // });
              }}
            >
              <Table2Icon />
              <span>表格</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                // Modal.confirm({
                //   title: '插入投票',
                //   content: <Input label="投票标题" defaultValue="" ref={questionRef} />,
                //   onOk: () => {
                //     if (!questionRef.current.value) {
                //       questionRef.current.focus();
                //       return false;
                //     }
                //     editor.dispatchCommand(INSERT_POLL_COMMAND, questionRef.current.value);
                //   },
                // });
              }}
            >
              <PollIcon />
              <span>投票</span>
            </Dropdown.Item>
            <Dropdown.Title>插入第三方服务</Dropdown.Title>
            <Dropdown.Item
              onClick={() => {
                // Modal.confirm({
                //   title: '网易云音乐',
                //   content: (
                //     <Input
                //       style={{ width: 300 }}
                //       label="网易云音乐链接"
                //       defaultValue="https://music.163.com/#/song?id=1945895585"
                //       ref={neteastMusicRef}
                //       placeholder="https://music.163.com/#/song?id=1945895585"
                //     />
                //   ),
                //   onOk: () => {
                //     const url = neteastMusicRef.current.value;

                //     if (!url) {
                //       neteastMusicRef.current.focus();

                //       return false;
                //     }

                //     const id = getUrlParam('id', url);

                //     if (!id) {
                //       return false;
                //     }
                //     console.log(id);

                //     editor.dispatchCommand(INSERT_NETEAST_MUSIC_COMMAND, id);
                //   },
                // });
              }}
            >
              <NeteaseCloudMusicFillIcon />
              <span>网易云音乐</span>
            </Dropdown.Item>
          </>
        }
      >
        <Button className="toolbar-item" type="pure">
          <AddBoxLineIcon />
          <span>插入</span>
        </Button>
      </Dropdown> */}
      <IconButton
        aria-label="撤销"
        icon={<ArrowGoBackLineIcon />}
        className="toolbar-item spaced"
        isDisabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, {});
        }}
      ></IconButton>

      <IconButton
        aria-label="重做"
        icon={<ArrowGoForwardLineIcon />}
        isDisabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, {});
        }}
        className="toolbar-item"
      />

      {blockType === 'code' ? (
        <>
          <Select className="code-language" onChange={onCodeLanguageSelect} value={codeLanguage}>
            {getCodeLanguages().map(l => (
              <option label={l} value={l} key={l} />
            ))}
          </Select>
          <Divider orientation="vertical" />
          <Select
            className="code-theme"
            onChange={e => setCodeTheme(e.target.value as keyof typeof codeBlockThemes)}
            value={codeTheme}
          >
            {codeBlockThemeList.map(theme => (
              <option label={theme} value={theme} key={theme} />
            ))}
          </Select>
        </>
      ) : (
        <>
          <Divider orientation="vertical" />
          {supportedBlockTypes.has(blockType) && (
            <>
              <BlockOptionsDropdownList editor={editor} blockType={blockType} setBlockType={setBlockType} />
              <Divider orientation="vertical" />
            </>
          )}
          <Select value={fontSize} onChange={onFontSizeSelect} width={20}>
            {fontSizeList.map(font => (
              <option value={font} key={font}>
                {font}
              </option>
            ))}
          </Select>
          <Divider orientation="vertical" />
          <Tooltip title="加粗">
            <IconButton
              aria-label="text-bold"
              icon={<BoldIcon />}
              color={isBold ? 'primary.500' : ''}
              className="toolbar-item"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
              }}
            ></IconButton>
          </Tooltip>
          <Tooltip title="斜体">
            <IconButton
              aria-label="text-italic"
              icon={<ItalicIcon />}
              color={isItalic ? 'primary.500' : ''}
              className="toolbar-item"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
              }}
            ></IconButton>
          </Tooltip>
          <Tooltip title="下划线">
            <IconButton
              aria-label="text-underline"
              icon={<UnderlineIcon />}
              color={isUnderline ? 'primary.500' : ''}
              className="toolbar-item"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
              }}
            ></IconButton>
          </Tooltip>
          <Tooltip title="删除线">
            <IconButton
              aria-label="text-strikethough"
              icon={<StrikethroughIcon />}
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
              }}
              color={isStrikethrough ? 'primary.500' : ''}
              className="toolbar-item"
            ></IconButton>
          </Tooltip>
          <Menu>
            <MenuButton as={IconButton} aria-label="Options" icon={<FontSize2Icon />} variant="outline" />
            <MenuList>
              <MenuItem
                icon={<CodeSSlashLineIcon />}
                command="⌘T"
                onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                }}
              >
                行内代码
              </MenuItem>
              <MenuItem
                icon={<SuperscriptIcon />}
                command="⌘T"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')}
              >
                下标
              </MenuItem>
              <MenuItem
                icon={<SubscriptIcon />}
                command="⌘N"
                onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
                }}
              >
                上标
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <ColorPicker value={fontColor} onChange={onFontColorSelect}>
            <Button icon={<ArrowDropDownFillIcon />} className="font-color-button">
              <FontColorIcon />
            </Button>
          </ColorPicker> */}
          <Tooltip label="链接">
            <IconButton
              aria-label="链接"
              icon={<LinksLineIcon />}
              onClick={insertLink}
              color={isStrikethrough ? 'primary.500' : ''}
              className="toolbar-item"
            ></IconButton>
          </Tooltip>

          {isLink && <LinkEditor />}

          <Tooltip label="列表">
            <IconButton
              aria-label="列表"
              icon={<ListUnorderedIcon />}
              color={blockType === 'ul' ? 'primary.500' : ''}
              className="toolbar-item"
              onClick={formatBulletList}
            ></IconButton>
          </Tooltip>
          <Tooltip label="有序列表">
            <IconButton
              aria-label="有序列表"
              icon={<ListOrderedIcon />}
              color={blockType === 'ol' ? 'primary.500' : ''}
              className="toolbar-item"
              onClick={formatNumberedList}
            ></IconButton>
          </Tooltip>

          <Tooltip label="引用">
            <IconButton
              aria-label="引用"
              icon={<DoubleQuotesLIcon />}
              color={blockType === 'quote' ? 'primary.500' : ''}
              className="toolbar-item"
              onClick={formatQuote}
            ></IconButton>
          </Tooltip>

          <Tooltip label="分隔符">
            <IconButton
              aria-label="分隔符"
              icon={<SeparatorIcon />}
              className="toolbar-item"
              onClick={() => {
                editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, {});
              }}
            ></IconButton>
          </Tooltip>
          <Divider orientation="vertical" />
          <Menu>
            <MenuButton as={Button} icon={<AlignLeftIcon />} className="toolbar-item">
              <span>对齐方式</span>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<AlignLeftIcon />} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}>
                <span>左对齐</span>
              </MenuItem>
              <MenuItem
                icon={<AlignCenterIcon />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
              >
                <span>居中对齐</span>
              </MenuItem>
              <MenuItem
                icon={<AlignRightIcon />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
              >
                <span>右对齐</span>
              </MenuItem>
              <MenuItem
                icon={<AlignJustifyIcon />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
              >
                <span>两边对齐</span>
              </MenuItem>
              <Divider />
              <MenuItem
                icon={<IndentDecreaseIcon />}
                onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, {})}
              >
                <span>左缩进</span>
              </MenuItem>
              <MenuItem
                icon={<IndentIncreaseIcon />}
                onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, {})}
              >
                <span>右缩进</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
      {/* <EquationModal visible={equationVisible} onVisibleChange={v => setEquationVisible(v)} /> */}
    </div>
  );
}

const toolbarStyles = () => {
  return css`
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    padding: 8px 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    /* background-color: backgroundColor; */
    vertical-align: middle;
    overflow: auto;

    .chakra-divider[aria-orientation='vertical'] {
      height: 20px;
      margin: 0 8px;
    }

    .toolbar-item {
      padding: 8px;
      margin: 0 4px;
      background-color: transparent;
    }

    .toolbar-item:hover:not([disabled]) {
      background-color: rgba(204, 204, 204, 0.3);
    }

    .font-color-button {
      .ultra-icon:last-of-type {
        margin-left: 0;
      }
    }
  `;
};
