import { createContext } from "react";

export const ThemeContext = createContext();

// import { useEffect, useState, createContext } from "react";
// export const ThemeContext = createContext();



// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(() => {
//     // Initialize from localStorage or default to "light"
//     return localStorage.getItem("theme") || "light";
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
