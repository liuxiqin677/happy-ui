import { Button, Modal, Space } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [styles, setStyles] = useState({});

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setStyles({
              header: {
                color: 'red',
                fontSize: '24px',
              },
            });
            setOpen(true);
          }}
        >
          header
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setStyles({
              body: {
                fontSize: '36px',
              },
            });
            setOpen(true);
          }}
        >
          body
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setStyles({
              footer: {
                backgroundColor: 'orange',
              },
            });
            setOpen(true);
          }}
        >
          footer
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setStyles({
              mask: {
                backgroundColor: 'rgba(247,220,111,0.667)',
              },
            });
            setOpen(true);
          }}
        >
          mask
        </Button>
      </Space>

      <Modal
        title="自定义Styles"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        styles={styles}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
