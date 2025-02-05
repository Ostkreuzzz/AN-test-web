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
      <Pagination
        size='large'
        count={amount}
        page={page}
        onChange={handleChange}
        className='font-primary'
        // sx={{
        //   '& .MuiPaginationItem-root': {
        //     color: '#5A698F',
        //     fontFamily: 'inherit',
        //     transition: 'color 300ms ease, border-color 300ms ease',
        //   },
        //   '& .MuiPaginationItem-page:hover': {
        //     color: '#FC4747',
        //   },
        //   '& .MuiPaginationItem-root.Mui-selected': {
        //     color: '#FFFFFF',
        //     backgroundColor: '#FC4747',
        //   },
        //   '& .MuiPaginationItem-ellipsis': {
        //     color: '#5A698F',
        //   },
        //   '& .MuiPaginationItem-root.Mui-selected:hover': {
        //     backgroundColor: '#FF5A5A',
        //   },
        //   '& .MuiPaginationItem-root.Mui-disabled': {
        //     color: '#9E9E9E',
        //   },
        // }}
      />
    </Stack>
  );
}
