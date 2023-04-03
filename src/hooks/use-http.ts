import axios, { AxiosError } from 'axios';
import useIsLoadingStore from 'store/use-is-loading-store';

const useHttp = () => {
  const isLoadingStore = useIsLoadingStore();

  const makeRequest = async (
    url: string,
    method = 'GET',
    dataToSend: unknown = null
  ) => {
    try {
      isLoadingStore.setIsloading(true);
      const { data } = await axios(url, {
        method: method,
        data: dataToSend,
      });
      isLoadingStore.setIsloading(false);
      return Promise.resolve(data);
    } catch (error: AxiosError | unknown) {
      let errorMsg = '';
      if (axios.isAxiosError(error)) {
        errorMsg = error.message;
      } else {
        errorMsg = 'An error has occurred!';
      }
      isLoadingStore.setIsloading(false);
      return Promise.reject(errorMsg);
    }
  };

  return {
    makeRequest,
  };
};

export default useHttp;
