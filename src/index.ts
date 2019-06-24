import {DependencyList, useEffect, useState} from 'react'

export function useAsyncMemo<T>(factory: () => Promise<T>, deps?: DependencyList): T {
  const [val, setVal] = useState<T>()
  useEffect(() => {
    let cancel = false
    factory().then((val) => {
      if (!cancel) {
        setVal(val)
      }
    })
    return () => {
      cancel = true
    }
  }, deps)
  return val
}
