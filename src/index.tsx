import React from 'react';

interface GradientPlaceholderProps {
  width: number | string;
  height: number | string;
  color?: string;
  background?: string;
  text?: string;
  gradient?: string[];
}

const GradientPlaceholder: React.FC<GradientPlaceholderProps> = ({
  width = 100,
  height = 100,
  color = '#666',
  background = '#ccc',
  text,
  gradient = ['#078efb', '#f9035e']
}) => {
  const displayText = text || `${width}x${height}`;

  let backgroundSvgElement;

  if (gradient && gradient.length > 1) {
    const gradientStops = gradient.map((color, index) => {
      const offset = (index / (gradient.length - 1)) * 100;
      return `<stop offset="${offset}%" stop-color="${color}" />`;
    }).join('');

    backgroundSvgElement = `
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                ${gradientStops}
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
        `;
  } else {
    backgroundSvgElement = `<rect width="100%" height="100%" fill="${background}" />`;
  }

  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${backgroundSvgElement}
        <text x="50%" y="50%" dominant-baseline="middle" font-family="-apple-system, Inter, sans-serif" text-anchor="middle" fill="${color}" font-size="20">
            ${displayText}
        </text>
    </svg>
    `;

  const encodedSvg = encodeURIComponent(svgContent);
  const dataUri = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;

  return < img src={
    dataUri
  }
    alt={
      `${width}x${height} placeholder`
    }
  />;
};

export {
  GradientPlaceholder
};