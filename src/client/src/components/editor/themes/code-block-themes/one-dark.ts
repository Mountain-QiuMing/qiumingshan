import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #c5c8c6;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
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
    background: #1d1f21;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_doctype,
  .UltraEditor__token_cdata {
    color: #7c7c7c;
  }

  .UltraEditor__token_punctuation {
    color: #c5c8c6;
  }

  .namespace {
    opacity: 0.7;
  }

  .UltraEditor__token_property,
  .UltraEditor__token_keyword,
  .UltraEditor__token_tag {
    color: #96cbfe;
  }

  .UltraEditor__token_class-name {
    color: #ffffb6;
    text-decoration: underline;
  }

  .UltraEditor__token_boolean,
  .UltraEditor__token_constant {
    color: #99cc99;
  }

  .UltraEditor__token_symbol,
  .UltraEditor__token_deleted {
    color: #f92672;
  }

  .UltraEditor__token_number {
    color: #ff73fd;
  }

  .UltraEditor__token_selector,
  .UltraEditor__token_attr-name,
  .UltraEditor__token_string,
  .UltraEditor__token_char,
  .UltraEditor__token_builtin,
  .UltraEditor__token_inserted {
    color: #a8ff60;
  }

  .UltraEditor__token_variable {
    color: #c6c5fe;
  }

  .UltraEditor__token_operator {
    color: #ededed;
  }

  .UltraEditor__token_entity {
    color: #ffffb6;
    cursor: help;
  }

  .UltraEditor__token_url {
    color: #96cbfe;
  }

  [data-highlight-language='css'] .UltraEditor__token_string,
  .style .UltraEditor__token_string {
    color: #87c38a;
  }

  .UltraEditor__token_atrule,
  .UltraEditor__token_attr-value {
    color: #f9ee98;
  }

  .UltraEditor__token_function {
    color: #dad085;
  }

  .UltraEditor__token_regex {
    color: #e9c062;
  }

  .UltraEditor__token_important {
    color: #fd971f;
  }

  .UltraEditor__token_important,
  .UltraEditor__token_bold {
    font-weight: bold;
  }

  .UltraEditor__token_italic {
    font-style: italic;
  }
`;
