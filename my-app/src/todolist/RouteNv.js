import { Link, Routes, Route } from "react-router-dom";

const RouteNv = () => {
  return (
    <nav>
      <Routes>
        <Route path="/" element={<Link to="/">Home</Link>} />
        <Route path="/p1" element={<Link to="/p1">페이지1</Link>} />
      </Routes>
    </nav>
  );
};

export default RouteNv;
