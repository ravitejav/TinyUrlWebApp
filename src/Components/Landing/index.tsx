import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { jwtToken } from "../../Recoil";
import "./landing.css";

const Landing = () => {
  const [jwt] = useRecoilState(jwtToken);
  const [tinyUrl, setTinyUrl] = useState("");
  const navigate = useNavigate();

  useEffect((): void => {
    if (jwt === "") {
      navigate("/");
    }
  });

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello");
  };

  return (
    <div className="landingContainer">
      <h1>Tiny Url</h1>
      <div className="landingSection">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="url"
            placeholder="URL for shrinking....https://google.com"
          />
          <button type="submit">Create Url</button>
        </form>
        {tinyUrl && (
          <>
            <p>Copyable Link: </p>
            <div className="copyableLink">
              <code>https://localhost:3000</code>
              <button>Copy</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;
