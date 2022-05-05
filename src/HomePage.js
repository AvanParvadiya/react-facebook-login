export const HomePage = ({
  pages,
  resultsData,
  setPost,
  onPost,
  picture,
  logout,
  data,
}) => {
  return (
    <div className="card mt-5">
      <div className="card-body">
        <div className="col-sm-12 d-flex  ">
          <div className="col-sm-4">Welcome <b>{data.name}</b></div>
          <div className="col-sm-4">
            <img src={picture} alt="facebook-pic" className="float-end" />
          </div>
          <div className="col-sm-4 ">
            <button className="btn btn-danger float-end" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        {pages.length > 0 && (
          <span className="m-5">
            <p>Pages</p>
            <span className="alert alert-warning  p-1 mb-2">
              If no any pages found then there are no any pages on your facebook
              account
            </span>
            <br />
            <br/>
            <span className="alert alert-success  p-1 mb-2">
              Select checkboxes for upload post to Facebook (Multiple pages are pages are supported)
            </span>
            <br />
          </span>
        )}
        <br />
        {pages.length === 0 && <span className="alt alt-warning">No any pages found for upload post</span>}
        {pages.length > 0 && resultsData}
        {pages.length > 0 && (
          <div className="col-sm-12">
            <label>Please enter detail to post on page</label>
            <br />
            <textarea onChange={(e) => setPost(e.target.value)} style={{width:'100%'}}  className="co-sm-12"/>
            <br />
            <button onClick={onPost} className="btn btn-success">
              Post To facebook{" "}
            </button>
            <br />
          </div>
        )}
      </div>
    </div>
  );
};
