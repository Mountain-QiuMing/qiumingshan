import type { EditorThemeClasses } from 'lexical';

const theme: EditorThemeClasses = {
  characterLimit: 'UltraEditor__characterLimit',
  code: 'UltraEditor__code',
  codeHighlight: {
    keyword: 'UltraEditor__token_keyword',
    builtin: 'UltraEditor__token_builtin',
    'class-name': 'UltraEditor__token_class-name',
    function: 'UltraEditor__token_function',
    boolean: 'UltraEditor__token_boolean',
    number: 'UltraEditor__token_number',
    string: 'UltraEditor__token_string',
    char: 'UltraEditor__token_char',
    symbol: 'UltraEditor__token_symbol',
    regex: 'UltraEditor__token_regex',
    url: 'UltraEditor__token_url',
    operator: 'UltraEditor__token_operator',
    variable: 'UltraEditor__token_variable',
    constant: 'UltraEditor__token_constant',
    property: 'UltraEditor__token_property',
    punctuation: 'UltraEditor__token_punctuation',
    important: 'UltraEditor__token_important',
    comment: 'UltraEditor__token_comment',
    tag: 'UltraEditor__token_tag',
    'attr-name': 'UltraEditor__token_attr-name',
    'attr-value': 'UltraEditor__token_attr-value',
    namespace: 'UltraEditor__token_namespace',
    prolog: 'UltraEditor__token_prolog',
    doctype: 'UltraEditor__token_doctype',
    cdata: 'UltraEditor__token_cdata',
    entity: 'UltraEditor__token_entity',
    bold: 'UltraEditor__token_bold',
    italic: 'UltraEditor__token_italic',
    atrule: 'UltraEditor__token_atrule',
    selector: 'UltraEditor__token_selector',
    inserted: 'UltraEditor__token_inserted',
    delete: 'UltraEditor__token_deleted',
  },
  hashtag: 'UltraEditor__hashtag',
  heading: {
    h1: 'UltraEditor__h1',
    h2: 'UltraEditor__h2',
    h3: 'UltraEditor__h3',
    h4: 'UltraEditor__h4',
    h5: 'UltraEditor__h5',
  },
  image: 'UltraEditor__image',
  link: 'UltraEditor__link',
  list: {
    listitem: 'UltraEditor__listItem',
    listitemChecked: 'UltraEditor__listItemChecked',
    listitemUnchecked: 'UltraEditor__listItemUnchecked',
    nested: {
      listitem: 'UltraEditor__nestedListItem',
    },
    olDepth: ['UltraEditor__ol1', 'UltraEditor__ol2', 'UltraEditor__ol3', 'UltraEditor__ol4', 'UltraEditor__ol5'],
    ul: 'UltraEditor__ul',
  },
  ltr: 'UltraEditor__ltr',
  mark: 'UltraEditor__mark',
  markOverlap: 'UltraEditor__markOverlap',
  paragraph: 'UltraEditor__paragraph',
  quote: 'UltraEditor__quote',
  rtl: 'UltraEditor__rtl',
  table: 'UltraEditor__table',
  tableCell: 'UltraEditor__tableCell',
  tableCellHeader: 'UltraEditor__tableCellHeader',
  text: {
    bold: 'UltraEditor__textBold',
    code: 'UltraEditor__textCode',
    italic: 'UltraEditor__textItalic',
    strikethrough: 'UltraEditor__textStrikethrough',
    subscript: 'UltraEditor__textSubscript',
    superscript: 'UltraEditor__textSuperscript',
    underline: 'UltraEditor__textUnderline',
    underlineStrikethrough: 'UltraEditor__textUnderlineStrikethrough',
  },
};

export default theme;
