import React,{ useState } from 'react'
//components
import { Link } from 'react-router-dom';

//graphql
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

//ui
import { Text, PrimaryButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '@uifabric/react-cards';

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

function FaceRec(props) {

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const LOGIN = gql`
    query getUser($emailId: String!){
        getUser(emailId:$emailId) {
            emailId,
            password,
            passPortInfo {
            firstName,
            lastName,
            passPortNo,
            nationality
            },
            visaInfo {
            controlNo,
            dateOfExp
            }
            flightInformation {
            flightNo,
            source,
            destination,
            dateofFlight,
            Class
            }
            checkin {
            entry,
            security
            }
        }
    }
  `;

    const [ loginFunction,{loading, error, data }] = useLazyQuery(LOGIN);

    if(error) {
        console.log(error);
    }
    
    if(data) {
        console.log(data.signIn);
        props.history.push('/flightRegisteration')
    }

    return (
            <>
                <HeaderHomePage />
                <div className="ms-Grid-row" style={{paddingBottom:'300px'}}>
                    <div className={`s-Grid-col ms-sm6 ms-xl6 ${classNames.pivot}`}>
                        <Card styles={styles.cardStyles}>
                            <Card.Section>                
                            {error ? <MessageBar messageBarType={MessageBarType.error} isMultiline={false} dismissButtonAriaLabel="Close" >There is an error processesing your request</MessageBar>:null}
                            <Text variant={'xxLarge'}>Successfully Matched</Text>
                            <Text variant={'xLarge'}>Wish you a safe and wonderful journey</Text>
                            <Link className="header" to='/userdashboard'>Go to Dashboard</Link>
                            </Card.Section>
                        </Card>
                    </div>
                </div>
            
        </>
    )
}

export default FaceRec;