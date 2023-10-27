import { Button, Radio, Skeleton, Space, Divider } from 'happy-ui';
import React, { useState } from 'react';

type SizeType = 'default' | 'small' | 'large';
type ButtonShapeType = 'circle' | 'square' | 'round';
type AvatarShapeType = 'circle' | 'square';

export default () => {
  const [active, setActive] = useState(false);
  const [size, setSize] = useState<SizeType>('default');
  const [block, setBlock] = useState(false);
  const [buttonShape, setButtonShape] = useState<ButtonShapeType>('square');
  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>('circle');

  const handleActiveChange = (checked: boolean) => {
    setActive(checked);
  };

  const handleSizeChange = (value: any) => {
    setSize(value);
  };

  const handleShapeButton = (value: any) => {
    setButtonShape(value);
  };

  const handleBlockChange = (checked: boolean) => {
    setBlock(checked);
  };

  const handleAvatarShape = (value: any) => {
    setAvatarShape(value);
  };

  return (
    <>
      <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
      <br />
      <br />
      <Skeleton.Button
        active={active}
        size={size}
        shape={buttonShape}
        block={block}
      />
      <br />
      <br />
      <Skeleton.Input active={active} size={size} block={block} />
      <br />
      <br />
      <Skeleton.Image active={active} />
      <Divider />
      <Space size={16} direction="vertical">
        <Space>
          Active：
          <Button type="primary" onClick={() => handleActiveChange(!active)}>
            {active ? 'unActive' : 'Active'}
          </Button>
        </Space>
        <Space>
          Size:
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="default">default</Radio.Button>
            <Radio.Button value="small">small</Radio.Button>
            <Radio.Button value="large">large</Radio.Button>
          </Radio.Group>
        </Space>
        <Space>
          Button Shape:
          <Radio.Group value={buttonShape} onChange={handleShapeButton}>
            <Radio.Button value="circle">circle</Radio.Button>
            <Radio.Button value="square">square</Radio.Button>
            <Radio.Button value="round">round</Radio.Button>
          </Radio.Group>
        </Space>
        <Space>
          Button And Input Block:
          <Button type="primary" onClick={() => handleBlockChange(!block)}>
            {block ? 'UnBlock' : 'Block'}
          </Button>
        </Space>
        <Space>
          Avatar Shape：
          <Radio.Group value={avatarShape} onChange={handleAvatarShape}>
            <Radio.Button value="square">Square</Radio.Button>
            <Radio.Button value="circle">Circle</Radio.Button>
          </Radio.Group>
        </Space>
      </Space>
    </>
  );
};
