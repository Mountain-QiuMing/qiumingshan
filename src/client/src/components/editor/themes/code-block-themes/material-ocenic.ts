import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    color: #c3cee3;
    background: #263238;
    font-family: Roboto Mono, monospace;
    font-size: 1em;
    line-height: 1.5em;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  code[data-highlight-language]::-moz-selection,
  pre[data-highlight-language]::-moz-selection,
  code[data-highlight-language] ::-moz-selection,
  pre[data-highlight-language] ::-moz-selection {
    background: #363636;
  }

  code[data-highlight-language]::selection,
  pre[data-highlight-language]::selection,
  code[data-highlight-language] ::selection,
  pre[data-highlight-language] ::selection {
    background: #363636;
  }

  pre[data-highlight-language] {
    overflow: auto;
    position: relative;
    margin: 0.5em 0;
    padding: 1.25em 1em;
  }

  [data-highlight-language='css'] > code,
  [data-highlight-language='markdown'] > code,
  [data-highlight-language='markdown'] > code {
    color: #fd9170;
  }

  [data-highlight-language] .namespace {
    opacity: 0.7;
  }

  .UltraEditor__token_atrule {
    color: #c792ea;
  }

  .UltraEditor__token_attr-name {
    color: #ffcb6b;
  }

  .UltraEditor__token_attr-value {
    color: #c3e88d;
  }

  .UltraEditor__token_attribute {
    color: #c3e88d;
  }

  .UltraEditor__token_boolean {
    color: #c792ea;
  }

  .UltraEditor__token_builtin {
    color: #ffcb6b;
  }

  .UltraEditor__token_cdata {
    color: #80cbc4;
  }

  .UltraEditor__token_char {
    color: #80cbc4;
  }

  .UltraEditor__token_class {
    color: #ffcb6b;
  }

  .UltraEditor__token_class-name {
    color: #f2ff00;
  }

  .UltraEditor__token_color {
    color: #f2ff00;
  }

  .UltraEditor__token_comment {
    color: #546e7a;
  }

  .UltraEditor__token_constant {
    color: #c792ea;
  }

  .UltraEditor__token_deleted {
    color: #f07178;
  }

  .UltraEditor__token_doctype {
    color: #546e7a;
  }

  .UltraEditor__token_entity {
    color: #f07178;
  }

  .UltraEditor__token_function {
    color: #c792ea;
  }

  .UltraEditor__token_hexcode {
    color: #f2ff00;
  }

  .UltraEditor__token_id {
    color: #c792ea;
    font-weight: bold;
  }

  .UltraEditor__token_important {
    color: #c792ea;
    font-weight: bold;
  }

  .UltraEditor__token_inserted {
    color: #80cbc4;
  }

  .UltraEditor__token_keyword {
    color: #c792ea;
    font-style: italic;
  }

  .UltraEditor__token_number {
    color: #fd9170;
  }

  .UltraEditor__token_operator {
    color: #89ddff;
  }

  .UltraEditor__token_prolog {
    color: #546e7a;
  }

  .UltraEditor__token_property {
    color: #80cbc4;
  }

  .UltraEditor__token_pseudo-class {
    color: #c3e88d;
  }

  .UltraEditor__token_pseudo-element {
    color: #c3e88d;
  }

  .UltraEditor__token_punctuation {
    color: #89ddff;
  }

  .UltraEditor__token_regex {
    color: #f2ff00;
  }

  .UltraEditor__token_selector {
    color: #f07178;
  }

  .UltraEditor__token_string {
    color: #c3e88d;
  }

  .UltraEditor__token_symbol {
    color: #c792ea;
  }

  .UltraEditor__token_tag {
    color: #f07178;
  }

  .UltraEditor__token_unit {
    color: #f07178;
  }

  .UltraEditor__token_url {
    color: #fd9170;
  }

  .UltraEditor__token_variable {
    color: #f07178;
  }
`;
