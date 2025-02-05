import { ShoppingCart, Flight, Bookmark } from '@mui/icons-material';

export default function Navigation() {
  return (
    <div
      className='flex h-56 w-lvw items-center justify-between gap-72 bg-white
    px-24 shadow-xl desktop:h-90% desktop:w-96 
    desktop:flex-col desktop:justify-start desktop:rounded-xl desktop:py-32'
    >
      <Flight
        className='text-red hover:scale-105'
        sx={{
          width: '32px',
          height: '32px',
        }}
      />

      <ul className='flex gap-24 desktop:flex-col desktop:gap-32'>
        <li>
          <ShoppingCart
            className='hover:text-light-blue'
            sx={{
              width: '32px',
              height: '32px',
            }}
          />
        </li>
        <li>
          <Bookmark
            className='hover:text-light-blue'
            sx={{
              width: '32px',
              height: '32px',
            }}
          />
        </li>
      </ul>
    </div>
  );
}
