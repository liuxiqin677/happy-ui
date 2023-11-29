import React, { FC, MouseEvent, useContext, useEffect, useState } from 'react';
import { useCallbackAfterFirstMounted } from '../../common/hook';
import CaretDownOutlined from '../../components/CaretDownOutlined';
import CaretRightOutlined from '../../components/CaretRightOutlined';
import Checkbox from '../CheckBox';
import { TreeContext, generateTreeNode } from './index';
import { ITreeContext, ITreeNodeProps, TTreeNodeData } from './interface';

const nodeBaseClass = 'happy-tree-node';
const labelBaseClass = 'happy-tree-node-label';
const nodeStyleMap = {
  base: nodeBaseClass,
  expand: `${nodeBaseClass} ${nodeBaseClass}-children-expand`,
  disabled: `${nodeBaseClass} ${nodeBaseClass}-disabled`,
};
const labelStyleMap = {
  base: labelBaseClass,
  leaf: `${labelBaseClass} ${labelBaseClass}-leaf`,
  open: `${labelBaseClass} ${labelBaseClass}-open`,
  disabled: `${labelBaseClass} ${labelBaseClass}-disabled`,
};

const TreeNode: FC<ITreeNodeProps> = ({
  id,
  label,
  childrenData,
  open = false,
  disable = false,
  select = false,
  children,
}) => {
  const { selectable, setSelectNodes, onExpand, onCollapse } =
    useContext<ITreeContext>(TreeContext);
  const [nodeSelect, setNodeSelect] = useState<boolean>(select);
  const [nodeExpand, setNodeExpand] = useState<boolean>(open);
  const [nodeStyle, setNodeStyle] = useState<string>(nodeStyleMap.base);
  let [labelStyle, setLabelStyle] = useState<string>(labelStyleMap.base);

  const currentNode = { id, label, children: childrenData };

  useEffect(() => {
    if (nodeExpand) {
      setLabelStyle(labelStyleMap.open);
      setNodeStyle(nodeStyleMap.expand);
    } else {
      setNodeStyle(nodeStyleMap.base);
      setLabelStyle(labelStyleMap.base);
    }
  }, [nodeExpand]);

  if (!children) {
    labelStyle = labelStyleMap.leaf;
  }

  useCallbackAfterFirstMounted(() => {
    if (nodeExpand) {
      onCollapse && onCollapse(currentNode);
    } else {
      onExpand && onExpand(currentNode);
    }
  }, [nodeExpand]);

  // 切换节点
  const toggleNode = (e: MouseEvent) => {
    e.stopPropagation();
    setNodeExpand(!nodeExpand);
  };

  // dfs选中节点
  const dfsSelectNode = (node: TTreeNodeData, selectNodes: Array<string>) => {
    node.label &&
      !selectNodes.includes(node.label) &&
      selectNodes.push(node.label);
    if (node.children && node.children.length) {
      node.children.map((child: TTreeNodeData) => {
        dfsSelectNode(child, selectNodes);
      });
    } else {
      return;
    }
  };

  // dfs 取消选中节点
  const dfsCancelSelectNode = (
    node: TTreeNodeData,
    selectNodes: Array<string>,
  ) => {
    let result = selectNodes.filter((label: string) => label !== node.label);
    if (!node.children || !node.children.length) return result;
    if (node.children && node.children.length) {
      node.children.map((child: TTreeNodeData) => {
        result = dfsCancelSelectNode(child, result);
      });
    }
    return result;
  };

  // 选中节点
  const handleSelect = (checked: boolean) => {
    setSelectNodes((prev: Array<string>) => {
      let result = [...prev];
      if (checked) {
        dfsSelectNode(currentNode, result);
      } else {
        result = dfsCancelSelectNode(currentNode, prev);
      }
      return result;
    });
    setNodeSelect(checked);
  };

  // 父节点选中时，子节点也选中
  useEffect(() => {
    setNodeSelect(select);
  }, [select]);

  return (
    <div className={nodeStyle}>
      <div className={labelStyle}>
        {children?.length && (
          <div className="happy-tree-arrow" onClick={toggleNode}>
            {nodeExpand ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </div>
        )}
        {selectable && (
          <Checkbox
            disabled={disable}
            onChange={handleSelect}
            checked={nodeSelect}
          />
        )}
        <div className={disable ? 'happy-tree-label-disabled' : ''}>
          {label}
        </div>
      </div>

      {childrenData && childrenData.length && (
        <div className="happy-tree-node-children">
          {childrenData.map((child) => {
            return generateTreeNode(child, {
              select: nodeSelect,
            });
          })}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
