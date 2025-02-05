import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export default function Search({ query, setQuery }: Props) {
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField
        fullWidth
        label='Search'
        id='Search'
        value={query}
        className='text-black font-primary'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value.trimStart());
        }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#151515 ',
            transition: 'border-color 300ms ease',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#151515 ',
          },
          color: '#151515 ',
          '&.Mui-focused': {
            color: '#151515 ',
          },
        }}
      />
    </Box>
  );
}
