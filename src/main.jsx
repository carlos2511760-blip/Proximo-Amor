import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.jsx'

// Load custom fonts using the correct base URL (works both locally and on GitHub Pages)
const base = import.meta.env.BASE_URL;
const fontFaces = `
  @font-face {
    font-family: 'Alexandria';
    src: url('${base}Alexandria-VariableFont_wght.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Arvo';
    src: url('${base}Arvo-Regular.ttf') format('truetype');
    font-weight: normal;
  }
  @font-face {
    font-family: 'Arvo';
    src: url('${base}Arvo-Bold.ttf') format('truetype');
    font-weight: bold;
  }
  @font-face {
    font-family: 'TanHeadline';
    src: url('${base}TANHEADLINE-Regular.ttf') format('truetype');
  }
`;
const style = document.createElement('style');
style.textContent = fontFaces;
document.head.appendChild(style);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
