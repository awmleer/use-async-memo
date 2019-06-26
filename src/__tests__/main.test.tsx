import * as testing from '@testing-library/react'
import {FC} from 'react'
import * as React from 'react'
import {useAsyncMemo} from '../index'

test('get async data', async function () {
  function getAsyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 100)
    })
  }
  
  const App: FC = function (props) {
    const data = useAsyncMemo(() => getAsyncData(), [])
    return (
      <div>
        {data}
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
