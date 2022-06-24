import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    background: hsl(220, 13%, 18%);
    color: hsl(220, 14%, 71%);
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
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
    background: hsl(220, 13%, 28%);
    color: inherit;
    text-shadow: none;
  }

  code[data-highlight-language]::selection,
  code[data-highlight-language] *::selection,
  pre[data-highlight-language] *::selection {
    background: hsl(220, 13%, 28%);
    color: inherit;
    text-shadow: none;
  }

  /* Code blocks */
  pre[data-highlight-language] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  /* Print */
  @media print {
    code[data-highlight-language],
    pre[data-highlight-language] {
      text-shadow: none;
    }
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_cdata {
    color: hsl(220, 10%, 40%);
  }

  .UltraEditor__token_doctype,
  .UltraEditor__token_punctuation,
  .UltraEditor__token_entity {
    color: hsl(220, 14%, 71%);
  }

  .UltraEditor__token_attr-name,
  .UltraEditor__token_class-name,
  .UltraEditor__token_boolean,
  .UltraEditor__token_constant,
  .UltraEditor__token_number,
  .UltraEditor__token_atrule {
    color: hsl(29, 54%, 61%);
  }

  .UltraEditor__token_keyword {
    color: hsl(286, 60%, 67%);
  }

  .UltraEditor__token_property,
  .UltraEditor__token_tag,
  .UltraEditor__token_symbol,
  .UltraEditor__token_deleted,
  .UltraEditor__token_important {
    color: hsl(355, 65%, 65%);
  }

  .UltraEditor__token_selector,
  .UltraEditor__token_string,
  .UltraEditor__token_char,
  .UltraEditor__token_builtin,
  .UltraEditor__token_inserted,
  .UltraEditor__token_regex,
  .UltraEditor__token_attr-value,
  .UltraEditor__token_attr-value > .UltraEditor__token_punctuation {
    color: hsl(95, 38%, 62%);
  }

  .UltraEditor__token_variable,
  .UltraEditor__token_operator,
  .UltraEditor__token_function {
    color: hsl(207, 82%, 66%);
  }

  .UltraEditor__token_url {
    color: hsl(187, 47%, 55%);
  }

  /* HTML overrides */
  .UltraEditor__token_attr-value > .UltraEditor__token_punctuation.attr-equals,
  .UltraEditor__token_special-attr > .UltraEditor__token_attr-value > .UltraEditor__token_value.css {
    color: hsl(220, 14%, 71%);
  }

  /* CSS overrides */
  [data-highlight-language='css'] .UltraEditor__token_selector {
    color: hsl(355, 65%, 65%);
  }

  [data-highlight-language='css'] .UltraEditor__token_property {
    color: hsl(220, 14%, 71%);
  }

  [data-highlight-language='css'] .UltraEditor__token_function,
  [data-highlight-language='css'] .UltraEditor__token_url > .UltraEditor__token_function {
    color: hsl(187, 47%, 55%);
  }

  [data-highlight-language='css'] .UltraEditor__token_url > .UltraEditor__token_string.url {
    color: hsl(95, 38%, 62%);
  }

  [data-highlight-language='css'] .UltraEditor__token_important,
  [data-highlight-language='css'] .UltraEditor__token_atrule .UltraEditor__token_rule {
    color: hsl(286, 60%, 67%);
  }

  /* JS overrides */
  [data-highlight-language='javascript'] .UltraEditor__token_operator {
    color: hsl(286, 60%, 67%);
  }

  [data-highlight-language='javascript']
    .UltraEditor__token_template-string
    > .UltraEditor__token_interpolation
    > .UltraEditor__token_interpolation-punctuation.punctuation {
    color: hsl(5, 48%, 51%);
  }

  /* JSON overrides */
  [data-highlight-language='js']on .UltraEditor__token_operator {
    color: hsl(220, 14%, 71%);
  }

  [data-highlight-language='js']on .UltraEditor__token_null.keyword {
    color: hsl(29, 54%, 61%);
  }

  /* MD overrides */
  [data-highlight-language='markdown'] .UltraEditor__token_url,
  [data-highlight-language='markdown'] .UltraEditor__token_url > .UltraEditor__token_operator,
  [data-highlight-language='markdown'] .UltraEditor__token_url-reference.url > .UltraEditor__token_string {
    color: hsl(220, 14%, 71%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url > .UltraEditor__token_content {
    color: hsl(207, 82%, 66%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_url > .UltraEditor__token_url,
  [data-highlight-language='markdown'] .UltraEditor__token_url-reference.url {
    color: hsl(187, 47%, 55%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_blockquote.punctuation,
  [data-highlight-language='markdown'] .UltraEditor__token_hr.punctuation {
    color: hsl(220, 10%, 40%);
    font-style: italic;
  }

  [data-highlight-language='markdown'] .UltraEditor__token_code-snippet {
    color: hsl(95, 38%, 62%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_bold .UltraEditor__token_content {
    color: hsl(29, 54%, 61%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_italic .UltraEditor__token_content {
    color: hsl(286, 60%, 67%);
  }

  [data-highlight-language='markdown'] .UltraEditor__token_strike .UltraEditor__token_content,
  [data-highlight-language='markdown'] .UltraEditor__token_strike .UltraEditor__token_punctuation,
  [data-highlight-language='markdown'] .UltraEditor__token_list.punctuation,
  [data-highlight-language='markdown'] .UltraEditor__token_title.important > .UltraEditor__token_punctuation {
    color: hsl(355, 65%, 65%);
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
`;
