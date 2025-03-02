import React from 'react';
import { Card } from 'antd';
const CardComponent = ({action,content}) => (
  <Card
    style={{
      width: "100%",
      height: "100%"
      
    }}
  >
    {action}
    {content}
  </Card>
);
export default CardComponent;