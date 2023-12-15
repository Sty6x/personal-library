import { Link } from "react-router-dom";
import styles from "./errorPage.module.css";
const ErrorPage = ({ message }) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.contentsContainer}`}>
        <p>Sorry but it seems that we've encountered an error.</p>
        {/* <p>{message}</p> */}
        <span className={`${styles.linkContainer}  `}>
          <Link to={"/start"}>Go Back</Link>
        </span>
      </div>
    </div>
  );
};

export default ErrorPage;
