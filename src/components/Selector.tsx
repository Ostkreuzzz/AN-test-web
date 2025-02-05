'use client';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  title: string;
  setValue: (value: string) => void;
  value: string;
  items: string[];
}

export default function Selector({ title, value, items, setValue }: Props) {
  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <FormControl
      className='text-black h-fit w-full font-primary'
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#151515 ',
          transition: 'border-color 300ms ease',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#151515 ',
        },
      }}
    >
      <InputLabel
        id='demo-simple-select-label'
        className='font-primary text-xl'
        sx={{
          color: '#151515 ',
          '&.Mui-focused': {
            color: '#151515 ',
          },
        }}
      >
        {title}
      </InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={value}
        label={title}
        onChange={handleChange}
        className='font-primary text-xl text-white '
        sx={{
          '& .MuiSelect-icon': {
            color: '#151515 ',
          },
        }}
      >
        <MenuItem value={0}>All</MenuItem>

        {items.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
