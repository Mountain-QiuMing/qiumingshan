import { css, Global } from '@emotion/react';
import type { LexicalEditor } from 'lexical';
import React, { FC, useRef } from 'react';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
};

interface ImageResizerProps {
  editor: LexicalEditor;
  imageRef: { current: null | HTMLElement };
  maxWidth?: number;
  onResizeEnd: (width: 'inherit' | number, height: 'inherit' | number) => void;
  onResizeStart: () => void;
  setShowCaption: (boolean) => void;
  showCaption: boolean;
}

const ImageResizer: FC<ImageResizerProps> = props => {
  const { onResizeStart, onResizeEnd, imageRef, maxWidth, editor, showCaption, setShowCaption } = props;
  const buttonRef = useRef(null);
  const positioningRef = useRef<{
    currentHeight: 'inherit' | number;
    currentWidth: 'inherit' | number;
    direction: number;
    isResizing: boolean;
    ratio: number;
    startHeight: number;
    startWidth: number;
    startX: number;
    startY: number;
  }>({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });
  const editorRootElement = editor.getRootElement();
  const maxWidthContainer = maxWidth
    ? maxWidth
    : editorRootElement !== null
    ? editorRootElement.getBoundingClientRect().width - 20
    : 100;
  const maxHeightContainer = editorRootElement !== null ? editorRootElement.getBoundingClientRect().height - 20 : 100;

  const minWidth = 100;
  const minHeight = 100;

  const setStartCursor = (direction: number) => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse =
      (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east);

    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';

    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
    }
  };

  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', 'default');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', 'default');
    }
  };

  const handlePointerDown = (event: React.PointerEvent, direction: number) => {
    const image = imageRef.current;

    if (image !== null) {
      const { width, height } = image.getBoundingClientRect();
      const positioning = positioningRef.current;

      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;

      setStartCursor(direction);
      onResizeStart();

      image.style.height = `${height}px`;
      image.style.width = `${width}px`;

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };
  const handlePointerMove = (event: PointerEvent) => {
    const image = imageRef.current;
    const positioning = positioningRef.current;

    const isHorizontal = positioning.direction & (Direction.east | Direction.west);
    const isVertical = positioning.direction & (Direction.south | Direction.north);

    if (image !== null && positioning.isResizing) {
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);

        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);

        const height = width / positioning.ratio;

        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
        positioning.currentWidth = width;
      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY);

        diff = positioning.direction & Direction.south ? -diff : diff;

        const height = clamp(positioning.startHeight + diff, minHeight, maxHeightContainer);

        image.style.height = `${height}px`;
        positioning.currentHeight = height;
      } else {
        let diff = Math.floor(positioning.startX - event.clientX);

        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);

        image.style.width = `${width}px`;
        positioning.currentWidth = width;
      }
    }
  };
  const handlePointerUp = (_event: PointerEvent) => {
    const image = imageRef.current;
    const positioning = positioningRef.current;

    if (image !== null && positioning.isResizing) {
      const width = positioning.currentWidth;
      const height = positioning.currentHeight;

      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;
      positioning.isResizing = false;

      setEndCursor();
      onResizeEnd(width, height);

      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };

  return (
    <>
      <Global styles={imageResizerStyle()}></Global>
      {!showCaption && (
        <button
          className="image-caption-button"
          ref={buttonRef}
          onClick={() => {
            setShowCaption(!showCaption);
          }}
        >
          添加描述
        </button>
      )}
      <div
        className="image-resizer image-resizer-n"
        onPointerDown={event => {
          handlePointerDown(event, Direction.north);
        }}
      />
      <div
        className="image-resizer image-resizer-ne"
        onPointerDown={event => {
          handlePointerDown(event, Direction.north | Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-e"
        onPointerDown={event => {
          handlePointerDown(event, Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-se"
        onPointerDown={event => {
          handlePointerDown(event, Direction.south | Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-s"
        onPointerDown={event => {
          handlePointerDown(event, Direction.south);
        }}
      />
      <div
        className="image-resizer image-resizer-sw"
        onPointerDown={event => {
          handlePointerDown(event, Direction.south | Direction.west);
        }}
      />
      <div
        className="image-resizer image-resizer-w"
        onPointerDown={event => {
          handlePointerDown(event, Direction.west);
        }}
      />
      <div
        className="image-resizer image-resizer-nw"
        onPointerDown={event => {
          handlePointerDown(event, Direction.north | Direction.west);
        }}
      />
    </>
  );
};

export default ImageResizer;

const imageResizerStyle = theme => css`
  .image-caption-button {
    display: block;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 30%;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    min-width: 100px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
  .image-resizer {
    display: block;
    width: 7px;
    height: 7px;
    position: absolute;
    /* background-color: ${ultraContext.theme.style.primaryColor}; */
    border: 1px solid #fff;
  }

  .image-resizer.image-resizer-n {
    top: -6px;
    left: 48%;
    cursor: n-resize;
  }

  .image-resizer.image-resizer-ne {
    top: -6px;
    right: -6px;
    cursor: ne-resize;
  }

  .image-resizer.image-resizer-e {
    bottom: 48%;
    right: -6px;
    cursor: e-resize;
  }

  .image-resizer.image-resizer-se {
    bottom: -2px;
    right: -6px;
    cursor: nwse-resize;
  }

  .image-resizer.image-resizer-s {
    bottom: -2px;
    left: 48%;
    cursor: s-resize;
  }

  .image-resizer.image-resizer-sw {
    bottom: -2px;
    left: -6px;
    cursor: sw-resize;
  }

  .image-resizer.image-resizer-w {
    bottom: 48%;
    left: -6px;
    cursor: w-resize;
  }

  .image-resizer.image-resizer-nw {
    top: -6px;
    left: -6px;
    cursor: nw-resize;
  }
`;
