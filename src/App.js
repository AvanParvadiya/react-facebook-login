// import logo from './logo.svg';
import "./App.css";
import FacebookLogin from "react-facebook-login";
import { useEffect, useState } from "react";
import { HomePage } from "./HomePage";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");
  const [accessToken, setaccessToken] = useState("");
  const [pages, setPages] = useState([]);
  const [post, setPost] = useState("");
  const responseFacebook = (response) => {
    setData(response);

    console.log(response);
    if (response.status !== undefined || response.error !== undefined) {
      return;
    }
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
      <div key={index} className="col-sm-12 d-flex">
        <div className="col-sm-6 m-2">
          <label>
            <input
              type="checkbox"
              onChange={(e) => change(index, e.target.checked)}
            />
            {data.name}
          </label>
        </div>
        <div className="col-sm-6 m-2">
          {data.success !== undefined && (
            <span className="alert alert-success ml-3 p-1">
              &nbsp;SUCCESS : {data.success}
            </span>
          )}
          {data.message !== undefined && (
            <span className="alert alert-warning ml-3 p-1">
              &nbsp;message : {data.message}
            </span>
          )}
          {data.error !== undefined && (
            <span className="alert alert-danger ml-3 p-1">
              &nbsp;error : {data.error}
            </span>
          )}
        </div>
      </div>
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

    setPages((data) => [...data]);
  };
  const logout = () => {
    setaccessToken("");
    setLogin(false);
    setData({});
    setPages([]);
    setPicture("");
    setPost("");
  };
  return (
    <div className="container ">
      <div>
        <div>
          {!login && (
            <div className="mt-5">
              <FacebookLogin
                appId="934892873950601"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,pages_manage_metadata,pages_manage_posts,pages_manage_read_engagement,pages_show_list,publish_to_groups,pages_read_engagement,pages_manage_engagement,pages_read_user_content,pages_manage_ads"
                callback={responseFacebook}
                icon=" fa-facebook"
              />
            </div>
          )}
          <br />
          <br />
          {data.status !== undefined && (
            <span className="alert alert-danger">{data.status}</span>
          )}
          {data.error !== undefined && (
            <span className="alert alert-danger">
              {data.error.message} Or Refresh page / Try again letter
            </span>
          )}
        </div>

        {login && (
          <>
            <HomePage
              picture={picture}
              data={data}
              pages={pages}
              resultsData={resultsData}
              setPost={setPost}
              onPost={onPost}
              logout={logout}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
