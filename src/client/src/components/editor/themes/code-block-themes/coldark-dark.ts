import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #e3eaf2;
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
    background: #3c526d;
  }

  pre[data-highlight-language]::selection,
  pre[data-highlight-language] ::selection,
  code[data-highlight-language]::selection,
  code[data-highlight-language] ::selection {
    background: #3c526d;
  }

  /* Code blocks */
  pre[data-highlight-language] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[data-highlight-language],
  pre[data-highlight-language] {
    background: #111b27;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_doctype,
  .UltraEditor__token_cdata {
    color: #8da1b9;
  }

  .UltraEditor__token_punctuation {
    color: #e3eaf2;
  }

  .UltraEditor__token_delimiter.important,
  .UltraEditor__token_selector .parent,
  .UltraEditor__token_tag,
  .UltraEditor__token_tag .UltraEditor__token_punctuation {
    color: #66cccc;
  }

  .UltraEditor__token_attr-name,
  .UltraEditor__token_boolean,
  .UltraEditor__token_boolean.important,
  .UltraEditor__token_number,
  .UltraEditor__token_constant,
  .UltraEditor__token_selector .UltraEditor__token_attribute {
    color: #e6d37a;
  }

  .UltraEditor__token_class-name,
  .UltraEditor__token_key,
  .UltraEditor__token_parameter,
  .UltraEditor__token_property,
  .UltraEditor__token_property-access,
  .UltraEditor__token_variable {
    color: #6cb8e6;
  }

  .UltraEditor__token_attr-value,
  .UltraEditor__token_inserted,
  .UltraEditor__token_color,
  .UltraEditor__token_selector .UltraEditor__token_value,
  .UltraEditor__token_string,
  .UltraEditor__token_string .UltraEditor__token_url-link {
    color: #91d076;
  }

  .UltraEditor__token_builtin,
  .UltraEditor__token_keyword-array,
  .UltraEditor__token_package,
  .UltraEditor__token_regex {
    color: #f4adf4;
  }

  .UltraEditor__token_function,
  .UltraEditor__token_selector .UltraEditor__token_class,
  .UltraEditor__token_selector .UltraEditor__token_id {
    color: #c699e3;
  }

  .UltraEditor__token_atrule .UltraEditor__token_rule,
  .UltraEditor__token_combinator,
  .UltraEditor__token_keyword,
  .UltraEditor__token_operator,
  .UltraEditor__token_pseudo-class,
  .UltraEditor__token_pseudo-element,
  .UltraEditor__token_selector,
  .UltraEditor__token_unit {
    color: #e9ae7e;
  }

  .UltraEditor__token_deleted,
  .UltraEditor__token_important {
    color: #cd6660;
  }

  .UltraEditor__token_keyword-this,
  .UltraEditor__token_this {
    color: #6cb8e6;
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
    color: #6cb8e6;
    font-weight: bold;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_blockquote.punctuation {
    color: #f4adf4;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_code {
    color: #66cccc;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_hr.punctuation {
    color: #6cb8e6;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url .UltraEditor__token_content {
    color: #91d076;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url-link {
    color: #e6d37a;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_list.punctuation {
    color: #f4adf4;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_table-header {
    color: #e3eaf2;
  }

  [data-highlight-language='js']on .UltraEditor__token_operator {
    color: #e3eaf2;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_variable {
    color: #66cccc;
  }

  /* overrides color-values for the Show Invisibles plugin
* https://prismjs.com/plugins/show-invisibles/
*/
  .UltraEditor__token_token.tab:not(:empty):before,
  .UltraEditor__token_token.cr:before,
  .UltraEditor__token_token.lf:before,
  .UltraEditor__token_token.space:before {
    color: #8da1b9;
  }

  /* overrides color-values for the Toolbar plugin
* https://prismjs.com/plugins/toolbar/
*/
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button {
    color: #111b27;
    background: #6cb8e6;
  }

  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus {
    color: #111b27;
    background: #6cb8e6da;
    text-decoration: none;
  }

  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
    color: #111b27;
    background: #8da1b9;
  }

  /* overrides color-values for the Line Highlight plugin
* http://prismjs.com/plugins/line-highlight/
*/
  .line-highlight.line-highlight {
    background: #3c526d5f;
    background: linear-gradient(to right, #3c526d5f 70%, #3c526d55);
  }

  .line-highlight.line-highlight:before,
  .line-highlight.line-highlight[data-end]:after {
    background-color: #8da1b9;
    color: #111b27;
    box-shadow: 0 1px #3c526d;
  }

  pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before {
    background-color: #8da1b918;
  }

  /* overrides color-values for the Line Numbers plugin
* http://prismjs.com/plugins/line-numbers/
*/
  .line-numbers.line-numbers .line-numbers-rows {
    border-right: 1px solid #0b121b;
    background: #0b121b7a;
  }

  .line-numbers .line-numbers-rows > span:before {
    color: #8da1b9da;
  }

  /* overrides color-values for the Match Braces plugin
* https://prismjs.com/plugins/match-braces/
*/
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-1,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-5,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-9 {
    color: #e6d37a;
  }

  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-2,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-6,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-10 {
    color: #f4adf4;
  }

  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-3,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-7,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-11 {
    color: #6cb8e6;
  }

  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-4,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-8,
  .rainbow-braces .UltraEditor__token_token.punctuation.brace-level-12 {
    color: #c699e3;
  }

  /* overrides color-values for the Diff Highlight plugin
* https://prismjs.com/plugins/diff-highlight/
*/
  pre.diff-highlight > code .UltraEditor__token_token.deleted:not(.prefix),
  pre > code.diff-highlight .UltraEditor__token_token.deleted:not(.prefix) {
    background-color: #cd66601f;
  }

  pre.diff-highlight > code .UltraEditor__token_token.inserted:not(.prefix),
  pre > code.diff-highlight .UltraEditor__token_token.inserted:not(.prefix) {
    background-color: #91d0761f;
  }

  /* overrides color-values for the Command Line plugin
* https://prismjs.com/plugins/command-line/
*/
  .command-line .command-line-prompt {
    border-right: 1px solid #0b121b;
  }

  .command-line .command-line-prompt > span:before {
    color: #8da1b9da;
  }
`;
