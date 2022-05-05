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
  }//https://www.facebook.com/login.php?skip_api_login=1&api_key=934892873950601&kid_directed_site=0&app_id=934892873950601&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.3%2Fdialog%2Foauth%3Fapp_id%3D934892873950601%26cbt%3D1651719120602%26channel_url%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df59bd5689773a4%2526domain%253Dlocalhost%2526is_canvas%253Dfalse%2526origin%253Dhttp%25253A%25252F%25252Flocalhost%25253A3000%25252Ff1d6c9d04593244%2526relation%253Dopener%26client_id%3D934892873950601%26display%3Dpopup%26domain%3Dlocalhost%26e2e%3D%257B%257D%26fallback_redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252F%26locale%3Den_US%26logger_id%3Df23d08a92095668%26origin%3D1%26redirect_uri%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df3f1773f5f1ae28%2526domain%253Dlocalhost%2526is_canvas%253Dfalse%2526origin%253Dhttp%25253A%25252F%25252Flocalhost%25253A3000%25252Ff1d6c9d04593244%2526relation%253Dopener%2526frame%253Dfceb184999c438%26response_type%3Dtoken%252Csigned_request%252Cgraph_domain%26sdk%3Djoey%26version%3Dv2.3%26ret%3Dlogin%26fbapp_pres%3D0%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3f1773f5f1ae28%26domain%3Dlocalhost%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff1d6c9d04593244%26relation%3Dopener%26frame%3Dfceb184999c438%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied&display=popup&locale=en_GB&pl_dbl=0
//https://www.facebook.com/v13.0/dialog/oauth?response_type=token&display=popup&client_id=934892873950601&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback%3Fmethod%3DGET%26path%3D%257Buser-id%257D%252Fids_for_pages%26version%3Dv13.0&scope=pages_read_engagement
//445004992349157/feed?message=HelloFans!&access_token=EAANSR7WnpYkBAPZC6B2yaqkpCki2Ef6xLJZBMaZBhABfly4nyH0QN5ytoQ77SZA70lq4bSM10UsWnD0R7X5hRxE41xvxPaqU5HZCov10FHWzyAgnMNNWPFfmOBoP1eZAqHmrXq3hyGRUk3bO5RWgmzw24kdDxOGkZAZBIEUAFqmq5aEX4JKxyKl3SVKsdzraZAzixFb9Wf4ddCDgCwOWa1pdKZCdF0vlZAZA5U2ZB9fbNTSqYWp5toSzmPAcW
  return (
    <div className="container">
      <div style={{ width: '600px' }}>
        <div>
          { !login && 
            <FacebookLogin
              appId="934892873950601"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,pages_manage_metadata,pages_manage_posts,pages_manage_read_engagement,pages_show_list,email,publish_to_groups,pages_read_engagement,pages_manage_engagement,pages_read_user_content,pages_manage_ads"
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
