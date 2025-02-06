import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  isDisabled: boolean;
  title: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function BasicButton({ title, isDisabled, handleClick }: Props) {
  return (
    <Button disabled={isDisabled} onClick={handleClick} variant='outlined' className='font-primary text-xl'>
      {title}
    </Button>
  );
}
