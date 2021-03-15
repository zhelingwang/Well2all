import * as React from 'react';
import { Card, Input, Select } from 'antd';
const { useState } = React;
import { useStore } from './contextProvider';

function Child(props) {
  const { state, dispatch } = useStore();
  const fields = Object.keys(state);
  const [currentField, setCurrentField] = useState(fields[0]);

  const handleClk = (e) => {
    dispatch({
      type: 'change',
      data: {
        key: currentField,
        val: e.target.value
      }
    })
  }
  const handleSelectClk = (val) => {
    setCurrentField(val);
  }

  return (
    <>
      <Card title="Child Component" bordered>
        {
          fields.map((item, idx) => <p key={idx}>{`${item} : ${state[item]}`}</p>)
        }
      </Card>
      <Select
        showSearch
        style={{ width: 100, margin: '10px 10px 0 0' }}
        placeholder="Select a field"
        onChange={handleSelectClk}
        defaultValue={fields[0]}
      >
        {
          fields.map((item, idx) =>
            <Select.Option value={item} key={idx}>{item}</Select.Option>
          )
        }
      </Select>
      <Input
        placeholder="input something"
        value={state[currentField]}
        onChange={handleClk}
        style={{ width: 300 }}
      />
    </>
  );
}


export default Child;