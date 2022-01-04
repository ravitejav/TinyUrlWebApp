import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { defaultToaster } from "../../Constant/DefaultValue";
import { createShortUrl } from "../../Helpers/ApiHandler";
import { debounce } from "../../Helpers/Debounce";
import { jwtToken, userId } from "../../Recoil";
import { Toaster } from "../Toaster";
import "./landing.css";

const Landing = () => {
  const [jwt] = useRecoilState(jwtToken);
  const [currentUserId, ] = useRecoilState(userId);
  const[toasterSet, setToaster] = useState(defaultToaster);
  const[tinyUrl, setTinyUrl] = useState("");

  const navigate = useNavigate();

  const resetToast = () => {
    setToaster(defaultToaster);
}

  useEffect((): void => {
    if (jwt === "" || jwt === null || currentUserId === -1) {
      navigate("/");
    }
  });

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const url = new FormData(e.target).get('url')?.toString();
    if(url === undefined || url === "") return;
    const results:any  = await createShortUrl(url, jwt ,currentUserId);
    if(results.type == 'error') {
      setToaster(results);
    } else {
      setTinyUrl(results.additionalData.UrlData.tinyUrl);
      navigator.clipboard.writeText(results.additionalData.UrlData.tinyUrl);
      setToaster({
        message: "Coplied tinyUrl to clipboard",
        type: "success",
        show: true,
      });
    }
    debounce(resetToast, 1000);
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
              <code>{tinyUrl}</code>
              <button>Copy</button>
            </div>
          </>
        )}
      </div>
      <Toaster message={toasterSet.message} type={toasterSet.type} show={toasterSet.show} />
    </div>
  );
};

export default Landing;
