function simpleDecorator(target: any, context: any) {
  console.log('hi, this is ' + target)
  return target
}

@simpleDecorator
class A {} // "hi, this is class A {}"
