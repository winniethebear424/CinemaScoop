import LocaleProvider from './LocaleProvider'; // Update the path if needed
import Layout from './Layout'; // Update the path if needed
// ... (other imports)

function MyApp({ Component, pageProps }) {
  // ... (your existing code)

  return (
    <LocaleProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocaleProvider>
  );
}

export default MyApp;
