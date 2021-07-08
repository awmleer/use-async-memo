import { DependencyList, useRef, useEffect, useState, useReducer, useMemo } from 'react'

export function useAsyncMemo<T>(factory: () => Promise<T>, deps?: DependencyList, initial?: T) {
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

export function useAsync<T>(factory: () => Promise<T>, deps?: DependencyList, initial?: T) {
  let forceUpdate = useState<T>()[1]
  let val = useRef(initial)

  useMemo(() => val.current = initial, deps)
  useEffect(() => {
    let pending = true
    factory().then(res => {
      if(pending)
        forceUpdate(val.current = res)
    })
    return () => {
      pending = false
    }
  }, deps)

  return val.current
}
