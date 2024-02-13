
import '@styles/global.css';
import { Providers } from './providers'
import Nav from '@components/Nav';
import Provider from '@components/provider';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI prompts'
}

const RootLayout = ({children}) => {
  return (
    <html>
        <body>
          <Provider>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
            <Nav />
            <Providers>{children}</Providers>
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
