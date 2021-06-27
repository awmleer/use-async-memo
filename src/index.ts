import {DependencyList, useEffect, useState} from 'react'

export function useAsyncMemo<T>(factory: (...args: any) => Promise<T>, deps?: DependencyList, initial?: T) {
  let [val, setVal] = useState(initial)

  useEffect(() => {
    let pending = true
    factory().then(res => pending && setVal(res))

    return () => {
      pending = false
    }
  }, deps)

  return val
}
