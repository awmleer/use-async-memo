import { DependencyList, useRef, useEffect, useState, useReducer, useMemo } from 'react'

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

export function useAsync<T>(factory: (...args: any) => Promise<T>, deps?: DependencyList, initial?: T) {
  let forceUpdate = useReducer(x => !x, false)[1]
  let val = useRef(initial)

  useMemo(() => val.current = initial, deps)
  useEffect(() => {
    let pending = true
    factory().then(res => {
      if(pending) {
        val.current = res
        forceUpdate()
      }
    })
    return () => {
      pending = false
    }
  }, deps)

  return val.current
}
