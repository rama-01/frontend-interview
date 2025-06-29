### 1. 类型工具

#### 1.1 `Awaited<Type>`取出Promise的返回值类型

```ts
type T = Awaited<Promise<string>>  //string
```

#### 1.2 `ConstructorParameters<Type>`提取构造方法Type的参数类型，组成一个元祖返回

```ts
 type T = ConstructorParameters<new (x:string,y:number) => object>  //[x:string,y:number]
```

#### 1.3 `Exclude<UnionType,ExcludeMembers>`用来从联合类型UnionType删除某些类型ExcludeMembers,并组成一个新的类型返回

```ts
   type T = Exclude<() => any | string | unknown , Function | string>  // unknown
```

#### 1.4 `Extract<UnionType,Union>`用来从联合类型UnionType从提取指定类型Union，组成一个新类型返回

#### 1.5 `InstanceType`提取构造函数的返回值类型，即是实例类型

```ts
type T = InstanceType<FunctionConstructor> //Function
class C {
    x = 0
    y = 0
}
type T2 = InstanceType<typeof C> //C
```

#### 1.6 `NonNullable<Type>`从联合类型Type中删除null和undefined类型，组成一个新类型返回

```ts
type T = NonNullable<(...args:any[]) => void | null | undefined | Array<string>>  // (...args:any[]) => void|Array<string>
```

#### 1.6 `Omit<Type,Keys>`从对象类型Type中删除指定属性Keys，组成一个新的对象类型返回

```ts
interface A = {
    x: number
    y: (...args: Array<string>) => any
}
type T = Omit<A, y> // {x: number}
```

#### 1.7 `OmitThisParameter`从函数类型中移除this参数，如果没有this参数，则返回原始函数类型

#### 1.8  `Parameters<Type>`从函数类型中提取参数类型，并组成一个元祖返回

```ts
type T = Parameters<<T>(arg: T) => T>;    // [arg: unknown]
```

#### 1.9 `Partial<Type>`将参数类型Type的所有属性变为可选属性，返回一个新类型

```ts
interface A {
    x: Array<any>
    y: Promise<Promise<any>>
}

type T = Partial<A>  
// {x?: Array<any>,y?: Promise<Promise<any>>}
```

#### 1.9 `Pick<Type, Keys>`从对象类型Type中选择指定键名Keys，并返回一个新类型

```ts
interface User {
    id: number;
    name: string;
    age: number;
    email: string;
}

type UserSubset = Pick<User, 'id' | 'name'>;
 
// 等价于
interface UserSubset {
    id: number;
    name: string;

```

#### 1.10- `Readonly<Type>`将参数类型Type的所有属性变为只读属性，并返回一个新类型

#### 1.11 `Record<Keys, Type>`返回一个对象类型，Keys用作键名，Type用作键值类型

#### 1.12 `Required<Type>`将参数类型Type的所有属性变为必选属性，与 `Partial<Type>`相反

#### 1.13 `ReadonlyArray`生成一个只读数组类型

#### 1.14 `ReturnType<Type>`提取函数类型Type的返回值类型

#### 1.15 `ThisParameterType`提取函数类型中This的参数类型

### 2. 运算符

#### 2.1 关于父子类型

总之,父类型不能直接赋值给子类型,因为子类型可能包含父类型所没有的属性和方法,这会导致类型不兼容。但是,子类型可以安全地赋值给父类型,因为子类型"是一种"父类型,包含了父类型的所有属性和方法。这种"向上转换"是类型安全的,并为多态提供了基础。
