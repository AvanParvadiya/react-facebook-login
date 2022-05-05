// import logo from './logo.svg';
import "./App.css";
import FacebookLogin from "react-facebook-login";
import { useEffect, useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
   const [picture, setPicture] = useState('');
   const [accessToken,setaccessToken]=useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    
    if (response.accessToken) {
      setLogin(true);
      setPicture(response.picture.data.url)
      setaccessToken(response.accessToken);
     
    } else {
      setLogin(false);
    }
  }
  useEffect(()=>{
    if(accessToken!==''){
      fetch('https://graph.facebook.com/2914463178776289/accounts?access_token='+accessToken).then(res=>res.json()).then(result=>console.log(result))  
    }
  
  },[accessToken])
  return (
    <div className="container">
      <div style={{ width: '600px' }}>
        <div>
          { !login && 
            <FacebookLogin
              appId="934892873950601"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,pages_manage_metadata,pages_manage_posts,pages_manage_read_engagement,pages_show_list,publish_to_groups,pages_read_engagement,pages_manage_engagement,pages_read_user_content,pages_manage_ads"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
          {/* { login &&
            <img src={picture} roundedCircle />
          } */}
        </div>
        { login &&
          <div>
            <div>Welcome {data.name}</div>
            <div>
              <img src={picture}  alt="facebook-pic"/>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
