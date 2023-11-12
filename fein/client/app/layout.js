import { Inter } from 'next/font/google'
import './globals.css'
import ThemeContextProvider from './Context/ThemeContext'

import { Navbar } from "./Components/Navbar/Navbar.js";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  )
}
