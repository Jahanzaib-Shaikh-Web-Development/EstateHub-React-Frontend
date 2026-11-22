import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext()
export const useApp = () => useContext(Ctx)

export const read = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d }
}

export function AppProvider({ children }) {
  const [favs, setFavs] = useState(() => read('eh_favs', []))
  const [user, setUser] = useState(() => read('eh_session', null))
  useEffect(() => {
    localStorage.setItem('eh_favs', JSON.stringify(favs))
  }, [favs])
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const login = (u) => { setUser(u); localStorage.setItem('eh_session', JSON.stringify(u)) }
  const logout = () => { setUser(null); localStorage.removeItem('eh_session') }
  return <Ctx.Provider value={{ favs, toggleFav, user, login, logout }}>{children}</Ctx.Provider>
}
