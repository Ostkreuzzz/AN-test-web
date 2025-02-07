import { ShoppingCart, Flight, Bookmark } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <header
      className='flex h-56 w-lvw items-center justify-between gap-56 bg-white
    px-24 shadow-xl desktop:h-90% desktop:w-96 
    desktop:flex-col desktop:justify-start desktop:rounded-xl desktop:py-32'
    >
      <NavLink to='/'>
        <Flight
          className='hover:scale-105'
          sx={{
            width: '32px',
            height: '32px',
          }}
        />
      </NavLink>

      <ul className='flex gap-24 desktop:flex-col desktop:gap-32'>
        <li>
          <NavLink to='/cart'>
            <ShoppingCart
              className='hover:scale-105'
              color='info'
              sx={{
                width: '32px',
                height: '32px',
              }}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to='/bookmarks'>
            <Bookmark
              className='hover:scale-105'
              color='secondary'
              sx={{
                width: '32px',
                height: '32px',
              }}
            />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
