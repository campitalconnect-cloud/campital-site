import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '../common/Button';

export const CopyEmailButton = ({ onCopy, text = 'Copy Email Details', className = '', ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      icon={copied ? Check : Copy}
      className={className}
      {...props}
    >
      {copied ? 'Details Copied!' : text}
    </Button>
  );
};
