import React from 'react';

interface VectorCanvasProps {
  svgMarkup: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VectorCanvas: React.FC<VectorCanvasProps> = ({
  svgMarkup,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
};
