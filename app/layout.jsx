import '../styles/global.css';
import { Providers } from './providers'
import Nav from '../components/Nav';
import Provider from '../components/provider';
import { Web3Provider } from '../components/Web3Provider';

export const metadata = {
    title: 'Socials',
    description: 'Discover & Share AI prompts',
}

const RootLayout = ({children}) => {
  return (
    <html>
        <body>
        <Web3Provider>
          <Provider>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
              <Nav />
              <Providers>
                {children}
              </Providers>
            </main>
          </Provider>
          </Web3Provider>
        </body>
    </html>
  )
}

export default RootLayout;
