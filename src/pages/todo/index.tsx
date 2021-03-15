import * as React from 'react';
import { Divider, Card, Row, Col, Input, Tooltip } from 'antd';
import { PlusCircleTwoTone, CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import './todo.css';
import { reducer, initialState } from './reducer';
const { useReducer, useState } = React;

const Todo = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [current, setCurrent] = useState('');
  const [scope, setScope] = useState('all')
  const [showTip, setShowTip] = useState(false)

  const onChange = (e) => {
    const val = e.target.value;
    setCurrent(val);
    if (!val) {
      setShowTip(true);
    } else {
      setShowTip(false);
    }
  }

  const onFinish = () => {
    if (!current) return;
    dispatch({
      type: 'add',
      payload: current
    });
    setCurrent('');
  }

  const onComplete = (item) => {
    dispatch({
      type: 'finish',
      payload: item.id
    });
  }

  const onRemove = (item) => {
    dispatch({
      type: 'remove',
      payload: item.id
    })
  }

  const onClear = () => {
    dispatch({
      type: 'clear'
    })
  }

  const onFilter = scope => {
    setScope(scope);
  }

  const getFilterList = () => {
    if (scope === 'all') {
      return state;
    }
    if (scope === 'active') {
      return state.filter(item => !item.completed);
    }
    return state.filter(item => item.completed)
  }

  const leftNum = state.filter(item => !item.completed).length;

  return (
    <Card className='container'>
      <Row>
        <Col span={24}>
          <Divider className='title'>Todo List</Divider>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tooltip
            trigger={['focus']}
            visible={showTip}
            title='plz input something'
            placement="topLeft"
            overlayClassName="numeric-input"
          >
            <Input
              className='input-todo'
              size='large'
              value={current}
              placeholder='Enter your todo thing'
              suffix={<PlusCircleTwoTone className='icon' onClick={onFinish} />}
              onChange={onChange}
              onPressEnter={onFinish}
              maxLength={60}
            />
          </Tooltip>
        </Col>
      </Row>
      {
        getFilterList().map(item =>
          <Row className='p-16 fs-24 list-item' key={item.id}>
            <Col span={2} onClick={() => onComplete(item)}>
              <CheckCircleFilled className={`icon cursor ${item.completed && 'icon-finish-color'}`} />
            </Col>
            <Col span={20} onClick={() => onComplete(item)} className={`todo-text cursor ${item.completed && 'line-through'}`}>{item.text}</Col>
            <Col span={2} className='align-r'>
              <CloseCircleFilled className='icon icon-delete-color' onClick={() => onRemove(item)} />
            </Col>
          </Row>)
      }
      <Row className='p-16 fs-14'>
        <Col span={6} className='align-l'>{leftNum} items left</Col>
        <Col span={12} className='status-container'>
          <a className='todo-status m-r-10' onClick={() => onFilter('all')}>All</a>
          <a className='todo-status m-r-10' onClick={() => onFilter('active')}>Active</a>
          <a className='todo-status' onClick={() => onFilter('completed')}>Completed</a>
        </Col>
        <Col span={6} className='align-r' >
          <a className='todo-status' onClick={onClear}>Clear Completed</a>
        </Col>
      </Row>
    </Card>
  );

}

export default Todo;
