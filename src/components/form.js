import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { decimalToRoman, romanToDecimal } from '../features/convertSlice';

function FormConverter() {
  const [optionA, setOptionA] = useState('roman');
  const [optionB, setOptionB] = useState('decimal');
  const [payload, setPayload] = useState('');
  const result = useSelector(state => state.convert.value);
  const dispatch = useDispatch();

  const numbersRegex = /^[0-9]*$/;

  class HashTable {
    constructor(size) {
      this.data = new Array(size);
    }

    _hash(key) {
      let hash = 0;

      if (key) {
        for (let i = 0; i < key.length; ++i) {
          hash = (hash + key.charCodeAt(i) + i) % this.data.length;
        }
        return hash;
      }
    }

    set(key, value) {
      const index = this._hash(key);
      this.data[index] = [key, value];
    }

    testRoman(payload) {
      const roman = payload.toUpperCase();

      for (let i = 0; i < roman.length; i++) {
        const currentIndex = this._hash(roman[i]);
        const currentValue = this.data[currentIndex] && this.data[currentIndex][0];
        if (!currentValue) return false;
      }
      return true;
    }
  }

  const myHashTable = new HashTable(100);
  myHashTable.set("M");
  myHashTable.set("C");
  myHashTable.set("D");
  myHashTable.set("X");
  myHashTable.set("L");
  myHashTable.set("I");
  myHashTable.set("V");

  const changeOption = (e) => {
    const option = e.target.value;
    const targetId = e.target.id;
    if (targetId === 'a' && option === 'decimal' && optionB === 'decimal') {
      setOptionA('decimal');
      setOptionB('roman');
    } else if (targetId === 'a' && option === 'roman' && optionB === 'roman') {
      setOptionA('roman');
      setOptionB('decimal');
    } else if (targetId === 'b' && option === 'decimal' && optionA === 'decimal') {
      setOptionA('roman');
      setOptionB('decimal');
    } else {
      setOptionA('decimal');
      setOptionB('roman');
    }
  };

  const convert = (e) => {
    e.preventDefault();

    if (optionB === 'roman') {
      payload.length > 0 && numbersRegex.test(payload) ? dispatch(decimalToRoman(payload)) : alert('Use only integers');
    } else {
      const test = myHashTable.testRoman(payload);
      payload.length > 0 && test ? dispatch(romanToDecimal(payload)) : alert('Use a valid roman numeral');
    }
  };

  return (
    <div className='div' >
      <Form onSubmit={e => convert(e)} className='form'>
        <h1 className="title mb-5">Roman Numerals to Decimal system</h1>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>FROM</Form.Label>
              <Form.Select role="button" value={optionA} onChange={changeOption} id='a'>
                <option value='roman'>Roman</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>TO</Form.Label>
              <Form.Select role="button" id='b' value={optionB} onChange={changeOption} >
                <option value='roman'>Roman</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{`${optionA.toUpperCase()} NUMBER`}</Form.Label>
              <Form.Control className='input' type="text" placeholder='Write value' onChange={e => setPayload(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label >{`${optionB.toUpperCase()} NUMBER`}</Form.Label>
              <Form.Control type="text" value={result} disabled />
            </Form.Group>
          </Col>
        </Row>

        <Button className='button btn btn-success btn-lg mt-4' type="submit">
          Convert
        </Button>
      </Form>
    </div>
  );
}

export default FormConverter;