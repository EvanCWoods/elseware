import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

const defaultProps = { size: 32, color: 'currentColor' };
const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 32 32',
  fill: 'none',
});
const strokeProps = (color: string) => ({
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const LofiIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M12 6v16" {...strokeProps(color)} />
    <Circle cx={8} cy={22} r={4} {...strokeProps(color)} />
    <Path d="M12 6l8-3v6l-8 3" {...strokeProps(color)} />
    <Path d="M24 8l1.5-1.5M26 12l2 0M24 16l1.5 1.5" {...strokeProps(color)} />
  </Svg>
);

export const JazzIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M22 4l-2 3-1 2c0 2 1 4 0 7s-3 5-5 7c-2 2-4 3-6 3" {...strokeProps(color)} />
    <Circle cx={8} cy={26} r={2} {...strokeProps(color)} />
    <Ellipse cx={22} cy={4} rx={2} ry={1} {...strokeProps(color)} />
    <Path d="M15 14l3-1M14 18l3-1" {...strokeProps(color)} />
  </Svg>
);

export const ClassicalIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M16 4v24" {...strokeProps(color)} />
    <Path d="M12 8c-4 2-5 5-4 8s3 5 4 6c1-1 3-3 4-6s0-6-4-8z" {...strokeProps(color)} />
    <Path d="M12 18c-4 2-5 4-4 7s3 4 4 5c1-1 3-2 4-5s0-5-4-7z" {...strokeProps(color)} />
    <Path d="M14 13h4M14 15h4" {...strokeProps(color)} />
  </Svg>
);

export const SynthwaveIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Circle cx={16} cy={14} r={7} {...strokeProps(color)} />
    <Path d="M9 14h14" {...strokeProps(color)} />
    <Path d="M10 17h12" {...strokeProps(color)} />
    <Path d="M12 20h8" {...strokeProps(color)} />
    <Path d="M4 24l4-4M28 24l-4-4" {...strokeProps(color)} />
    <Path d="M6 28l2-2M26 28l-2-2M16 28v-4" {...strokeProps(color)} />
  </Svg>
);

export const AmbientIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Circle cx={16} cy={16} r={3} {...strokeProps(color)} />
    <Path d="M16 7a9 9 0 010 18" {...strokeProps(color)} />
    <Path d="M16 7a9 9 0 000 18" {...strokeProps(color)} />
    <Path d="M16 3a13 13 0 010 26" {...strokeProps(color)} />
    <Path d="M16 3a13 13 0 000 26" {...strokeProps(color)} />
  </Svg>
);

export const PianoIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Rect x={4} y={6} width={24} height={20} rx={2} {...strokeProps(color)} />
    <Path d="M8 26V6M12 26V6M16 26V6M20 26V6M24 26V6" {...strokeProps(color)} />
    <Rect x={7} y={6} width={3} height={12} rx={0.5} fill={color} stroke="none" />
    <Rect x={15} y={6} width={3} height={12} rx={0.5} fill={color} stroke="none" />
    <Rect x={19} y={6} width={3} height={12} rx={0.5} fill={color} stroke="none" />
  </Svg>
);

export const RainIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M10 8l-2 6c0 2 1 3 2 3s2-1 2-3l-2-6z" fill={color} stroke="none" opacity={0.5} />
    <Path d="M18 4l-3 8c0 3 1.5 4 3 4s3-1 3-4l-3-8z" fill={color} stroke="none" opacity={0.4} />
    <Path d="M12 20l-1.5 5c0 1.5 0.7 2.5 1.5 2.5s1.5-1 1.5-2.5l-1.5-5z" fill={color} stroke="none" opacity={0.6} />
    <Path d="M22 16l-1 4c0 1.5 0.5 2 1 2s1-0.5 1-2l-1-4z" fill={color} stroke="none" opacity={0.35} />
  </Svg>
);

export const ThunderIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M8 14c-3 0-5-2-4-5s4-5 7-5c2-3 6-4 9-2s4 5 3 8" {...strokeProps(color)} />
    <Path d="M24 10c2 1 3 3 2 5s-3 3-5 3H8" {...strokeProps(color)} />
    <Path d="M17 14l-3 6h5l-3 8" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CoffeeIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M6 14h16v10c0 2-2 4-4 4H10c-2 0-4-2-4-4V14z" {...strokeProps(color)} />
    <Path d="M22 16c3 0 4 2 4 4s-1 4-4 4" {...strokeProps(color)} />
    <Path d="M10 10c0-2 2-2 2 0M14 8c0-3 2-3 2 0M18 10c0-2 2-2 2 0" {...strokeProps(color)} />
    <Path d="M4 14h20" {...strokeProps(color)} />
  </Svg>
);

export const FireplaceIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M16 4c0 0-8 8-8 16c0 4 3 8 8 8s8-4 8-8c0-8-8-16-8-16z" {...strokeProps(color)} />
    <Path d="M16 14c0 0-3 3-3 7c0 2 1.5 3.5 3 3.5s3-1.5 3-3.5c0-4-3-7-3-7z" fill={color} stroke="none" opacity={0.35} />
  </Svg>
);

