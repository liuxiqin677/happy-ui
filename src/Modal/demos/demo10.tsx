import { Button, Modal } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleCallback = (cb: Function, mes: number) => {
    console.log(mes);
    cb && cb(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen1(true)}>
        Open Modal
      </Button>
      <Modal
        title="弹窗1"
        open={open1}
        onOk={() => handleCallback(setOpen1, 1)}
        onCancel={() => handleCallback(setOpen1, 1)}
      >
        <p>弹窗1...</p>
        <p>弹窗1...</p>
        <p>弹窗1...</p>
        <Button onClick={() => setOpen2(true)}>嵌套弹窗2</Button>
      </Modal>
      <Modal
        title="弹窗2"
        open={open2}
        onOk={() => handleCallback(setOpen2, 2)}
        onCancel={() => handleCallback(setOpen2, 2)}
      >
        <p>弹窗2...</p>
        <p>弹窗2...</p>
        <Button onClick={() => setOpen3(true)}>嵌套弹窗3</Button>
      </Modal>
      <Modal
        title="弹窗3"
        open={open3}
        onOk={() => handleCallback(setOpen3, 3)}
        onCancel={() => handleCallback(setOpen3, 3)}
      >
        <p>弹窗3...</p>
      </Modal>
    </>
  );
};
