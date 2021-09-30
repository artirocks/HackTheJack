import React,{ useState } from 'react'

//graphql
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

//ui
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';
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

function UserDashboard(props) {
    
    const entryCheckIn = () => {
        props.history.push('/entryin')
    }

    const securityCheckIn = () => {
        props.history.push('/securityin')
    }

    const gateCheckIn = () => {
        props.history.push('/gatein')
    }

    const LOGIN = gql`
    query SignIn(
        $email: String!,
        $password: String!,
        $signCertFile: Upload!,
        $privatekeyFile: Upload! )
        {
        signIn(
            email: $email,
            password: $password,
            privatekeyFile: $privatekeyFile,
            signCertFile: $signCertFile){
        token
        user{
            email
        }
            }
        }`;

    const [ loginFunction,{loading, error, data }] = useLazyQuery(LOGIN);

    if(error) {
        console.log(error);
    }
    
    if(data) {
        // console.log(data.signIn);
        localStorage.setItem('id_token', data.signIn.token)
        props.history.push('/userdashboard')
    }

    return (
            <> 
                <HeaderHomePage />
                <div className="ms-Grid-row" style={{paddingBottom:'300px'}}>
                    <div className={`s-Grid-col ms-sm6 ms-xl6 ${classNames.pivot}`}>
                        <Card styles={styles.cardStyles}>
                            <Card.Section>                
                            {error ? <MessageBar messageBarType={MessageBarType.error} isMultiline={false} dismissButtonAriaLabel="Close" >There is an error processesing your request</MessageBar>:null}
                            <Text variant={'xxLarge'}>Flight Information </Text>
                            <Text variant={'xLarge'}>Flight Number: AGD123F</Text>
                            <Text variant={'xLarge'}>Source: BBS</Text>
                            <Text variant={'xLarge'}>Destination: DLH</Text>
                            <Text variant={'xLarge'}>Date of Flight: 29/10/2021</Text>
                            <Text variant={'xLarge'}>   </Text>
                            
                            </Card.Section>
                            <DocumentCard onClickHref='http://bing.com'></DocumentCard>
                            <PrimaryButton 
                                disabled={loading} 
                                text="Check In" 
                                onClick={(e) => entryCheckIn(e)}
                            />
                            <PrimaryButton 
                                disabled={loading} 
                                text="Security CheckIn" 
                                onClick={(e) => securityCheckIn(e)}
                            />
                            <PrimaryButton 
                                disabled={loading} 
                                text="Gate CheckIn" 
                                onClick={(e) => gateCheckIn(e)}
                            />
                        </Card>
                    </div>
                </div>
            </>
    )
}

export default UserDashboard;