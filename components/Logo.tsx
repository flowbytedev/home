import React from 'react';

interface MarkProps {
  className?: string;
  size?: number | string;
  /** 'dark' is the white drop for dark surfaces, 'light' the blue drop for light ones. */
  tone?: 'dark' | 'light';
}

/**
 * The mark: a byte that has started to flow. A drop (a square on its corner with three corners
 * rounded) carrying a level yellow square. The square has the class "byte" so the stylesheet can
 * move it.
 */
export const DropMark: React.FC<MarkProps> = ({ className, size, tone = 'dark' }) => (
  <svg className={className} viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false">
    <path d="M32 4.9L47.56 20.44A22 22 0 1 1 16.44 20.44Z" fill={tone === 'dark' ? '#fff' : '#2f4bf7'} />
    <rect className="byte" x="23" y="27" width="18" height="18" fill="#ffc21f" />
  </svg>
);

/** The name as it is set next to the mark: lowercase, with a lighter "byte" so the two words read. */
export const Wordmark: React.FC = () => (
  <span className="wm">
    flow<i>byte</i>
  </span>
);

export default DropMark;
