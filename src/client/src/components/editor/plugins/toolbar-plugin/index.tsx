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
  $getNodeByKey,
  OUTDENT_CONTENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  TextNode,
  RangeSelection,
  ElementNode,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical';
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
import { $createQuoteNode, $isHeadingNode } from '@lexical/rich-text';
import { $createCodeNode, $isCodeNode, getCodeLanguages } from '@lexical/code';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Select,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AddBoxLineIcon,
  ArrowGoBackLineIcon,
  ArrowGoForwardLineIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
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
import { INSERT_EXCALIDRAW_COMMAND } from '../excalidraw-plugin';
import InsetImageDialog from '../toolbar-plugin/insert-image';
import InsetTableDialog from '../toolbar-plugin/insert-table';
import InsetPollDialog from '../toolbar-plugin/insert-poll';
import InsetNetEastMusicDialog from '../toolbar-plugin/insert-neteast-music';
import LinkEditor from '../../components/link-editor';
import EquationModal from '../../components/equation-modal';
import codeBlockThemes from '../../themes/code-block-themes';
import ColorPicker from '@/components/color-picker';
import InsertBlock from './inset-block';

const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'ul', 'ol']);

const fontSizeList = ['12px', '13px', '14px', '15px', '16px', '18px', '20px', '24px', '28px', '30px', '32px', '40px'];

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
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

const codeBlockThemeList = Object.keys(codeBlockThemes);

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [fontSize, setFontSize] = useState('14px');
  const [fontColor, setFontColor] = useState('inherit');
  const [fontBgColor, setFontBgColor] = useState('inherit');
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [codeTheme, setCodeTheme] = useState<keyof typeof codeBlockThemes>('atom-one-dark');
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const insertImageModalState = useDisclosure();
  const insertTableModalState = useDisclosure();
  const insertEquationModalState = useDisclosure();
  const insertPollModalState = useDisclosure();
  const insertNeteastMusicModalState = useDisclosure();

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

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
            const language = element.getLanguage();
            setCodeLanguage(language || '');
            return;
          }
        }
      }

      setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '15px'));
      setFontColor($getSelectionStyleValueForProperty(selection, 'color', '#000'));
      setFontBgColor($getSelectionStyleValueForProperty(selection, 'background-color', '#fff'));
      // setFontFamily($getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'));
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      _payload => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [editor, updateToolbar]);

  const onCodeLanguageSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);

          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
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
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText],
  );

  const onFontBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ 'background-color': value });
    },
    [applyStyleText],
  );

  const inSertCodeBlock = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
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
              margin-left: var(--ck-space-1);
            }
          }
        `}
      ></Global>

      <InsetImageDialog {...insertImageModalState} />
      <InsetTableDialog {...insertTableModalState} />
      <InsetPollDialog {...insertPollModalState} />
      <InsetNetEastMusicDialog {...insertNeteastMusicModalState} />
      <EquationModal {...insertEquationModalState} />

      <Menu>
        <MenuButton as={Button} className="toolbar-item" variant="outline" leftIcon={<AddBoxLineIcon />}>
          插入
        </MenuButton>
        <MenuList>
          <MenuItem onClick={inSertCodeBlock} icon={<CodeSSlashLineIcon />}>
            代码块
          </MenuItem>
          <MenuItem onClick={insertImageModalState.onOpen} icon={<ImageLineIcon />}>
            图片
          </MenuItem>
          <MenuItem
            icon={<DrawImageIcon />}
            onClick={() => {
              editor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined);
            }}
          >
            画板
          </MenuItem>
          <MenuItem icon={<FormulaIcon />} onClick={insertEquationModalState.onOpen}>
            公式
          </MenuItem>
          <MenuItem
            icon={<CheckboxLineIcon />}
            onClick={() => {
              editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
            }}
          >
            待办事项
          </MenuItem>
          <MenuItem icon={<Table2Icon />} onClick={insertTableModalState.onOpen}>
            表格
          </MenuItem>
          <MenuItem icon={<PollIcon />} onClick={insertPollModalState.onOpen}>
            投票
          </MenuItem>
          <MenuDivider />
          <MenuGroup title="插入第三方服务">
            <MenuItem icon={<NeteaseCloudMusicFillIcon />} onClick={insertNeteastMusicModalState.onOpen}>
              网易云音乐
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <Divider orientation="vertical" />
      <IconButton
        aria-label="撤销"
        icon={<ArrowGoBackLineIcon />}
        className="toolbar-item spaced"
        isDisabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      ></IconButton>

      <IconButton
        aria-label="重做"
        icon={<ArrowGoForwardLineIcon />}
        isDisabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
      />

      {blockType === 'code' ? (
        <>
          <Select className="code-language" width="fit-content" onChange={onCodeLanguageSelect} value={codeLanguage}>
            {getCodeLanguages().map(l => (
              <option label={l} value={l} key={l} />
            ))}
          </Select>
          <Divider orientation="vertical" />
          <Select
            className="code-theme"
            width="fit-content"
            onChange={e => setCodeTheme(e.target.value as keyof typeof codeBlockThemes)}
            value={codeTheme as string}
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
              <InsertBlock blockType={blockType} setBlockType={setBlockType} />
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
            <MenuButton as={IconButton} aria-label="Options" variant="outline">
              <Box px={2}>
                <FontSize2Icon />
                <ArrowDropDownFillIcon />
              </Box>
            </MenuButton>
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
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
                }}
              >
                上标
              </MenuItem>
            </MenuList>
          </Menu>
          <ColorPicker value={fontColor} onChange={onFontColorSelect}>
            <IconButton pl="1" aria-label="字体颜色" ml={2} variant="outline" className="font-color-button">
              <>
                <FontColorIcon />
                <ArrowDropDownFillIcon />
              </>
            </IconButton>
          </ColorPicker>
          <ColorPicker value={fontBgColor} onChange={onFontBgColorSelect}>
            <IconButton pl="1" aria-label="字体背景颜色" ml={2} variant="outline" className="font-color-button">
              <>
                <FontColorIcon />
                <ArrowDropDownFillIcon />
              </>
            </IconButton>
          </ColorPicker>

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
                editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
              }}
            ></IconButton>
          </Tooltip>
          <Divider orientation="vertical" />
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<AlignLeftIcon />}
              aria-label="对齐方式"
              variant="outline"
              className="toolbar-item"
            >
              对齐方式
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
                onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
              >
                <span>左缩进</span>
              </MenuItem>
              <MenuItem
                icon={<IndentIncreaseIcon />}
                onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
              >
                <span>右缩进</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
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
    border-bottom-width: 1px;
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
