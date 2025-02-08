import { AppProps } from "next/app";
import useUpdateExpertStatus from "@/hooks/useUpdateExpertStatus";

function MyApp({ Component, pageProps }: AppProps) {
  useUpdateExpertStatus(); // Call the hook to track status globally

  return <Component {...pageProps} />
  ;
}

export default MyApp;
