import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store';
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Layout from '@/components/Layout'
import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </UserProvider>

  )
}
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
