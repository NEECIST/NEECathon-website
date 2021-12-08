import React from "react";
import { useState , useEffect} from "react";
import { Container, CardGroup, Button, Row, Col, Spinner, Card, Form, Modal} from "react-bootstrap"
import BoardCell from "./BoardCell";
import Leaderboard from "./Leaderboard";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import GameServices from "../core/GameServices";
import supabaseClient from "../utils/supabaseClient"

import "./styles.css";

function Board(props) {
    const [key] = useState(0);
    const [teams, setTeams] = useState(undefined);
    const [admin, setAdmin] = useState(false);
    const [time, setTime] = useState(0);
    const [modalText, setModalText] = useState("")
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => { 
        GameServices.getPerson(setAdmin)
        GameServices.getTeams(setTeams);
        GameServices.getTime(setTime);
        supabaseClient
            .from('Teams')
            .on('*', payload => {
                GameServices.getTeams(setTeams);
                GameServices.getTime(setTime);
                console.log('Change received!', payload)
        }).subscribe()
    },[]);
    
   function getHouseColor(id){
        let teamId = null
        
        for (var i = 0; i < props.houses.length; i++) {
            if (props.houses[i].IDHOUSE === id){
                teamId=props.houses[i].IDTEAM
                
            }
        }
        if (teamId===null)
            return "#ffffff"

        for (i = 0; i < teams.length; i++) {
            if (teams[i].IDTEAM === teamId){
                
                return teams[i].COLOR
            }
        }
   }
    
    const renderTime = (time) => {
        let secs = (time % 60);
        let mins = (time - secs)/60;
        return (
          <div className="timer">
            <div>{mins}</div>
            <div>Minutes</div>
            <div>{secs}</div>
            <div>Seconds</div>
          </div>
        );
      };


    if(teams === undefined){
        return (
            <Container>
                <Row className="text-center mb-4">
                    <Col>
                        <Spinner className="mt-3" animation="border" role="status">
                            <span className="visually-hidden">A Carregar...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>      
        );
    } else {
        return (
            <Container className="mt-3" fluid>
                <Modal show={modalShow} onHide={()=>{setModalText("");setModalShow(false)}}>
                    <Modal.Body>{modalText}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={()=>{setModalText("");setModalShow(false)}}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <Col>
                    <Leaderboard teams={teams} /> 
                    </Col>
                    <Col md="5">
                <CardGroup>
                    <BoardCell IMAGE={props.houses[6].IMAGES} color = {getHouseColor(6)}/>
                    <BoardCell IMAGE={props.houses[7].IMAGES} color = {getHouseColor(7)}/>
                    <BoardCell IMAGE={props.houses[8].IMAGES} color = {getHouseColor(8)}/>
                    <BoardCell IMAGE={props.houses[9].IMAGES} color = {getHouseColor(9)}/>
                    <BoardCell IMAGE={props.houses[10].IMAGES} color = {getHouseColor(10)}/>
                    <BoardCell IMAGE={props.houses[11].IMAGES} color = {getHouseColor(11)}/>
                    <BoardCell IMAGE={props.houses[12].IMAGES} color = {getHouseColor(12)}/>
                </CardGroup>

                <CardGroup>
                    <BoardCell IMAGE={props.houses[5].IMAGES} color = {getHouseColor(5)}/>
                    <Col> </Col>
                    <Col> </Col>
                    <Col> </Col>
                    <Col> </Col>
                    <Col> </Col>
                    <BoardCell IMAGE={props.houses[13].IMAGES} color = {getHouseColor(13)}/>  
                </CardGroup>

                <CardGroup>
                    <BoardCell IMAGE={props.houses[4].IMAGES} color = {getHouseColor(4)}/>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <BoardCell IMAGE={props.houses[14].IMAGES} color = {getHouseColor(14)}/>
                </CardGroup>  

                <CardGroup>
                    <BoardCell IMAGE={props.houses[3].IMAGES} color = {getHouseColor(3)}/>
                    <Col></Col>
                    <Col></Col>
                    <Col className="my-auto">{admin?
                    <div>
                        <Form.Select id="teamPlayingId" aria-label="Equipa a jogar">
                            {
                            teams.flatMap((item) =>{
                                if( item.IDTEAM !== 1&&item.IDTEAM !==0){
                                    return <option value={item.IDTEAM}>{item.NAME}</option> 
                                }else{
                                    return null
                                }
                            })
                            }
                        </Form.Select>
                        <Button onClick={()=>GameServices.rollDice(document.getElementById("teamPlayingId").value, setModalShow, setModalText)} variant="primary">Roll</Button>
                    </div>:null}</Col>
                    <Col></Col>
                    <Col></Col>
                    <BoardCell IMAGE={props.houses[15].IMAGES} color = {getHouseColor(15)}/>
                </CardGroup>

                <CardGroup>
                    <BoardCell IMAGE={props.houses[2].IMAGES} color = {getHouseColor(2)}/>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <BoardCell IMAGE={props.houses[16].IMAGES} color = {getHouseColor(16)}/>
                </CardGroup>

                <CardGroup>
                    <BoardCell IMAGE={props.houses[1].IMAGES} color = {getHouseColor(1)}/>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <BoardCell IMAGE={props.houses[17].IMAGES} color = {getHouseColor(17)}/>
                </CardGroup>
                
                <CardGroup>
                    <BoardCell IMAGE={props.houses[0].IMAGES} color = {getHouseColor(0)} />
                    <BoardCell IMAGE={props.houses[23].IMAGES} color = {getHouseColor(23)}/>
                    <BoardCell IMAGE={props.houses[22].IMAGES} color = {getHouseColor(22)}/>
                    <BoardCell IMAGE={props.houses[21].IMAGES} color = {getHouseColor(21)}/>
                    <BoardCell IMAGE={props.houses[20].IMAGES} color = {getHouseColor(20)}/>
                    <BoardCell IMAGE={props.houses[19].IMAGES} color = {getHouseColor(19)}/>
                    <BoardCell IMAGE={props.houses[18].IMAGES} color = {getHouseColor(18)}/>
                </CardGroup>
                </Col>
                <Col> 
                    <Card>
                        <Card.Body> 
                            <Card.Title>Time until next play</Card.Title>
                            <Card.Body>
                                <div className="timer-wrapper"> 
                                    <CountdownCircleTimer key={key} isPlaying initialRemainingTime={time} duration={60*60} colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000', 0.33]]}>
                                        {({ remainingTime }) => renderTime(remainingTime)} 
                                    </CountdownCircleTimer>
                                </div>
                            </Card.Body>
                        </Card.Body>
                    </Card> 

                </Col>
                </Row>
            </Container>    
        );
    }
}
export default Board;