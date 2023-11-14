import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"

import "./index.css";
const Auth = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [loginBtn, setLoginBtn] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [gender, setGender] = useState("");
  const [phNumber, setPhnNumber] = useState("");
  const [showpassword,setShowpassword]=useState(false)
  const onSubmitSuccess = jwtToken =>{
    Cookies.set('jwt_token', jwtToken) 
    navigate("/");
}

  const onSubmitFailure = errormsg=>{
    setSubmitError(true);
    setErrorMsg(errormsg)
}

  const renderUserName = ()=>{
    return(
        <>
            <label 
                className='label'
                htmlFor="name"
            >
                UserName
            </label>
            <input 
                type="text" 
                id="name"
                placeholder='Enter Your name'
                className='  user-input'
                value={name}
                onChange={((e)=>setName(e.target.value))}
            />
        </>
    )

}
const renderEmail =()=>{
  return(
    <>
      <label className="label" htmlFor="email">Email</label>
      <input 
      type="text"
      id="email"
      placeholder="Enter Your Email"
      value={email}
      className="user-input"
      onChange={((e)=>setEmail(e.target.value))}
      />
    </>
  )
}
const renderPhnNumber =()=>{
  return(
    <>
      <label className="label" htmlFor="phNumber">Phone Number</label>
      <input
        type="text"
        id="phNumber"
        className="user-input"
        value={phNumber}
        placeholder="Enter your Number"
        onChange={((e)=>setPhnNumber(e.target.value))}

      />
    </>
  )
}
const renderGender = ()=>{
  return(
      <>
          <label 
              className='label'
              htmlFor="gender"
          >
             Gender
          </label>
          <input 
              type="text" 
              id="gender"
              placeholder='Enter Your Gender'
              className='user-input'
              value={gender}
              onChange={((e)=>setGender(e.target.value))}
          />
      </>
  )
}
const renderPassword = ()=>{
  return(
      <>
          <label 
              className='label'
              htmlFor="password"
          >
             Password
          </label>
       <div className="passwordcontainer">
       <input 
              type={showpassword?"text":"password"} 
              id="password"
              placeholder='Enter Your Password'
              className='userpassword'
              value={password}
              onChange={((e)=>setPassword(e.target.value))}
          />
          <button className="button_icon" onClick={(()=>setShowpassword(!showpassword))}>
            {showpassword?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}
          </button>
       </div>
      </>
  )
}


const onSubmitForm = async event =>{
  event.preventDefault();
  if(loginBtn === "login"){
      const url = "http://localhost:6600/auth/login";
      const options = {
          method:"POST",
          headers:{
              'Content-Type':'application/json',
          },
          body: JSON.stringify({
              email,
              password
          }),
      }
      const response = await fetch(url, options)
      const data = await response.json()

      if(response.ok === true){
          onSubmitSuccess(data.token) 
      }else{
          onSubmitFailure(data.message)
      }
     
  }else{
      if(password.length >= 5 && password.length <= 8){
          const url = "http://localhost:6600/auth/signup";
          const options = {
              method:"POST",
              headers:{
                  'Content-Type':'application/json',
              },
              body: JSON.stringify({
                  name,
                  email,
                  phoneNumber:phNumber,
                  gender,
                  password
              }),
          }
          const response = await fetch(url, options)
          const data = await response.json()
          
          if(response.ok === true){
              setLoginBtn("login")
          }else{
              onSubmitFailure(data.message)
          }
      }else{
          showSubmitError(true)
          setErrorMsg("password length should be 5 to 8")
          
      }
     
  }
  setName("")
  setEmail("")
  setPassword("")
  setGender("")
  setPhnNumber("")
}
useEffect(()=>{
  const token = Cookies.get('jwt_token');
  if(token !== undefined){
      navigate("/")
   }
})
  return (
    <div className="jobby-app-container">
      <div className="card-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="logo"
          className="website-logo"
        />
        <div>
          <button
            className={
              loginBtn === "login" ? "login-button" : "login-button btn-off"
            }
            type="submit"
            onClick={() => setLoginBtn("login")}
          >
            Login
          </button>
          <button
                    className={loginBtn === 'signup' ? "login-button":"login-button btn-off"}
                    type='submit'
                    onClick={(()=>setLoginBtn("signup"))}
                >Signup
           </button>
           <form className='form-container'onSubmit={onSubmitForm}>

           <div className='input-container'>{loginBtn === 'signup' ? renderUserName():""}</div>
           <div className='input-container'>{renderEmail()}</div>
           <div className='input-container'>{loginBtn === 'signup' ? renderPhnNumber():""}</div>
           <div className='input-container' >{loginBtn === 'signup' ? renderGender():""}</div>
           <div className='input-container'>{renderPassword()}</div>
           <button className='login-button' type='submit'>{loginBtn === 'login'? "Login":"Signup"}</button>
           {showSubmitError && <p className='error-msg'>{errorMsg}</p>}

           </form>
      
        </div>
      </div>
    </div>
  );
};

export default Auth;
