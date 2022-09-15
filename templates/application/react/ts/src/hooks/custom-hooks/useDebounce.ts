import { useState, useEffect } from 'react'

const useDebounce = (text: string, delay: number) => {
  const [debounced, setDebounced] = useState<string>(text)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(text)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [text, delay])

  return debounced
}

export default useDebounce
