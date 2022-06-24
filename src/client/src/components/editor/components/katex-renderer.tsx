import katex from 'katex';
import { useEffect, useRef } from 'react';

export default function KatexRenderer({
  equation,
  inline,
  onClick,
}: Readonly<{
  equation: string;
  inline: boolean;
  onClick: () => void;
}>): JSX.Element {
  const katexElementRef = useRef(null);

  useEffect(() => {
    const katexElement = katexElementRef.current;

    if (katexElement !== null) {
      katex.render(equation, katexElement, {
        displayMode: !inline,
        errorColor: '#cc0000',
        output: 'html',
        strict: 'warn',
        throwOnError: false,
        trust: false,
      });
    }
  }, [equation, inline]);

  return (
    <>
      <span className="spacer"> </span>
      <span role="button" tabIndex={-1} onClick={onClick} ref={katexElementRef} />
      <span className="spacer"> </span>
    </>
  );
}
