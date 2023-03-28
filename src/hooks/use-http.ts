import axios, { AxiosError } from "axios";
import { useState } from "react";

const useHttp = () => {
  const [dataReceived, setDataReceived] = useState<any>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async (
    url: string,
    method: string = "GET",
    dataToSend: any = null
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios(url, {
        method: method,
        data: dataToSend,
      });
      setDataReceived(data);
      setIsLoading(false);
      return data;
    } catch (error: AxiosError | any) {
      let errorMsg = "";
      if (axios.isAxiosError(error)) {
        errorMsg = error.message;
        return error.message;
      } else {
        errorMsg = "An error has occured!";
      }
      setError(errorMsg);
      setIsLoading(false);
    }
  };

  return {
    dataReceived,
    error,
    isLoading,
    makeRequest,
  };
};

export default useHttp;
