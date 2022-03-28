import { Form, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './../styles/form.css';

const FormParameters = props => {

    return(
        <Form onSubmit={e=>{
                e.preventDefault();
            }}>
            <Form.Group as={Row} className={'mb-3 param'}>
                <Form.Label>Passenger Class</Form.Label>
                <Form.Select value={props.standard} onChange={e=>{
                    console.log(e.target.value);
                    props.setStandard(Number(e.target.value));
                }}>
                    <option value={0}>Select Passenger Class</option>
                    <option value={1}>1st Class</option>
                    <option value={2}>2nd Class</option>
                    <option value={3}>3rd Class</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Row} className={'mb-3 param'}>
                <Form.Label>Gender of Passenger</Form.Label>
                <Form.Select value={props.gender} onChange={e=>{
                    console.log(e.target.value);
                    props.setGender(e.target.value);
                }}>
                    <option value={'N'}>Select Gender</option>
                    <option value={'M'}>Male</option>
                    <option value={'F'}>Female</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Row} className={'mb-3 param'}>
                <Form.Label>Select Boarding</Form.Label>
                <Form.Select value={props.boarding} onChange={e=>{
                    console.log(e.target.value);
                    props.setBoarding(e.target.value);
                }}>
                    <option value={'N'}>Boarding at</option>
                    <option value={'S'}>Southampton</option>
                    <option value={'C'}>Cherbourg</option>
                    <option value={'Q'}>Queenstown</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Row} className={'mb-3 param'}>
                <Form.Label>Age of passenger: {props.age}</Form.Label>
                <RangeSlider variant={'success'} tooltip='off' value={props.age} onChange={e=>{
                    console.log(e.target);
                    props.setAge(Number(e.target.value));
                }} step={1} />
            </Form.Group>
            <Form.Group as={Row} className={'mb-3 param'}>
                <Form.Label>Fare of the trip: $ {props.fare}</Form.Label>
                <RangeSlider variant={'secondary'} tooltip='off' value={props.fare} onChange={e=>{
                    console.log(e.target);
                    props.setFare(Number(e.target.value))
                }} min={0} max={900} step={0.1} />
            </Form.Group>
            <Form.Group as={Row} className={'mb-3 param'}>
                <Form.Label>Number of Sibiling and Spouse with: {props.sibSp}</Form.Label>
                <RangeSlider variant={'info'} tooltip='off' value={props.sibSp} onChange={e=>{
                    console.log(e.target);
                    props.setSibSp(Number(e.target.value))
                }} min={0} max={10} step={1} />
            </Form.Group>
            <Form.Group as={Row} className={'mb-3 param'}>
                <Form.Label>Number of Parents and Children with: {props.parch}</Form.Label>
                <RangeSlider variant={'info'} tooltip='off' value={props.parch} onChange={e=>{
                    console.log(e.target);
                    props.setParch(Number(e.target.value))
                }} min={0} max={10} step={1} />
            </Form.Group>
        </Form>
    )
};

export default FormParameters;