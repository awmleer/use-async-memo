import * as testing from '@testing-library/react'
import {FC, useState} from 'react'
import * as React from 'react'
import {useAsyncMemo} from '../index'
import {act} from '@testing-library/react'
import {useDebounce} from 'use-debounce'

test('get async data', async function () {
  function getAsyncData() {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 100)
    })
  }

  const App: FC = function (props) {
    const [loading, setLoading] = useState(true)
    const data = useAsyncMemo(async () => {
      setLoading(true)
      const data = await getAsyncData()
      setLoading(false)
      return data
    }, [])
    return (
      <div>
        <p>data: {data}</p>
        <p>loading: {loading.toString()}</p>
      </div>
    )
  }
  const renderer = testing.render(
    <App/>
  )
  expect(renderer.asFragment()).toMatchSnapshot()
  await getAsyncData()
  expect(renderer.asFragment()).toMatchSnapshot()
})


test('with debounce', async function () {
  function getAsyncData(x: number) {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(x)
      }, 50)
    })
  }

  let change: () => void = () => {}

  const App: FC = function (props) {
    const [x, setX] = useState(1)
    const [debouncedX] = useDebounce(x, 100)

    const y = useAsyncMemo(async () => {
      return await getAsyncData(debouncedX)
    }, [debouncedX])

    change = () => {
      setX(x + 1)
    }

    return (
      <div>
        <span>{x}</span>
        <span>{y}</span>
      </div>
    )
  }
  const renderer = testing.render(
    <App/>
  )
  expect(renderer.asFragment()).toMatchSnapshot()
  act(() => {
    change()
  })
  expect(renderer.asFragment()).toMatchSnapshot()
  act(() => {
    change()
  })
  act(() => {
    change()
  })
  act(() => {
    change()
  })
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  expect(renderer.asFragment()).toMatchSnapshot()
})

