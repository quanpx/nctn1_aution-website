import { Input, Select } from "antd";

import React, { useState } from "react";
const { Option } = Select;
const PriceInput = ({ value = {}, onChange,price,isBid }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('rmb');
  const triggerChange = (changedValue) => {
    onChange?.({
      number,
      currency,
      ...value,
      ...changedValue,
    });
  };
  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({
      number: newNumber,
    });
  };
  const onCurrencyChange = (newCurrency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({
      currency: newCurrency,
    });
  };
  return (
    <span>
      <Input
          disabled={isBid}
        type="text"
        value={price}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      />
      <Select
        value={value.currency || currency}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        disabled={true}
        onChange={onCurrencyChange}
      >
        <Option value="vnd">VND</Option>
        <Option value="dollar">$</Option>
      </Select>
    </span>
  );
};

export default PriceInput;