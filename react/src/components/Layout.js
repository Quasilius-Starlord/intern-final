import { Col, Container, Row, Button, Alert } from "react-bootstrap"
import FormParameters from "./FormParameters";
import { useState } from 'react';
import URL from './../server.js'
import axios from "axios";
import './res.css';

function AlertDismissible(props){
    if (props.error) {
        return (
          <Alert variant="danger" onClose={() => {props.setDescription('');props.setError(false);}} dismissible>
              <Alert.Heading>{props.description}</Alert.Heading>
          </Alert>
        );
      }
      return null;
}

function Layout(props){
    const [ age, setAge ] = useState(0);
    const [ fare, setFare ] = useState(0);
    const [ standard, setStandard ] = useState(0);
    const [ gender, setGender ] = useState('N');
    const [ sibSp, setSibSp ] = useState(0);
    const [ parch, setParch ] = useState(0);
    const [ boarding, setBoarding ] = useState('N');
    
    const [ error, setError ] = useState(false);
    const [ eDescripton, setEDescription ] = useState('');
    const [ predictionCount, setPredictionCount ] = useState(0);
    const [ message, setMessage ] = useState('');

    const validation=()=>{
        //age fare standard gender sibsp parch
        console.log(typeof age,typeof fare,typeof standard,typeof gender,typeof sibSp,typeof parch);
        if(typeof age !=='number') return false;
        if(typeof fare !=='number') return false;
        if(typeof standard !=='number') return false;
        if(typeof gender !=='string') return false;
        if(typeof boarding !=='string') return false;
        if(typeof sibSp !=='number') return false;
        if(typeof parch !=='number') return false;
        
        if(standard<1 || standard>3){
            setError(true);
            setEDescription('Select Class')
            return false;
        };
        if(!(['M','F'].includes(gender))){
            setError(true);
            setEDescription('Select Gender')
            return false;
        };
        
        if(!(['S','C','Q'].includes(boarding))){
            setError(true);
            setEDescription('Select Boarding')
            return false;
        };
        if(age<1 || age>100){
            setError(true);
            setEDescription('Invalid Age')
            return false;
        }
        if(fare<1 || fare>900){
            setError(true);
            setEDescription('Invalid Fare')
            return false;
        };
        if(sibSp<0 || sibSp>10){
            setError(true);
            setEDescription('Invalid sibiling spouse')
            return false;
        };
        if(parch<0 || parch>10){
            setError(true);
            setEDescription('Invalid parent child')
            return false;
        };

        return true;
    }

    const submit= async()=>{
        console.log(validation());
        if(validation()===false) return;

        console.log(URL)
        axios.post(`${URL}`,{
            'age':age,
            'fare':fare,
            'class':standard,
            'gender':gender,
            'sibSp':sibSp,
            'parch':parch,
            'embarked':boarding
        },{
            headers:{
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(e=>{
            return e.data;
        }).then(e=>{
            console.log(e)
            setPredictionCount(predictionCount+1);
            setMessage(e.message);
        }).catch(e=>{
            console.log(e);
        })

    }

    return(
        <Container>
            <header style={{margin:'25px 0px'}}>
                <h1 style={{margin:'25px 0px'}}>Titanic Prediction</h1>
                <AlertDismissible error={error} setError={setError} description={eDescripton} setDescription={setEDescription}/>
            </header>
            <Row className='Responsive'>
                <Col>
                    <FormParameters
                     age={age} setAge={setAge} 
                     fare={fare} setFare={setFare}
                     standard={standard} setStandard={setStandard}
                     gender={gender} setGender={setGender}
                     sibSp={sibSp} setSibSp={setSibSp}
                     boarding={boarding} setBoarding={setBoarding}
                     parch={parch} setParch={setParch} />
                </Col>
                <Col>
                    <div>
                        <Button onClick={e=>{submit()}} size={'lg'} variant={'success'}>Make Prediction</Button>
                    </div>
                    {
                        predictionCount===0 ? null : (<h3 className='Res'>Prediction Number: {predictionCount}</h3>)
                    }
                    {
                        message==='' ? null : (
                            <h2 className='Res'>{message}</h2>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Layout
