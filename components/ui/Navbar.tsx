
import { AppBar, IconButton, Toolbar, Link, Typography } from '@mui/material';
import { MenuOutlined } from "@mui/icons-material";
import NextLink from 'next/link';

export const Navbar = () => {

  return (
    <AppBar position='sticky' elevation={ 0 }>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
            >
                <MenuOutlined />
            </IconButton>


            <NextLink href="/" passHref legacyBehavior>
                <Link>
                    <Typography variant="h6" color='white'>Cookie Master</Typography>
                </Link>
            </NextLink>

            <div style={{  flex: 1 }} />

            <NextLink href='/theme-changer' passHref legacyBehavior>
                <Link>
                    <Typography variant="h6" color='white'>Camiar tema</Typography>
                </Link>
            </NextLink>

        </Toolbar>
    </AppBar>
    )
}
