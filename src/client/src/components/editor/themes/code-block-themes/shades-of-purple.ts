import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #9efeff;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;

    font-family: 'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    letter-spacing: 0.5px;
    text-shadow: 0 1px #222245;
  }

  pre[data-highlight-language]::-moz-selection,
  pre[data-highlight-language] ::-moz-selection,
  code[data-highlight-language]::-moz-selection,
  code[data-highlight-language] ::-moz-selection,
  pre[data-highlight-language]::selection,
  pre[data-highlight-language] ::selection,
  code[data-highlight-language]::selection,
  code[data-highlight-language] ::selection {
    color: inherit;
    background: #a599e9;
  }

  /* Code blocks. */
  pre[data-highlight-language] {
    padding: 2em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[data-highlight-language],
  pre[data-highlight-language] {
    background: #1e1e3f;
  }

  /* Inline code */
  :not(pre) > code[data-highlight-language] {
    padding: 0.1em;
    border-radius: 0.3em;
  }

  .token {
    font-weight: 400;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_cdata {
    color: #b362ff;
  }

  .UltraEditor__token_delimiter,
  .UltraEditor__token_keyword,
  .UltraEditor__token_selector,
  .UltraEditor__token_important,
  .UltraEditor__token_atrule {
    color: #ff9d00;
  }

  .UltraEditor__token_operator,
  .UltraEditor__token_attr-name {
    color: rgb(255, 180, 84);
  }

  .UltraEditor__token_punctuation {
    color: #ffffff;
  }

  .UltraEditor__token_boolean {
    color: rgb(255, 98, 140);
  }

  .UltraEditor__token_tag,
  .UltraEditor__token_tag .punctuation,
  .UltraEditor__token_doctype,
  .UltraEditor__token_builtin {
    color: rgb(255, 157, 0);
  }

  .UltraEditor__token_entity,
  .UltraEditor__token_symbol {
    color: #6897bb;
  }

  .UltraEditor__token_number {
    color: #ff628c;
  }

  .UltraEditor__token_property,
  .UltraEditor__token_constant,
  .UltraEditor__token_variable {
    color: #ff628c;
  }

  .UltraEditor__token_string,
  .UltraEditor__token_char {
    color: #a5ff90;
  }

  .UltraEditor__token_attr-value,
  .UltraEditor__token_attr-value .punctuation {
    color: #a5c261;
  }

  .UltraEditor__token_attr-value .punctuation:first-of-type {
    color: #a9b7c6;
  }

  .UltraEditor__token_url {
    color: #287bde;
    text-decoration: underline;
  }

  .UltraEditor__token_function {
    color: rgb(250, 208, 0);
  }

  .UltraEditor__token_regex {
    background: #364135;
  }

  .UltraEditor__token_bold {
    font-weight: bold;
  }

  .UltraEditor__token_italic {
    font-style: italic;
  }

  .UltraEditor__token_inserted {
    background: #00ff00;
  }

  .UltraEditor__token_deleted {
    background: #ff000d;
  }

  code[data-highlight-language='css'] .UltraEditor__token_property,
  code[data-highlight-language='css'] .UltraEditor__token_property + .UltraEditor__token_punctuation {
    color: #a9b7c6;
  }

  code[data-highlight-language='css'] .UltraEditor__token_id {
    color: #ffc66d;
  }

  code[data-highlight-language='css'] .UltraEditor__token_selector > .UltraEditor__token_class,
  code[data-highlight-language='css'] .UltraEditor__token_selector > .UltraEditor__token_attribute,
  code[data-highlight-language='css'] .UltraEditor__token_selector > .UltraEditor__token_pseudo-class,
  code[data-highlight-language='css'] .UltraEditor__token_selector > .UltraEditor__token_pseudo-element {
    color: #ffc66d;
  }

  .UltraEditor__token_class-name {
    color: #fb94ff;
  }

  .UltraEditor__token_operator,
  .UltraEditor__token_entity,
  .UltraEditor__token_url,
  [data-highlight-language='css'] .UltraEditor__token_string,
  .style .UltraEditor__token_string {
    background: none;
  }

  .line-highlight.line-highlight {
    margin-top: 36px;
    background: linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent);
  }

  .line-highlight.line-highlight:before,
  .line-highlight.line-highlight[data-end]:after {
    content: '';
  }
`;
