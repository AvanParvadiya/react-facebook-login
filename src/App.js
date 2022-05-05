// import logo from './logo.svg';
import "./App.css";
import FacebookLogin from "react-facebook-login";
import { useEffect, useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");
  const [accessToken, setaccessToken] = useState("");
  const [pages, setPages] = useState([]);
  const [post, setPost] = useState("");
  const responseFacebook = (response) => {
    setData(response);

    if (response.accessToken) {
      setLogin(true);
      setPicture(response.picture.data.url);
      setaccessToken(response.accessToken);
    } else {
      setLogin(false);
    }
  };
  useEffect(() => {
    if (accessToken !== "" && pages.length === 0) {
      fetch(
        "https://graph.facebook.com/2914463178776289/accounts?access_token=" +
          accessToken
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result.data);
          result.data.map((data, index) => {
            data.index = index;
            data.checked = false;
            return data;
          });
          setPages(result.data);
        });
    }
  }, [accessToken, pages]);
  var resultsData = [];

  const change = (index, checked) => {
    var updatePage = pages.filter((data) => data.index === index);
    updatePage.map((data) => (data.checked = !data.checked));
    setPages((pages) => [...pages]);
  };

  if (pages.length > 0) {
    resultsData = pages.map((data, index) => (
      <p key={index}>
        <label>
          <input
            type="checkbox"
            onChange={(e) => change(index, e.target.checked)}
          />
          {data.name}
          {data.success !== undefined && <>&nbsp;SUCCESS : {data.success}</>}
          {data.message !== undefined && <>&nbsp;message : {data.message}</>}
          {data.error !== undefined && <>&nbsp;error : {data.error}</>}
        </label>
      </p>
    ));
  }

  const onPost = async () => {
     await Promise.all(
      pages.map(async (data, index) => {
        if (data.checked) {
          const response = await fetch(
            "https://graph.facebook.com/" +
              data.id +
              "/feed?message=" +
              post +
              "&access_token=" +
              data.access_token,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
          );
          const resJson = await response.json();
          pages[index].error = undefined;
          pages[index].message = undefined;
          pages[index].success = undefined;
          if (resJson.error) {
            console.log(data);
            data.error = resJson.error.message;
          } else {
            if (resJson.message) {
              data.message = resJson.message;
            } else {
              data.success = "SUCCESS";
            }
          }
          return data;
        }
      })
    );
    
    setPages(data=>[...data])
    
  };
  return (
    <div className="container">
      <div style={{ width: "600px" }}>
        <div >
          {!login && (
            <FacebookLogin
              appId="934892873950601"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,pages_manage_metadata,pages_manage_posts,pages_manage_read_engagement,pages_show_list,publish_to_groups,pages_read_engagement,pages_manage_engagement,pages_read_user_content,pages_manage_ads"
              callback={responseFacebook}
              icon="fa fa-facebook"
            />
          )}
        </div>
        {login && (
          <div className="col-sm-12 d-flex mt-5">
            <div className="col-sm-4">Welcome {data.name}</div>
            <div className="col-sm-8">
              <img src={picture} alt="facebook-pic" className="float-end" />
              <br />
            </div>
           
          </div>
        )}
        {login &&  
              <>
                {pages.length > 0 && (
                  <>
                    <h3>Pages</h3>
                  </>
                )}

                {pages.length > 0 && resultsData}
                {pages.length > 0 && (
                  <>
                    <label>Please enter detail to post on page</label>
                    <br />
                    <textarea onChange={(e) => setPost(e.target.value)} />
                    <br />
                    <button onClick={onPost} className="btn btn-success">Post To facebook </button>
                  </>
                )}
              </>
            }
      </div>
    </div>
  );
}

export default App;
