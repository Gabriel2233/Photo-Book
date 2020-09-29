import { ThemeContainer } from "../contexts/ThemeContainer";
import { ProvideAuth } from "../hooks//useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <ThemeContainer>
        <Component {...pageProps} />
      </ThemeContainer>
    </ProvideAuth>
  );
}

export default MyApp;
