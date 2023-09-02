import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import alertContext from "../context/alert/alertContext";






const Login =  () => {
  const acontext = useContext(alertContext);
  const { showAlert } = acontext;

   const [credentials,setCredentials]=useState({email:"",password:""})
   let navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const url=`http://localhost:5000/api/auth/login`
        const data={email:credentials.email,password:credentials.password}
        const response = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const json = await response.json();
          console.log(json);
          if(json.success)
          {
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            showAlert("Successfully Logged In","success")
            navigate("/");
          }
          else
          {
            showAlert("Invalid Credentials","danger");
          }
        
    }

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value
      })
    }
  return (
    <div>
      <h1 className="text-center">Log In </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
            value={credentials.email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary my-3" >
         Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
