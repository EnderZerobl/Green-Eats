import React from 'react';
import "../arrowCarousel/arrow.css";
import nextArrow from "@public/fowardArrow.svg";
import previousArrow from "@public/previousArrow.svg";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <svg width="17" height="50" viewBox="0 0 17 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_276_14053)">
<path d="M-0.300058 9.05053C-0.500058 9.40053 2.59994 12.8505 7.04994 17.3005L14.7499 25.0005L7.09994 32.6505C0.949942 38.8005 -0.450058 40.4505 0.0999419 40.9005C0.649942 41.3505 2.49994 39.8005 8.99994 33.2505L17.2499 25.0005L8.99994 16.7505C4.44994 12.2005 0.599942 8.50053 0.399942 8.50053C0.199942 8.50053 -0.100058 8.75053 -0.300058 9.05053Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_276_14053">
<rect width="17" height="50" fill="white"/>
</clipPath>
</defs>
</svg>

    </div>
  );
};

export const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', zIndex: 1 }}
      onClick={onClick}
    >
      <svg width="17" height="50" viewBox="0 0 17 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_276_14111)">
<path d="M8 16.7505L-0.25 25.0005L8 33.2505C14.5 39.8005 16.35 41.3505 16.9 40.9005C17.45 40.4505 16.05 38.8005 9.9 32.6505L2.25 25.0005L9.95 17.3005C16.65 10.5505 18.25 8.50053 16.6 8.50053C16.4 8.50053 12.55 12.2005 8 16.7505Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_276_14111">
<rect width="17" height="50" fill="white"/>
</clipPath>
</defs>
</svg>

    </div>
  );
};
