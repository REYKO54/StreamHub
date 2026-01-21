import { Link } from "react-router-dom";

export default function Movies() {
  return (
    <div>
      <h1>Movies (listing)</h1>
      <p>(Next step: API + filters + pagination)</p>

      <ul>
        <li><Link to="/movies/1">Movie #1</Link></li>
        <li><Link to="/movies/2">Movie #2</Link></li>
      </ul>
    </div>
  );
}
import { Link } from "react-router-dom";

export default function Movies() {
  return (
    <div>
      <h1>Movies (listing)</h1>
      <p>(Next step: API + filters + pagination)</p>

      <ul>
        <li><Link to="/movies/1">Movie #1</Link></li>
        <li><Link to="/movies/2">Movie #2</Link></li>
      </ul>
    </div>
  );
}
