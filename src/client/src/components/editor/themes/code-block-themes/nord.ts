import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #f8f8f2;
    background: none;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
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

  /* Code blocks */
  pre[data-highlight-language] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[data-highlight-language],
  pre[data-highlight-language] {
    background: #2e3440;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_doctype,
  .UltraEditor__token_cdata {
    color: #636f88;
  }

  .UltraEditor__token_punctuation {
    color: #81a1c1;
  }

  .namespace {
    opacity: 0.7;
  }

  .UltraEditor__token_property,
  .UltraEditor__token_tag,
  .UltraEditor__token_constant,
  .UltraEditor__token_symbol,
  .UltraEditor__token_deleted {
    color: #81a1c1;
  }

  .UltraEditor__token_number {
    color: #b48ead;
  }

  .UltraEditor__token_boolean {
    color: #81a1c1;
  }

  .UltraEditor__token_selector,
  .UltraEditor__token_attr-name,
  .UltraEditor__token_string,
  .UltraEditor__token_char,
  .UltraEditor__token_builtin,
  .UltraEditor__token_inserted {
    color: #a3be8c;
  }

  .UltraEditor__token_operator,
  .UltraEditor__token_entity,
  .UltraEditor__token_url,
  [data-highlight-language='css'] .UltraEditor__token_string,
  .style .UltraEditor__token_string,
  .UltraEditor__token_variable {
    color: #81a1c1;
  }

  .UltraEditor__token_atrule,
  .UltraEditor__token_attr-value,
  .UltraEditor__token_function,
  .UltraEditor__token_class-name {
    color: #88c0d0;
  }

  .UltraEditor__token_keyword {
    color: #81a1c1;
  }

  .UltraEditor__token_regex,
  .UltraEditor__token_important {
    color: #ebcb8b;
  }

  .UltraEditor__token_important,
  .UltraEditor__token_bold {
    font-weight: bold;
  }

  .UltraEditor__token_italic {
    font-style: italic;
  }

  .UltraEditor__token_entity {
    cursor: help;
  }
`;
