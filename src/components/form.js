import { useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button, Overlay } from 'react-bootstrap';
import { decimalToRoman, romanToDecimal } from '../features/convertSlice';

function FormConverter() {
  const [optionA, setOptionA] = useState('roman');
  const [optionB, setOptionB] = useState('decimal');
  const [payload, setPayload] = useState('');
  const result = useSelector(state => state.convert.value);
  const dispatch = useDispatch();
  
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const numbersRegex = /[0-9]/;

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
      payload.length > 0 && numbersRegex.test(payload) ? dispatch(decimalToRoman(payload)) : alert('Upss! you must use integers');
    } else {
      const test = myHashTable.testRoman(payload);
      payload.length > 0 && test ? dispatch(romanToDecimal(payload)) : alert('Upss! This character is not a valid roman numeral');
    }
  };

  return (
    <div  >
      <Form onSubmit={e => convert(e)} className='fs-6 badge bg-light.bg-gradient text-wrap p-3W fw-bolder text-dark shadow-lg p-5 bg-trasnparent rounded'>
    
        <h1 className="title mb-4 text-uppercase">Roman Numerals <br/>to <br/>Decimal system </h1>
        <Row>
          <Col>
            <Form.Group  controlId="formBasicEmail">
              <Form.Label ClassName="fs-3 fw-bolder text-dark">FROM</Form.Label>
              <Form.Select  role="button" value={optionA} onChange={changeOption} id='a'>
                <option  value='roman'>Roman</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>TO</Form.Label>
              <Form.Select role="button"  value={optionB} onChange={changeOption} >
                <option value='roman'>Roman</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{`${optionA.toUpperCase()} #`}</Form.Label>
              <Form.Control className='input' type="text" placeholder='Write value' onChange={e => setPayload(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label >{`${optionB.toUpperCase()} #`}</Form.Label>
              <Form.Control type="text" value={result} disabled />
            </Form.Group>
          </Col>
        </Row>

        <Button className=' btn-lg mt-4 fw-bolder' variant="warning" ref={target} onClick={() => setShow(!show)} type="submit">
        Click to Convert
      </Button>
      <Overlay ClassName=' mt-4'target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'white',  
              padding: '4px 10px',
              color: 'black',
              borderRadius: '5px',
              ...props.style,
            }}
          >
            Very good! 👏👏
          </div>
        )}
      </Overlay>

      </Form>
    </div>
  );
}

export default FormConverter;