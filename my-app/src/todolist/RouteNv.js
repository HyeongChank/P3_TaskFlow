import { Link, Routes, Route } from "react-router-dom";

const RouteNv = () => {
  return (
    <nav>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Link to="/">Home</Link>} />
        <Route path="/p" element={<Link to="/p">페이지1</Link>} />
        <Route path="/Ttest" element={<Link to="/Ttest">페이지2</Link>} />
=======
        {/* <Route path="/" element={<Link to="/">Home</Link>} />
        <Route path="/p" element={<Link to="/p">페이지1</Link>} /> */}
        <Route path="/f" element={<Link to="/">Home 이동</Link>} />
>>>>>>> ed62e137a5d78684b5fc7024f616bbdf149b9248
      </Routes>
    </nav>
  );
};

export default RouteNv;
