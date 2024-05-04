import { useState } from "react";
import { signIn, signUp } from "../api-helper";
import { useNavigate, Link } from "react-router-dom";
import { Box, CssBaseline, Grid, Typography, Avatar, Paper, TextField, Button } from "@mui/material";
import HikingIcon from '@mui/icons-material/Hiking';
import mushroom from '../assets/images/heart.jpg';
import logo from '../assets/images/logo.png';

interface HeroProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero: React.FC<HeroProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const [userIn, setUserIn] = useState('');
  const [pwIn, setPwIn] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userSignInData = {
      username: userIn,
      password: pwIn
    };
    try {
      await signIn(userSignInData);
      setUserIn('');
      setPwIn('');

      setIsAuthenticated(true);

      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('An error occurred during sign in. Please check your username and password and try again.');
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    const userData = {
      username,
      password,
      email,
      first_name: fName,
      last_name: lName
    };
    try {
      await signUp(userData);
      setUsername('');
      setEmail('');
      setPassword('');
      setFName('');
      setLName('');

      setIsAuthenticated(true);

      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('An error occurred during sign up. Please check your details and try again.');
    }
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(prevShowRegisterForm => !prevShowRegisterForm);
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="text.success" align="center">
        {'Copyright © '}
        <Link color="inherit" to="https://kimmykokonut.github.io/">
          kimmykokonut
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <div id="hero">
      {isAuthenticated ? (
        <p>You are already signed in</p>
      ) : (
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7}
            sx={{
              backgroundImage: `url(${mushroom})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} >
              <Box sx={{ m: 5, display: { xs: 'none', sm: 'block' } }}>
                <img src={logo} alt="Myco Matrix logo" height="250vh" style={{ marginLeft: '64px' }} />
                <Typography variant="h5" color="text.primary" sx={{ mt: -3 }}>Connect, Forage, Discover</Typography>
              </Box>
            </Grid>

          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
              <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                <HikingIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">Sign In</Typography>
              <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="usernameIn"
                  label="Username"
                  name="usernameIn"
                  autoComplete="username"
                  autoFocus
                  value={userIn}
                  onChange={(e) => setUserIn(e.target.value)} />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="userPwIn"
                  label="Password"
                  type="password"
                  id="userPwIn"
                  autoComplete="current-password"
                  value={pwIn}
                  onChange={(e) => setPwIn(e.target.value)} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                <Grid container>
                  <Grid item xs>
                    <Typography variant="body2">
                      <Link to='#'>Forgot password?</Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={toggleRegisterForm}>
                      No account? Sign up</Button>
                  </Grid>
                  </Grid>
                  {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                  </Box>    

                    {showRegisterForm && (
                      <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
                        <Typography component="h1" variant="h5">Sign Up</Typography>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="userName"
                          label="Username"
                          name="userName"
                          autoComplete="username"
                          autoFocus
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="userEmail"
                          label="Email"
                          name="userEmail"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="userPW"
                          label="Password"
                          name="userPW"
                          type="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          name="firstName"
                          autoComplete="given-name"
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          value={lName}
                          onChange={(e) => setLName(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                      </Box>
                    )}
                  
                <Box sx={{ mt: 5 }}>
                  <Copyright />
                </Box>
              </Box>
            
          </Grid>
        </Grid>
      )}
    </div>
  )
}
export default Hero;