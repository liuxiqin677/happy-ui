import { CSSProperties } from 'react';

type TTreeNodeData = {
  id: string;
  label: string;
  children?: Array<TTreeNodeData>;
};

interface ISelectNodes {
  [nodeId: string]: TTreeNodeData;
}

interface ITreeEvents {
  onExpand?: (expandNode: TTreeNodeData) => any;
  onCollapse?: (expandNode: TTreeNodeData) => any;
  onSelect?: (selectNodes: Array<string>) => any;
}

interface ITreeProps extends ITreeEvents {
  className?: string;
  style?: CSSProperties;
  data: Array<TTreeNodeData>;
  selectable?: boolean;
}

interface ITreeNodeProps extends TTreeNodeData {
  open?: boolean;
  select?: boolean;
  disable?: boolean;
  childrenData?: Array<TTreeNodeData>;
}

interface ITreeContext {
  selectable: boolean;
  selectNodes: Array<string>;
  setSelectNodes: any;
  onExpand?: (expandNode: TTreeNodeData) => any;
  onCollapse?: (expandNode: TTreeNodeData) => any;
  onSelect?: (selectNodes: Array<string>) => any;
}

export {
  ISelectNodes,
  ITreeContext,
  ITreeEvents,
  ITreeNodeProps,
  ITreeProps,
  TTreeNodeData,
};
