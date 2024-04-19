import { useState } from "react";
import { signIn, signOut, signUp } from "../api-helper";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [userIn, setUserIn] = useState('');
  const [pwIn, setPwIn] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logoutMessage, setLogoutMessage] = useState<string>('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userSignInData = {
      username: userIn,
      password: pwIn
    };

    const response = await signIn(userSignInData);
    setToken(response.token)
    console.log(response.token);
    localStorage.setItem('token', response.token);
    setUserIn('');
    setPwIn('');

    setIsAuthenticated(true);

    navigate('/dashboard');
  };

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token') || '';
        const message = await signOut(token);
        setLogoutMessage(message);
        setToken('');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } catch (error) {
        console.error('An error occurred:', error)
      }    
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      email
    };

    const response = await signUp(userData);
    setToken(response.token)
    localStorage.setItem('token', response.token);
    console.log(username, response.token);
    setUsername('');
    setEmail('');
    setPassword('');
  
    setIsAuthenticated(true);
    
    navigate('/dashboard');
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(prevShowRegisterForm => ! prevShowRegisterForm);
  }

  return (
    <>
      <h1>welcome to the hero page.</h1>
      <p>please sign in or up</p>
      {isAuthenticated ? (
        <div id="signOut">
        <p>Welcome, user!</p>
        <button onClick={handleSignOut}>Sign Out</button>
        <p>{logoutMessage}</p>
        </div>
      ) : (
        <div id="signIn">
          <form action="POST" onSubmit={handleSignIn}>
            <fieldset>
              <legend>Sign In</legend>
                <label htmlFor="usernameIn"><input type="text" id="usernameIn" placeholder="username" value={userIn} onChange={(e) => setUserIn(e.target.value)} /></label>
                <label htmlFor="userPwIn"><input type="password" id="userPwIn" placeholder="password" value={pwIn} onChange={(e) => setPwIn(e.target.value)} /></label>
            </fieldset>
              <button type="submit">Sign In</button>
          </form>
        
        <hr />
        <div id="signup">
              <button onClick={toggleRegisterForm}>No account?</button>
              {showRegisterForm && (
                <form action="POST" onSubmit={handleSignUp}>
                  <fieldset>
                    <legend>Sign Up</legend>
                    <label htmlFor="userName"><input type="text" id="userName" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
                    <label htmlFor="userEmail"><input type="email" id="userEmail" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                    <label htmlFor="userPW"><input type="password" id="userPW" placeholder="password must have at least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                  </fieldset>
                  <button type="submit">Sign Up</button>
                </form>
       
              )}
            </div>
        </div>
      )}
    </>
  )
}
export default Hero;