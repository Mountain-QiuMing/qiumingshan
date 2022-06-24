import { css } from '@emotion/react';

export default css`
  code[data-highlight-language],
  pre[data-highlight-language] {
    color: #f92aad;
    text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
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
  }

  :not(pre) > code[data-highlight-language],
  pre[data-highlight-language] {
    background-color: transparent !important;
    background-image: linear-gradient(to bottom, #2a2139 75%, #34294f);
  }

  .UltraEditor__token_comment,
  .UltraEditor__token_block-comment,
  .UltraEditor__token_prolog,
  .UltraEditor__token_doctype,
  .UltraEditor__token_cdata {
    color: #8e8e8e;
  }

  .UltraEditor__token_punctuation {
    color: #ccc;
  }

  .UltraEditor__token_tag,
  .UltraEditor__token_attr-name,
  .UltraEditor__token_namespace,
  .UltraEditor__token_number,
  .UltraEditor__token_unit,
  .UltraEditor__token_hexcode,
  .UltraEditor__token_deleted {
    color: #e2777a;
  }

  .UltraEditor__token_property,
  .UltraEditor__token_selector {
    color: #72f1b8;
    text-shadow: 0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475;
  }

  .UltraEditor__token_function-name {
    color: #6196cc;
  }

  .UltraEditor__token_boolean,
  .UltraEditor__token_selector .UltraEditor__token_id,
  .UltraEditor__token_function {
    color: #fdfdfd;
    text-shadow: 0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975;
  }

  .UltraEditor__token_class-name {
    color: #fff5f6;
    text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75;
  }

  .UltraEditor__token_constant,
  .UltraEditor__token_symbol {
    color: #f92aad;
    text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3;
  }

  .UltraEditor__token_important,
  .UltraEditor__token_atrule,
  .UltraEditor__token_keyword,
  .UltraEditor__token_selector .UltraEditor__token_class,
  .UltraEditor__token_builtin {
    color: #f4eee4;
    text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575;
  }

  .UltraEditor__token_string,
  .UltraEditor__token_char,
  .UltraEditor__token_attr-value,
  .UltraEditor__token_regex,
  .UltraEditor__token_variable {
    color: #f87c32;
  }

  .UltraEditor__token_operator,
  .UltraEditor__token_entity,
  .UltraEditor__token_url {
    color: #67cdcc;
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

  .UltraEditor__token_inserted {
    color: green;
  }
`;
