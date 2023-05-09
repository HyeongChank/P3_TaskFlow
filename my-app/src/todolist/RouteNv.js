import { Link, Routes, Route } from "react-router-dom";

const RouteNv = () => {
  return (
    <nav>
      <Routes>
        {/* <Route path="/" element={<Link to="/">Home</Link>} />
        <Route path="/p" element={<Link to="/p">페이지1</Link>} /> */}
        <Route path="/f" element={<Link to="/">Home 이동</Link>} />
      </Routes>
    </nav>
  );
};

export default RouteNv;
