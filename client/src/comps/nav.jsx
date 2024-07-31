import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';

function Nav() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Kalebs Recipe Review
          </Typography>
          <Button component={Link} to='/' sx={{ color: '#ffffff' }}>
            Home
          </Button>
          <Button component={Link} to='/users' sx={{ color: '#ffffff' }}>
            Users
          </Button>
          <Button component={Link} to='/reviews' sx={{ color: '#ffffff' }}>
            Reviews
          </Button>
          <Button component={Link} to='/recipes' sx={{ color: '#ffffff' }}>
            Recipes
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default Nav