import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #f8f8f2;
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

  /* Code blocks */
  pre[data-highlight-language] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[data-highlight-language],
  pre[data-highlight-language] {
    background: #2b2b2b;
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_doctype,
  .UltraEditor__token_cdata {
    color: #d4d0ab;
  }

  .UltraEditor__token_punctuation {
    color: #fefefe;
  }

  .UltraEditor__token_property,
  .UltraEditor__token_tag,
  .UltraEditor__token_constant,
  .UltraEditor__token_symbol,
  .UltraEditor__token_deleted {
    color: #ffa07a;
  }

  .UltraEditor__token_boolean,
  .UltraEditor__token_number {
    color: #00e0e0;
  }

  .UltraEditor__token_selector,
  .UltraEditor__token_attr-name,
  .UltraEditor__token_string,
  .UltraEditor__token_char,
  .UltraEditor__token_builtin,
  .UltraEditor__token_inserted {
    color: #abe338;
  }

  .UltraEditor__token_operator,
  .UltraEditor__token_entity,
  .UltraEditor__token_url,
  [data-highlight-language='css'] .UltraEditor__token_string,
  .style .UltraEditor__token_string,
  .UltraEditor__token_variable {
    color: #00e0e0;
  }

  .UltraEditor__token_atrule,
  .UltraEditor__token_attr-value,
  .UltraEditor__token_function {
    color: #ffd700;
  }

  .UltraEditor__token_keyword {
    color: #00e0e0;
  }

  .UltraEditor__token_regex,
  .UltraEditor__token_important {
    color: #ffd700;
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

  @media screen and (-ms-high-contrast: active) {
    code[data-highlight-language],
    pre[data-highlight-language] {
      color: windowText;
      background: window;
    }

    :not(pre) > code[data-highlight-language],
    pre[data-highlight-language] {
      background: window;
    }

    .UltraEditor__token_important {
      background: highlight;
      color: window;
      font-weight: normal;
    }

    .UltraEditor__token_atrule,
    .UltraEditor__token_attr-value,
    .UltraEditor__token_function,
    .UltraEditor__token_keyword,
    .UltraEditor__token_operator,
    .UltraEditor__token_selector {
      font-weight: bold;
    }

    .UltraEditor__token_attr-value,
    .UltraEditor__token_comment,
    .UltraEditor__token_doctype,
    .UltraEditor__token_function,
    .UltraEditor__token_keyword,
    .UltraEditor__token_operator,
    .UltraEditor__token_property,
    .UltraEditor__token_string {
      color: highlight;
    }

    .UltraEditor__token_attr-value,
    .UltraEditor__token_url {
      font-weight: normal;
    }
  }
`;
