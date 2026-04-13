import { useToast } from "../context/toast-context";
// toaster.jsx

// reference the hook '@../context/toast-context'
const useManageToaster = () => {
  const toaster = useToast(); // correct: this IS the toast trigger

  const manageToaster = (
    message = "Something untracked happened",
    status = "info",
    description = null,
    duration = 3000,
    isClosable = true,
  ) => {
    // console.log("toaster");
    toaster({
      title: message,
      status: status,
      description: description,
      duration: duration,
      isClosable: isClosable,
      position: "top-right",
    });
  };

  return { manageToaster };
};

export { useManageToaster };
// reference the hook '@../context/toast-context'