export const TrainIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Rect x={4} y={10} width={22} height={12} rx={3} {...strokeProps(color)} />
    <Path d="M4 16h22" {...strokeProps(color)} />
    <Rect x={7} y={12} width={4} height={4} rx={1} {...strokeProps(color)} />
    <Rect x={14} y={12} width={4} height={4} rx={1} {...strokeProps(color)} />
    <Circle cx={9} cy={26} r={2} {...strokeProps(color)} />
    <Circle cx={23} cy={26} r={2} {...strokeProps(color)} />
    <Path d="M26 14l3-4" {...strokeProps(color)} />
  </Svg>
);

export const ChatterIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M4 6h16c1 0 2 1 2 2v8c0 1-1 2-2 2h-4l-4 4v-4H4c-1 0-2-1-2-2V8c0-1 1-2 2-2z" {...strokeProps(color)} />
    <Path d="M14 22h10c1 0 2 1 2 2v5c0 1-1 2-2 2h-2l-3 0v0l-2-2" {...strokeProps(color)} />
    <Circle cx={8} cy={12} r={1} fill={color} stroke="none" />
    <Circle cx={12} cy={12} r={1} fill={color} stroke="none" />
    <Circle cx={16} cy={12} r={1} fill={color} stroke="none" />
  </Svg>
);

export const WindIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M3 10h18c2 0 3-1 3-3s-1-3-3-3" {...strokeProps(color)} />
    <Path d="M3 16h22c2 0 3 1 3 3s-1 3-3 3" {...strokeProps(color)} />
    <Path d="M6 22h12c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5" {...strokeProps(color)} />
  </Svg>
);

export const BirdsIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M4 14c4-6 8-8 12-6s4 6 0 6-6-4-6-4" {...strokeProps(color)} />
    <Path d="M16 8l6-4" {...strokeProps(color)} />
    <Path d="M28 18c-3-5-7-6-10-4s-3 5 0 5 5-3 5-3" {...strokeProps(color)} />
    <Circle cx={13} cy={11} r={1} fill={color} stroke="none" />
  </Svg>
);

export const OceanIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M2 12c3-3 6-3 8 0s5 3 8 0 5-3 8 0" {...strokeProps(color)} />
    <Path d="M2 18c3-3 6-3 8 0s5 3 8 0 5-3 8 0" {...strokeProps(color)} />
    <Path d="M2 24c3-3 6-3 8 0s5 3 8 0 5-3 8 0" {...strokeProps(color)} />
  </Svg>
);

export const TypingIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Rect x={3} y={10} width={26} height={16} rx={2} {...strokeProps(color)} />
    <Path d="M6 14h3M11 14h3M17 14h3M23 14h3" {...strokeProps(color)} />
    <Path d="M8 18h3M14 18h3M20 18h3" {...strokeProps(color)} />
    <Path d="M10 22h12" {...strokeProps(color)} />
    <Path d="M14 7v3" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const VinylIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Circle cx={16} cy={16} r={12} {...strokeProps(color)} />
    <Circle cx={16} cy={16} r={4} {...strokeProps(color)} />
    <Circle cx={16} cy={16} r={1.5} fill={color} stroke="none" />
    <Circle cx={16} cy={16} r={7} stroke={color} strokeWidth={1.8} strokeDasharray="2 2" opacity={0.5} />
    <Circle cx={16} cy={16} r={10} stroke={color} strokeWidth={1.8} strokeDasharray="1.5 3" opacity={0.35} />
  </Svg>
);

export const CityIcon = ({ size = 32, color = '#2e2a24' }: IconProps) => (
  <Svg {...svgProps(size)}>
    <Path d="M2 28V18h4v10" {...strokeProps(color)} />
    <Path d="M6 28V12h3V8h2v4h3v16" {...strokeProps(color)} />
    <Path d="M14 28V14h4v14" {...strokeProps(color)} />
    <Path d="M18 28V10h3V6h2v4h3v18" {...strokeProps(color)} />
    <Path d="M26 28V16h4v12" {...strokeProps(color)} />
    <Path d="M2 28h28" {...strokeProps(color)} />
    <Rect x={8} y={14} width={1.5} height={2} fill={color} stroke="none" opacity={0.5} />
    <Rect x={20} y={12} width={1.5} height={2} fill={color} stroke="none" opacity={0.5} />
    <Rect x={15} y={18} width={1.5} height={2} fill={color} stroke="none" opacity={0.5} />
  </Svg>
);

// Map channel IDs to icon components
export const CHANNEL_ICONS: Record<string, React.FC<IconProps>> = {
  lofi: LofiIcon,
  jazz: JazzIcon,
  classical: ClassicalIcon,
  synthwave: SynthwaveIcon,
  ambient: AmbientIcon,
  piano: PianoIcon,
  rain: RainIcon,
  thunder: ThunderIcon,
  coffee: CoffeeIcon,
  fireplace: FireplaceIcon,
  train: TrainIcon,
  chatter: ChatterIcon,
  wind: WindIcon,
  birds: BirdsIcon,
  ocean: OceanIcon,
  typing: TypingIcon,
  vinyl: VinylIcon,
  city: CityIcon,
};
