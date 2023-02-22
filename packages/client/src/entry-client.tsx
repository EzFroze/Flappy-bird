import { Routes, Route, Link } from "react-router-dom";

export const App = () => {
  return (
    <>
    <Link to='/'>Home</Link>
    <Link to='/asjkldsajkl'>NotFound</Link>
    <Link to='/other'>Other</Link>
    <hr />
    <Routes>
      <Route index element={<div>Home page</div>} />
      <Route path="/other" element={<div>Other page</div>} />
      <Route path="*" element={<div>Not found page</div>} />
    </Routes>
    </>
  );
};
