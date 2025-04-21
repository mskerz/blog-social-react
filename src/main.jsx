import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.jsx'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {theme} from './config/theme'
createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>  {/* ครอบ App ด้วย Provider และส่ง store */}
      <ChakraProvider theme={theme} resetCSS={false}>  {/* Wrap your app with ChakraProvider */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
      </ChakraProvider>
    </Provider>
  
)
