import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    background: hsl(230, 1%, 98%);
    color: hsl(230, 8%, 24%);
    font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Selection */
  code[data-highlight-language]::-moz-selection,
  code[data-highlight-language] *::-moz-selection,
  pre[data-highlight-language] *::-moz-selection {
    background: hsl(230, 1%, 90%);
    color: inherit;
  }

  code[data-highlight-language]::selection,
  code[data-highlight-language] *::selection,
  pre[data-highlight-language] *::selection {
    background: hsl(230, 1%, 90%);
    color: inherit;
  }

  /* Code blocks */
  pre[data-highlight-language] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_cdata {
    color: hsl(230, 4%, 64%);
  }

  .UltraEditor__token_doctype,
  .UltraEditor__token_punctuation,
  .UltraEditor__token_entity {
    color: hsl(230, 8%, 24%);
  }

  .UltraEditor__token_attr-name,
  .UltraEditor__token_class-name,
  .UltraEditor__token_boolean,
  .UltraEditor__token_constant,
  .UltraEditor__token_number,
  .UltraEditor__token_atrule {
    color: hsl(35, 99%, 36%);
  }

  .UltraEditor__token_keyword {
    color: hsl(301, 63%, 40%);
  }

  .UltraEditor__token_property,
  .UltraEditor__token_tag,
  .UltraEditor__token_symbol,
  .UltraEditor__token_deleted,
  .UltraEditor__token_important {
    color: hsl(5, 74%, 59%);
  }

  .UltraEditor__token_selector,
  .UltraEditor__token_string,
  .UltraEditor__token_char,
  .UltraEditor__token_builtin,
  .UltraEditor__token_inserted,
  .UltraEditor__token_regex,
  .UltraEditor__token_attr-value,
  .UltraEditor__token_attr-value > .UltraEditor__token_punctuation {
    color: hsl(119, 34%, 47%);
  }

  .UltraEditor__token_variable,
  .UltraEditor__token_operator,
  .UltraEditor__token_function {
    color: hsl(221, 87%, 60%);
  }

  .UltraEditor__token_url {
    color: hsl(198, 99%, 37%);
  }

  /* HTML overrides */
  .UltraEditor__token_attr-value > .UltraEditor__token_punctuation.attr-equals,
  .UltraEditor__token_special-attr > .UltraEditor__token_attr-value > .UltraEditor__token_value.css {
    color: hsl(230, 8%, 24%);
  }

  /* CSS overrides */
  [data-highlight-language='css'] .UltraEditor__token_selector {
    color: hsl(5, 74%, 59%);
  }

  [data-highlight-language='css'] .UltraEditor__token_property {
    color: hsl(230, 8%, 24%);
  }

  [data-highlight-language='css'] .UltraEditor__token_function,
  [data-highlight-language='css'] .UltraEditor__token_url > .UltraEditor__token_function {
    color: hsl(198, 99%, 37%);
  }

  [data-highlight-language='css'] .UltraEditor__token_url > .UltraEditor__token_string.url {
    color: hsl(119, 34%, 47%);
  }

  [data-highlight-language='css'] .UltraEditor__token_important,
  [data-highlight-language='css'] .UltraEditor__token_atrule .UltraEditor__token_rule {
    color: hsl(301, 63%, 40%);
  }

  /* JS overrides */
  [data-highlight-language='javascript'] .UltraEditor__token_operator {
    color: hsl(301, 63%, 40%);
  }

  [data-highlight-language='javascript']
    .UltraEditor__token_template-string
    > .UltraEditor__token_interpolation
    > .UltraEditor__token_interpolation-punctuation.punctuation {
    color: hsl(344, 84%, 43%);
  }

  /* JSON overrides */
  [data-highlight-language='js']on .UltraEditor__token_operator {
    color: hsl(230, 8%, 24%);
  }

  [data-highlight-language='js']on .UltraEditor__token_null.keyword {
    color: hsl(35, 99%, 36%);
  }

  /* MD overrides */
  [data-highlight-language='markdown'] .UltraEditor__token_url,
  [data-highlight-language='markdown'] .UltraEditor__token_url > .UltraEditor__token_operator,
  [data-highlight-language='markdown'] .UltraEditor__token_url-reference.url > .UltraEditor__token_string {
    color: hsl(230, 8%, 24%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url > .UltraEditor__token_content {
    color: hsl(221, 87%, 60%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url > .UltraEditor__token_url,
  [data-highlight-language='markdown'] .UltraEditor__token_url-reference.url {
    color: hsl(198, 99%, 37%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_blockquote.punctuation,
  [data-highlight-language='markdown'] .UltraEditor__token_hr.punctuation {
    color: hsl(230, 4%, 64%);
    font-style: italic;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_code-snippet {
    color: hsl(119, 34%, 47%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_bold .UltraEditor__token_content {
    color: hsl(35, 99%, 36%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_italic .UltraEditor__token_content {
    color: hsl(301, 63%, 40%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_strike .UltraEditor__token_content,
  [data-highlight-language='markdown'] .UltraEditor__token_strike .UltraEditor__token_punctuation,
  [data-highlight-language='markdown'] .UltraEditor__token_list.punctuation,
  [data-highlight-language='markdown'] .UltraEditor__token_title.important > .UltraEditor__token_punctuation {
    color: hsl(5, 74%, 59%);
  }

  /* General */
  .UltraEditor__token_bold {
    font-weight: bold;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_italic {
    font-style: italic;
  }

  .UltraEditor__token_entity {
    cursor: help;
  }

  .UltraEditor__token_namespace {
    opacity: 0.8;
  }

  /* Plugin overrides */
  /* Selectors should have higher specificity than those in the plugins' default stylesheets */

  /* Show Invisibles plugin overrides */
  .UltraEditor__token_UltraEditor__token_.tab:not(:empty):before,
  .UltraEditor__token_UltraEditor__token_.cr:before,
  .UltraEditor__token_UltraEditor__token_.lf:before,
  .UltraEditor__token_UltraEditor__token_.space:before {
    color: hsla(230, 8%, 24%, 0.2);
  }

  /* Toolbar plugin overrides */
  /* Space out all buttons and move them away from the right edge of the code block */
  div.code-toolbar > .toolbar.toolbar > .toolbar-item {
    margin-right: 0.4em;
  }

  /* Styling the buttons */
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span {
    background: hsl(230, 1%, 90%);
    color: hsl(230, 6%, 44%);
    padding: 0.1em 0.4em;
    border-radius: 0.3em;
  }

  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
    background: hsl(230, 1%, 78%); /* custom: darken(--syntax-bg, 20%) */
    color: hsl(230, 8%, 24%);
  }

  /* Line Highlight plugin overrides */
  /* The highlighted line itself */
  .line-highlight.line-highlight {
    background: hsla(230, 8%, 24%, 0.05);
  }

  /* Default line numbers in Line Highlight plugin */
  .line-highlight.line-highlight:before,
  .line-highlight.line-highlight[data-end]:after {
    background: hsl(230, 1%, 90%);
    color: hsl(230, 8%, 24%);
    padding: 0.1em 0.6em;
    border-radius: 0.3em;
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* same as Toolbar plugin default */
  }

  /* Hovering over a linkable line number (in the gutter area) */
  /* Requires Line Numbers plugin as well */
  pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before {
    background-color: hsla(230, 8%, 24%, 0.05);
  }

  /* Line Numbers and Command Line plugins overrides */
  /* Line separating gutter from coding area */
  .line-numbers.line-numbers .line-numbers-rows,
  .command-line .command-line-prompt {
    border-right-color: hsla(230, 8%, 24%, 0.2);
  }

  /* Stuff in the gutter */
  .line-numbers .line-numbers-rows > span:before,
  .command-line .command-line-prompt > span:before {
    color: hsl(230, 1%, 62%);
  }

  /* Match Braces plugin overrides */
  /* Note: Outline colour is inherited from the braces */
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-1,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-5,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-9 {
    color: hsl(5, 74%, 59%);
  }

  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-2,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-6,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-10 {
    color: hsl(119, 34%, 47%);
  }

  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-3,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-7,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-11 {
    color: hsl(221, 87%, 60%);
  }

  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-4,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-8,
  .rainbow-braces .UltraEditor__token_UltraEditor__token_.punctuation.brace-level-12 {
    color: hsl(301, 63%, 40%);
  }

  /* Diff Highlight plugin overrides */
  /* Taken from https://github.com/atom/github/blob/master/styles/variables.less */
  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix),
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix) {
    background-color: hsla(353, 100%, 66%, 0.15);
  }

  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix)::-moz-selection,
  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix) *::-moz-selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix)::-moz-selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix) *::-moz-selection {
    background-color: hsla(353, 95%, 66%, 0.25);
  }

  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix)::selection,
  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix) *::selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix)::selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.deleted:not(.prefix) *::selection {
    background-color: hsla(353, 95%, 66%, 0.25);
  }

  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix),
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix) {
    background-color: hsla(137, 100%, 55%, 0.15);
  }

  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix)::-moz-selection,
  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix) *::-moz-selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix)::-moz-selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix) *::-moz-selection {
    background-color: hsla(135, 73%, 55%, 0.25);
  }

  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix)::selection,
  pre.diff-highlight > code .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix) *::selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix)::selection,
  pre > code.diff-highlight .UltraEditor__token_UltraEditor__token_.inserted:not(.prefix) *::selection {
    background-color: hsla(135, 73%, 55%, 0.25);
  }

  /* Previewers plugin overrides */
  /* Based on https://github.com/atom-community/atom-ide-datatip/blob/master/styles/atom-ide-datatips.less and https://github.com/atom/atom/blob/master/packages/one-light-ui */
  /* Border around popup */
  .prism-previewer.prism-previewer:before,
  .prism-previewer-gradient.prism-previewer-gradient div {
    border-color: hsl(0, 0, 95%);
  }

  /* Angle and time should remain as circles and are hence not included */
  .prism-previewer-color.prism-previewer-color:before,
  .prism-previewer-gradient.prism-previewer-gradient div,
  .prism-previewer-easing.prism-previewer-easing:before {
    border-radius: 0.3em;
  }

  /* Triangles pointing to the code */
  .prism-previewer.prism-previewer:after {
    border-top-color: hsl(0, 0, 95%);
  }

  .prism-previewer-flipped.prism-previewer-flipped.after {
    border-bottom-color: hsl(0, 0, 95%);
  }

  /* Background colour within the popup */
  .prism-previewer-angle.prism-previewer-angle:before,
  .prism-previewer-time.prism-previewer-time:before,
  .prism-previewer-easing.prism-previewer-easing {
    background: hsl(0, 0%, 100%);
  }

  /* For angle, this is the positive area (eg. 90deg will display one quadrant in this colour) */
  /* For time, this is the alternate colour */
  .prism-previewer-angle.prism-previewer-angle circle,
  .prism-previewer-time.prism-previewer-time circle {
    stroke: hsl(230, 8%, 24%);
    stroke-opacity: 1;
  }

  /* Stroke colours of the handle, direction point, and vector itself */
  .prism-previewer-easing.prism-previewer-easing circle,
  .prism-previewer-easing.prism-previewer-easing path,
  .prism-previewer-easing.prism-previewer-easing line {
    stroke: hsl(230, 8%, 24%);
  }

  /* Fill colour of the handle */
  .prism-previewer-easing.prism-previewer-easing circle {
    fill: transparent;
  }
`;
