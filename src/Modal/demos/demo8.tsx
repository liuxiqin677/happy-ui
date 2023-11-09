import { Button, Modal, Space } from 'happy-ui';
import React, { useState } from 'react';
import { TModalType } from '../interface';

export default () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TModalType>('confirm');

  const showModal = (type: TModalType) => {
    setType(type);
    setOpen(true);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => showModal('confirm')}>
          Confirm Modal
        </Button>
        <Button type="primary" onClick={() => showModal('warning')}>
          Warning Modal
        </Button>
        <Button type="primary" onClick={() => showModal('info')}>
          Info Modal
        </Button>
        <Button type="primary" onClick={() => showModal('error')}>
          Error Modal
        </Button>
        <Button type="primary" onClick={() => showModal('success')}>
          Success Modal
        </Button>
      </Space>
      <Modal
        title={type}
        open={open}
        type={type}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
