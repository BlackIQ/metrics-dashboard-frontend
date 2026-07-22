import { useDispatch } from "react-redux";
import { setToast } from "@/redux/actions/toast";

const useToast = () => {
  const dispatch = useDispatch();

  const createToast = (message) => {
    dispatch(setToast(message || ""));
  };

  return createToast;
};

export default useToast;
