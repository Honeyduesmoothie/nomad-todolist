import { DefaultTheme } from "styled-components/dist/types"
// Use .ts for pure TypeScript files.

// Use .tsx for files which contain JSX.

// For example, a React component would be .tsx, but a file containing helper functions would be .ts.

export const darkTheme: DefaultTheme = {
    textColor: "#ecf0f1",
    bgColor: "#2c3e50",
    accentColor: "#e67e22",
    cardBg: 'rgba(0,0,0,0.3)',
    cardShadow: 'rgba(250,250,250,0.3)'
}

export const lightTheme: DefaultTheme = {
    textColor: '#2c3e50',
    bgColor: '#ecf0f1',
    accentColor: '#e67e22',
    cardBg: 'rgba(250,250,250,0.3)',
    cardShadow: 'rgba(0,0,0,0.3)'
}