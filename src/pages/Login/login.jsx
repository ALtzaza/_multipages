import { useRef } from "react";

import {Form} from "react-bootstrap";

import "./login.css";

import { verifyUser } from "../../data/user";

function Login({setToken}) {

  
  const userRef = useRef()
  const passRef = useRef()
  return (
    <div className="login-container">
      <img src="ME.png" className="profile_login" />
      <h3 className="login-title">AchirayuN</h3>
      <Form.Label htmlFor="inputPassword5" style={{backgroundColor: "black",color: "white",width: "100%",height: "50%",borderRadius: "10px"}} className="bi bi-person-fill">&nbsp;Username</Form.Label>
      <Form.Control
        type="text"
        id='username'
        style={{textAlign: "center"}}
        placeholder="user"
        ref={userRef}
        // ref={username}
      />
        <Form.Label  htmlFor="inputPassword5" style={{backgroundColor: "black",color: "white",width: "100%",height: "50%",borderRadius: "10px",marginTop: "10px"}} className="bi bi-key-fill">&nbsp;Password</Form.Label>
      <Form.Control
        type='password'
        id="password"
        style={{textAlign: "center"}}
        placeholder="pass"
        ref={passRef}
        // ref={password}
      />
      <button className="btn btn-success mt-2" onClick={() => {
        const user = userRef.current.value .trim()
        const pass = passRef.current.value.trim()
          userRef.current.value = ''
          passRef.current.value = ''
        const userInfo = verifyUser(user, pass)
         if(userInfo === null){
          alert('Wrong username or password')

          userRef.current.focus()
        } else {
          setToken(userInfo.token)
        }
      }}>Login</button>
    </div>
  );
}

export default Login;
