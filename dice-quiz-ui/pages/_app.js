import '@/styles/globals.css'
import { BrowserRouter } from 'react-router-dom'

export default function App({ Component, pageProps }) {
  return (
    // <BrowserRouter>
      <Component {...pageProps} />
    // </BrowserRouter>
  )
}
