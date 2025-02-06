import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {
  amount: number;
  setPage: (value: number) => void;
  page: number;
}

export default function PaginationControlled({ amount, page, setPage }: Props) {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Stack spacing={2} className='font-primary'>
      <Pagination size='large' count={amount} page={page} onChange={handleChange} className='font-primary' />
    </Stack>
  );
}
