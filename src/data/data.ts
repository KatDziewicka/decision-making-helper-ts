import { ReactNode, CSSProperties } from 'react';
import ReactFlow, { Background, ElementId, ReactFlowProvider } from 'react-flow-renderer';

enum ArrowHeadType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

export interface Edge<T = any> {
  id: ElementId;
  type?: string;
  source: ElementId;
  target: ElementId;
  sourceHandle?: ElementId | null;
  targetHandle?: ElementId | null;
  label?: string | ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: CSSProperties;
  animated?: boolean;
  arrowHeadType?: ArrowHeadType;
  isHidden?: boolean;
  data?: T;
  className?: string;
}

const data: Edge =
    {
        id: "1",
        type: "straight",
        source: "1",
        target: "2",
        animated: true,
        label: "edge label"
      }
export default data
