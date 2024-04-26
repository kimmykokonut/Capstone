import { useEffect, useState } from "react";
import { signIn, signUp, checkAuthentication } from "../api-helper";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await checkAuthentication();
      setIsAuthenticated(response.isAuthenticated);
      if (response.isAuthenticated) {
        navigate('/dashboard');
      }
    };
    checkUserAuthentication();
  }, [navigate]);

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
      setErrorMessage('An error occurred during sign up. Please check your username and password and try again.');
    } 
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(prevShowRegisterForm => ! prevShowRegisterForm);
  }

  return (
    <>
      <h1>welcome to the hero page.</h1>
      <p>please sign in or up</p>
      {errorMessage && <p>{errorMessage}</p>}
      {!isAuthenticated && (
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
                  <fieldset>
                  <legend>Registration Info</legend>
                  <label htmlFor="firstName"><input type="text" id="firstName" placeholder="First Name" value={fName} onChange={(e) => setFName(e.target.value)} /></label>
                  <label htmlFor="lastName"><input type="text" id="lastName" placeholder="Last Name" value={lName} onChange={(e) => setLName(e.target.value)} /></label>
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