import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "tucmc-auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AuthProvider TOKEN="tYjFVdtj_5jlF8GhpZ3QF49moVTNXRM6TzB4axMNADs=">
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
