import React,{ useState } from 'react'

//graphql
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

//ui
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';
import { Text, PrimaryButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '@uifabric/react-cards';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

//header
import HeaderHomePage from '../header/HeaderHomepage'

const styles = {
    cardStyles: {
        root: {
          background: 'white',
          paddingTop: 30,
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 50,
          width: '100%',
          maxWidth: '100%',
          margin: 'auto',
          marginTop: 60,
        }
    }
}

const classNames = mergeStyleSets({
    pivot: {
        margin: 'auto',
    }
});

function FlightRegisteration(props) {
    
    const [flightNo, setFlightNo] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [dateofFlight, setDateofFlight] = useState("");
    const [Class, setClass] = useState("");
    const [checkin, setcheckin] = useState("");
    const [entry, setEntry] = useState("");
    const [security, setSecurity] = useState("");

    const LOGIN = gql`
    mutation flightReg($emailId: String!,$userData:JSON){
        flightReg(emailId:$emailId, userData: userData)
    }
    
  `;

    const [ loginFunction,{loading, error, data }] = useLazyQuery(LOGIN);

    if(error) {
        console.log(error);
    }
    
    if(entry=="no") {
        props.history.push('/captureimage')
    }

    return (
                <div className="ms-Grid-row" style={{paddingBottom:'300px'}}>
                    <HeaderHomePage />
                    <div className={`s-Grid-col ms-sm6 ms-xl6 ${classNames.pivot}`}>
                        <Card styles={styles.cardStyles}>
                            <Card.Section>                
                            {error ? <MessageBar messageBarType={MessageBarType.error} isMultiline={false} dismissButtonAriaLabel="Close" >There is an error processesing your request</MessageBar>:null}
                            <Text variant={'xxLarge'}>Flight Registeration</Text>
                            <Text variant={'xLarge'}>Passport Info</Text>
                            <TextField
                                disabled={loading} 
                                name="flightNo" 
                                value={flightNo} 
                                onChange={(e) => {setFlightNo(e.target.value)}} 
                                label="Flight No."
                            />
                            <TextField
                                disabled={loading} 
                                name="source" 
                                value={source} 
                                onChange={(e) => {setSource(e.target.value)}} 
                                label="Source"
                            />
                            <TextField
                                disabled={loading} 
                                name="destination" 
                                value={destination} 
                                onChange={(e) => {setDestination(e.target.value)}}
                                label="Destination"
                            />
                            <DatePicker
                                disabled={loading} 
                                calloutProps={{setInitialFocus: false}} // This doesn't work
                                label="Date of Expiration"
                                allowTextInput={true}
                                value={dateofFlight}
                                onChange={(e) => {setDateofFlight(e.target.value)}}
                            />
                            <TextField
                                disabled={loading} 
                                name="Class" 
                                value={Class} 
                                onChange={(e) => {setClass(e.target.value)}}
                                label="Class"
                            />
                            <PrimaryButton 
                                disabled={loading} 
                                text="Capture Image" 
                                onClick={() => {
                                    setcheckin("no");
                                    setEntry("no");
                                    setSecurity("no");
                                    // var image = this.decodeBase64Image(signImage);
                                    //flightReg({variables: {flightNo,source, destination, dateofFlight, Class, checkin, security}})
                                }}
                            />
                            </Card.Section>
                        </Card>
                    </div>
                </div>
    )
}

export default FlightRegisteration;