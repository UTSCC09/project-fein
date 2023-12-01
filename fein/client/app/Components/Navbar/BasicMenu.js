import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/navigation"

//import { signout } from '../../../api/api.mjs'

import Link from 'next/link';

import './Navbar.css';

export function BasicMenu(props) {
  const { signout } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    await signout();
    router.push('/');
  }


  return (
    <div className="self-center">
      <Button
        id="basic-button"
        className="navbar_element"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Cog6ToothIcon className="navbar_icon" />

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem> <Link href="/settings"> Settings </Link></MenuItem>
        <MenuItem onClick={handleClose}>Accessibility</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}