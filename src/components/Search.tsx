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
        label='Search by code'
        id='Search'
        color='info'
        value={query}
        className='font-primary text-black'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value.trimStart());
        }}
      />
    </Box>
  );
}
