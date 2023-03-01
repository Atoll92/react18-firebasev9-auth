import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome {user.displayName}<br />
        ID: {user.uid}<br />
      </div>
      <div className="d-grid gap-2">
        <div>
          <h1>My services</h1>
          <ul>
            <li><Link to="/monitor" >Website Monitor</Link></li>
            <li><Link to="/signature" >HTML Signature Generator</Link></li>
            <li><Link to="/translation" >Cloud Translation</Link></li>
          </ul>
        </div>
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;



