import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #d6deeb;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    font-size: 1em;

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
    text-shadow: none;
    background: rgba(29, 59, 83, 0.99);
  }

  pre[data-highlight-language]::selection,
  pre[data-highlight-language] ::selection,
  code[data-highlight-language]::selection,
  code[data-highlight-language] ::selection {
    text-shadow: none;
    background: rgba(29, 59, 83, 0.99);
  }

  @media print {
    code[data-highlight-language],
    pre[data-highlight-language] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[data-highlight-language] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[data-highlight-language],
  pre[data-highlight-language] {
    color: white;
    background: #011627;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_cdata {
    color: rgb(99, 119, 119);
    font-style: italic;
  }

  .UltraEditor__token_punctuation {
    color: rgb(199, 146, 234);
  }

  .namespace {
    color: rgb(178, 204, 214);
  }

  .UltraEditor__token_deleted {
    color: rgba(239, 83, 80, 0.56);
    font-style: italic;
  }

  .UltraEditor__token_symbol,
  .UltraEditor__token_property {
    color: rgb(128, 203, 196);
  }

  .UltraEditor__token_tag,
  .UltraEditor__token_operator,
  .UltraEditor__token_keyword {
    color: rgb(127, 219, 202);
  }

  .UltraEditor__token_boolean {
    color: rgb(255, 88, 116);
  }

  .UltraEditor__token_number {
    color: rgb(247, 140, 108);
  }

  .UltraEditor__token_constant,
  .UltraEditor__token_function,
  .UltraEditor__token_builtin,
  .UltraEditor__token_char {
    color: rgb(130, 170, 255);
  }

  .UltraEditor__token_selector,
  .UltraEditor__token_doctype {
    color: rgb(199, 146, 234);
    font-style: italic;
  }

  .UltraEditor__token_attr-name,
  .UltraEditor__token_inserted {
    color: rgb(173, 219, 103);
    font-style: italic;
  }

  .UltraEditor__token_string,
  .UltraEditor__token_url,
  .UltraEditor__token_entity,
  [data-highlight-language='css'] .UltraEditor__token_string,
  .style .UltraEditor__token_string {
    color: rgb(173, 219, 103);
  }

  .UltraEditor__token_class-name,
  .UltraEditor__token_atrule,
  .UltraEditor__token_attr-value {
    color: rgb(255, 203, 139);
  }

  .UltraEditor__token_regex,
  .UltraEditor__token_important,
  .UltraEditor__token_variable {
    color: rgb(214, 222, 235);
  }

  .UltraEditor__token_important,
  .UltraEditor__token_bold {
    font-weight: bold;
  }

  .UltraEditor__token_italic {
    font-style: italic;
  }
`;
