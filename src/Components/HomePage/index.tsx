import AuthForm from "../Auth";
import "./homepage.css";

const HomePage = () => {

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="info">
          <h2>Create your ShortURL</h2>
          <p>Login to create the shortURL for the your chunk URL</p>
        </div>
        <div className="loginForm">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
