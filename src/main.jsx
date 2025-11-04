import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { SearchcontextProvider } from './contextApi/SearchContext.jsx';
createRoot(document.getElementById('root')).render(
  <SearchcontextProvider>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </SearchcontextProvider>,
  

)
