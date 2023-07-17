import React, { useState } from 'react';
import { Alert, Button, Spin, Switch } from 'antd';
const Loading = ({content,loading}) => {
  return (
    <div>
      <Spin spinning={loading}>
        {content}
      </Spin>
      <div
        style={{
          marginTop: 16,
        }}
      >
      </div>
    </div>
  );
};
export default Loading;