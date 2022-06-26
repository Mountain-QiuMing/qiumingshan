import { css } from '@emotion/react';
import { FC, ReactNode } from 'react';

interface PlaceholderProps {
  className?: string;
  children?: ReactNode;
}

const Placeholder: FC<PlaceholderProps> = ({ className, children }) => {
  return (
    <div css={!className && placeholderStyle} className={className || 'Placeholder__root'}>
      {children || '请输入...'}
    </div>
  );
};

export default Placeholder;

const placeholderStyle = css`
  font-size: 15px;
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 10px;
  left: 10px;
  user-select: none;
  white-space: nowrap;
  display: inline-block;
  pointer-events: none;
`;
