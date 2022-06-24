import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #111b27;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[data-highlight-language]::-moz-selection,
  pre[data-highlight-language] ::-moz-selection,
  code[data-highlight-language]::-moz-selection,
  code[data-highlight-language] ::-moz-selection {
    background: #8da1b9;
  }

  pre[data-highlight-language]::selection,
  pre[data-highlight-language] ::selection,
  code[data-highlight-language]::selection,
  code[data-highlight-language] ::selection {
    background: #8da1b9;
  }

  /* Code blocks */
  pre[data-highlight-language] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[data-highlight-language],
  pre[data-highlight-language] {
    background: #e3eaf2;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_doctype,
  .UltraEditor__token_cdata {
    color: #3c526d;
  }

  .UltraEditor__token_punctuation {
    color: #111b27;
  }

  .UltraEditor__token_delimiter.important,
  .UltraEditor__token_selector .parent,
  .UltraEditor__token_tag,
  .UltraEditor__token_tag .UltraEditor__token_punctuation {
    color: #006d6d;
  }

  .UltraEditor__token_attr-name,
  .UltraEditor__token_boolean,
  .UltraEditor__token_boolean.important,
  .UltraEditor__token_number,
  .UltraEditor__token_constant,
  .UltraEditor__token_selector .UltraEditor__token_attribute {
    color: #755f00;
  }

  .UltraEditor__token_class-name,
  .UltraEditor__token_key,
  .UltraEditor__token_parameter,
  .UltraEditor__token_property,
  .UltraEditor__token_property-access,
  .UltraEditor__token_variable {
    color: #005a8e;
  }

  .UltraEditor__token_attr-value,
  .UltraEditor__token_inserted,
  .UltraEditor__token_color,
  .UltraEditor__token_selector .UltraEditor__token_value,
  .UltraEditor__token_string,
  .UltraEditor__token_string .UltraEditor__token_url-link {
    color: #116b00;
  }

  .UltraEditor__token_builtin,
  .UltraEditor__token_keyword-array,
  .UltraEditor__token_package,
  .UltraEditor__token_regex {
    color: #af00af;
  }

  .UltraEditor__token_function,
  .UltraEditor__token_selector .UltraEditor__token_class,
  .UltraEditor__token_selector .UltraEditor__token_id {
    color: #7c00aa;
  }

  .UltraEditor__token_atrule .UltraEditor__token_rule,
  .UltraEditor__token_combinator,
  .UltraEditor__token_keyword,
  .UltraEditor__token_operator,
  .UltraEditor__token_pseudo-class,
  .UltraEditor__token_pseudo-element,
  .UltraEditor__token_selector,
  .UltraEditor__token_unit {
    color: #a04900;
  }

  .UltraEditor__token_deleted,
  .UltraEditor__token_important {
    color: #c22f2e;
  }

  .UltraEditor__token_keyword-this,
  .UltraEditor__token_this {
    color: #005a8e;
  }

  .UltraEditor__token_important,
  .UltraEditor__token_keyword-this,
  .UltraEditor__token_this,
  .UltraEditor__token_bold {
    font-weight: bold;
  }

  .UltraEditor__token_delimiter.important {
    font-weight: inherit;
  }

  .UltraEditor__token_italic {
    font-style: italic;
  }

  .UltraEditor__token_entity {
    cursor: help;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_title,
  [data-highlight-language='markdown'] .UltraEditor__token_title .UltraEditor__token_punctuation {
    color: #005a8e;
    font-weight: bold;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_blockquote.punctuation {
    color: #af00af;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_code {
    color: #006d6d;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_hr.punctuation {
    color: #005a8e;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url > .UltraEditor__token_content {
    color: #116b00;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url-link {
    color: #755f00;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_list.punctuation {
    color: #af00af;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_table-header {
    color: #111b27;
  }

  [data-highlight-language='js']on .UltraEditor__token_operator {
    color: #111b27;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_variable {
    color: #006d6d;
  }

  /* overrides color-values for the Show Invisibles plugin
 * https://prismjs.com/plugins/show-invisibles/
 */
  .UltraEditor__token_token.tab:not(:empty):before,
  .UltraEditor__token_token.cr:before,
  .UltraEditor__token_token.lf:before,
  .UltraEditor__token_token.space:before {
    color: #3c526d;
  }

  /* overrides color-values for the Toolbar plugin
 * https://prismjs.com/plugins/toolbar/
 */
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button {
    color: #e3eaf2;
    background: #005a8e;
  }

  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus {
    color: #e3eaf2;
    background: #005a8eda;
    text-decoration: none;
  }

  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
    color: #e3eaf2;
    background: #3c526d;
  }

  /* overrides color-values for the Line Highlight plugin
 * http://prismjs.com/plugins/line-highlight/
 */
  .line-highlight.line-highlight {
    background: #8da1b92f;
    background: linear-gradient(to right, #8da1b92f 70%, #8da1b925);
  }

  .line-highlight.line-highlight:before,
  .line-highlight.line-highlight[data-end]:after {
    background-color: #3c526d;
    color: #e3eaf2;
    box-shadow: 0 1px #8da1b9;
  }

  pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before {
    background-color: #3c526d1f;
  }

  /* overrides color-values for the Line Numbers plugin
 * http://prismjs.com/plugins/line-numbers/
 */
  .line-numbers.line-numbers .line-numbers-rows {
    border-right: 1px solid #8da1b97a;
    background: #d0dae77a;
  }

  .line-numbers .line-numbers-rows > span:before {
    color: #3c526dda;
  }

  /* overrides color-values for the Match Braces plugin
 * https://prismjs.com/plugins/match-braces/
 */
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-1,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-5,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-9 {
    color: #755f00;
  }

  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-2,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-6,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-10 {
    color: #af00af;
  }

  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-3,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-7,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-11 {
    color: #005a8e;
  }

  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-4,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-8,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-12 {
    color: #7c00aa;
  }

  /* overrides color-values for the Diff Highlight plugin
 * https://prismjs.com/plugins/diff-highlight/
 */
  pre.diff-highlight > code .UltraEditor__token_token.deleted:not(.prefix),
  pre > code.diff-highlight .UltraEditor__token_token.deleted:not(.prefix) {
    background-color: #c22f2e1f;
  }

  pre.diff-highlight > code .UltraEditor__token_token.inserted:not(.prefix),
  pre > code.diff-highlight .UltraEditor__token_token.inserted:not(.prefix) {
    background-color: #116b001f;
  }

  /* overrides color-values for the Command Line plugin
 * https://prismjs.com/plugins/command-line/
 */
  .command-line .command-line-prompt {
    border-right: 1px solid #8da1b97a;
  }

  .command-line .command-line-prompt > span:before {
    color: #3c526dda;
  }
`;
