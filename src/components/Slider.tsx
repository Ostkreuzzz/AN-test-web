import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const minDistance = 10;

function valuetext(value: number) {
  return `${value}$`;
}

interface Props {
  value: number[];
  setValue: (value: number[]) => void;
}

export default function RangeSlider({ value, setValue }: Props) {
  const handleChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography gutterBottom>Price</Typography>
      <Slider
        getAriaLabel={() => 'Minimum price'}
        value={value}
        color='info'
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
