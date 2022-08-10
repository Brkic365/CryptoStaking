import "../styles/globals.css";
import { store } from "../store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";

import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={false}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
