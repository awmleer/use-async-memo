import * as testing from '@testing-library/react'
import {FC, useState} from 'react'
import * as React from 'react'
import {useAsyncMemo} from '../index'

test('only create once', function () {
  expect(1).toBe(1)
})
