import { Link } from "react-router-dom";
import "./Homepage.css";
function Homepage() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Tools🔨</h1>
      <div className="homepage">
        {/* <Stopwatch /> */}
        <div>
          <div className="cards active">
            <Link style={{ textDecoration: "none", color: 'white' }} to="/stopwatch">
              Stopwatch ⏱️
            </Link>
          </div>
          <div className="cards" style={{cursor:'not-allowed'}}>
            <Link style={{ textDecoration: "none" , color: 'white', cursor:'not-allowed'}} to="">
              Timer ⏳
            </Link>
          </div>
        </div>
        <div>
          <div className="cards" style={{cursor:'not-allowed'}}>
            <Link style={{ textDecoration: "none", color: 'white', cursor:'not-allowed'}} to=""> World Clock 🌐</Link>
          </div>
          <div className="cards" style={{cursor:'not-allowed'}}>
            <Link style={{ textDecoration: "none", color: 'white', cursor:'not-allowed' }} to="">Calc 🧮</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
