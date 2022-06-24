import { css, SerializedStyles, Theme } from '@emotion/react';

interface WithStyleCallback {
  (theme: Theme): SerializedStyles;
}

const withStyle = (cb: WithStyleCallback) => cb;

withStyle.css = css;

export { withStyle };
