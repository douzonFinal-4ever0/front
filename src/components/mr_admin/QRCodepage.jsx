import React, { useState } from 'react';
import QRcode from '../mr_user/QRcode';

const QRCodepage = () => {
  const [url, setUrl] = useState('');

  return <QRcode srcValue={'http://192.168.0.177:3000/mr/rez/REZ233 '} />;
};

export default QRCodepage;
