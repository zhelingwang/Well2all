# Redux vs useReducer
```txt
- Redux 适用于全局应用的状态树;
- useReducer 适用于组件树中低层级的组件, 来处理相对独立的某些 state, 从而避免使用一堆的 useState hooks.

在面对广度深度较大的组件树时, Redux 可使用 connect/mapStateToProps 让组件按需接收部分状态, 以避免无关状态的更新导致其余无关组件不必要的重渲染.这也是 Redux 为何划分了容器组件和 UI 组件概念的原因.
而 useReducer 则无法按需为组件传递碎片状态.

```