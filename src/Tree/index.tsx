import React, { FC, createContext, useState } from 'react';
import { useCallbackAfterFirstMounted } from '../../common/hook';
import TreeNode from './TreeNode';
import './index.less';
import { ITreeContext, ITreeProps } from './interface';

export const TreeContext = createContext<ITreeContext>({
  selectable: false,
  selectNodes: [],
  setSelectNodes: () => {},
  onExpand: () => {},
  onCollapse: () => {},
  onSelect: () => {},
});

// dfs 渲染 tree
export const generateTreeNode = (node: any, resetProps: any = {}) => {
  if (!node) return null;

  return (
    <TreeNode
      key={node.id}
      {...node}
      {...resetProps}
      childrenData={node.children}
    >
      {node.children &&
        node.children.length &&
        node.children.map((child: any) => generateTreeNode(child))}
    </TreeNode>
  );
};

const Tree: FC<ITreeProps> = ({
  data,
  onExpand,
  onCollapse,
  onSelect,
  selectable = false,
}) => {
  const [selectNodes, setSelectNodes] = useState<Array<string>>([]);

  useCallbackAfterFirstMounted(() => {
    onSelect && onSelect(selectNodes);
  }, [selectNodes]);

  return (
    <div className="happy-tree">
      <TreeContext.Provider
        value={{
          selectable,
          selectNodes,
          setSelectNodes,
          onExpand,
          onCollapse,
          onSelect,
        }}
      >
        {data && data.map((item) => generateTreeNode(item))}
      </TreeContext.Provider>
    </div>
  );
};

export default Tree;
