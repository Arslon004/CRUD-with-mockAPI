
import { PulseLoader } from "react-spinners";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <PulseLoader  size={20}/>
    </div>
  )
}

export default Loading