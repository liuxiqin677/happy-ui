import React, { FC, createContext, useState } from 'react';
import { useCallbackAfterFirstMounted } from '../../common/hook';
import TreeNode from './TreeNode';
import './index.less';
import { ITreeProps } from './interface';

export const TreeContext = createContext<any>({});

// dfs 渲染 tree
const generateTreeNode = (node: any) => {
  if (!node) return null;

  return (
    <TreeNode key={node.id} {...node} childrenData={node.children}>
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
          data,
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
