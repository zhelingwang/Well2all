# 如何在函数组件中避免不必要的重渲染
在 函数组件 中, 为了实现类似 类组件中的 `shouldComponentUpdate` 中的性能优化,
Hooks 主要作了一下几点:
- `useCallback` 使得回调函数在多次重渲染中保持相同的函数引用, 避免了部分不必要的重渲染
- `useMemo` 缓存函数上一次的执行结果, 在多次重渲染中, 只在依赖项发生更新时才会重新执行该函数, 否则直接使用缓存
- `useReducer` 降低多层传递回调函数的需要

# useCallback
当某个内联函数会被传递给子组件，为了避免子组件频繁渲染，使用 useCallback 包裹，保持引用不变；

# useMemo
可对某些耗时操作做缓存, 只在依赖项发生更新时才重新计算

# context & useReducer 避免层层传递回调
```js
// 创建一个 context 并使用其 provider 包裹根组件
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Note: `dispatch` won't change between re-renders
  const [todos, dispatch] = useReducer(todosReducer);
  return (
    <TodosDispatch.Provider value={{state:todos,dispatch}}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}

function DeepChild(props) {
  // If we want to perform an action, we can get dispatch from context.
  const {state,dispatch} = useContext(TodosDispatch);
  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }
  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```
