# useAsyncMemo
React hook for generating async memoized data.

## API

```typescript
function useAsyncMemo<T>(factory: () => Promise<T>, deps: DependencyList, initial?: T): T
```

If `factory` returns `undefined`, `useAsyncMemo` will leave the memoized value **unchanged**.

## Demo

```jsx
function Foo(props) {
  const [input, setInput] = useState()
  const users = useAsyncMemo(async () => {
    if (input === '') return []
    return await apiService.searchUsers(input)
  }, [input], [])
  return (
    //...
  )
}
```

