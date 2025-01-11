import { right, left, Either } from './either'

function doSomething(isSuccess: boolean): Either<string, number> {
  return isSuccess ? right(10) : left('error')
}

test('success result', () => {
  const result = doSomething(true)
  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const result = doSomething(false)
  expect(result.isRight()).toBe(false)
  expect(result.isLeft()).toBe(true)
})
