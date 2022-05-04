// import logo from './logo.svg';
import "./App.css";
import FacebookLogin from "react-facebook-login";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  // const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  return (
    <div className="container">
      <div style={{ width: '600px' }}>
        <div>
          { !login && 
            <FacebookLogin
              appId="2655346988099507"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
          {/* { login &&
            <img src={picture} roundedCircle />
          } */}
        </div>
        { login &&
          <div>
            <div>{data.name}</div>
            <div>
              {data.email}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
