import React, { Component } from 'react'

//ui
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Text, PrimaryButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '@uifabric/react-cards';

//apollo client
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';

//header
import HeaderHomePage from '../../header/HeaderHomepage'

const roles = [
    { key: 'Operator', text: 'Operator' },
    { key: 'Owner', text: 'Owner' },
    { key: 'DGCA', text: 'DGCA' },
    { key: 'RegionalOfficeHead', text: 'RegionalOfficeHead' },
    { key: 'HomeMinistry', text: 'HomeMinistry' },
    { key: 'DefenceMinistry', text: 'DefenceMinistry' },
]

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

const dropdownStyles = { dropdown: { width: 250 } };

class SignupForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            natioanlity:"",
            controlNumber:"",
            dateOfExpiration:"",
            next:false,
        }

        this.onChange = this.onChange.bind(this);
        this.onNext = this.onNext.bind(this);
    
    }

    onChange = (ev,option) => {
        this.setState({
            role: option.key
        })
    }

    onNext = (e) => {
        this.setState({
            next: true
        })
    }
    
    // setLoginValue=(e)=>{
    //     e.target.value
    // }
    render() {

        const {
            firstName,
            lastName,
            natioanlity,
            controlNumber,
            dateOfExpiration,
            email,
            password,
            next
        } = this.state;
        return (
            <Mutation mutation={SIGNUP}>
                { (signup, {loading, error, data}) => {
                    if(error) console.log(error);
                    if(data)console.log(data.createUser)
                    return (
                        
                        <div className="ms-Grid-row" style={{paddingBottom:'300px'}}>
                        <HeaderHomePage />
                        
                        <div className={`s-Grid-col ms-sm6 ms-xl6 ${classNames.pivot}`}>
                        {next ? (
                            <Card styles={styles.cardStyles}>
                                <Card.Section>                
                                {error ? <MessageBar messageBarType={MessageBarType.error} isMultiline={false} dismissButtonAriaLabel="Close" >There is an error processesing your request</MessageBar>:null}
                                <Text variant={'xxLarge'}>Registeration Form</Text>
                                <Text variant={'xLarge'}>Passport Info</Text>
                                <TextField
                                    disabled={loading} 
                                    name="firstName" 
                                    value={this.state.firstName}
                                    onChange={this.handleChange} 
                                    label="First Name"
                                />
                                <TextField
                                    disabled={loading} 
                                    name="lastName" 
                                    value={lastName} 
                                    onChange={this.handleChange} 
                                    label="Last Name"
                                />
                                <TextField
                                    disabled={loading} 
                                    name="natioanlity" 
                                    value={natioanlity} 
                                    onChange={this.handleChange} 
                                    label="Nationality"
                                />
                                <Text variant={'xLarge'}>Visa Info</Text>
                                <TextField
                                    disabled={loading} 
                                    
                                    value={controlNumber} 
                                    allowTextInput={true}
                                    onChange={this.handleChange} 
                                    onFocus={this.onFocus}
                                    label="Control Number"
                                />
                                <DatePicker
                                    disabled={loading} 
                                    calloutProps={{setInitialFocus: false}} // This doesn't work
                                    label="Date of Expiration"
                                    allowTextInput={true}
                                    value={dateOfExpiration}
                                    onFocus={this.onFocus}
                                    onChange={this.handleChange}
                                />
                                <PrimaryButton 
                                    disabled={loading} 
                                    text="Submit" 
                                    onClick={(e) => alert("Signed Up successfully")}
                                    // onClick={() => {
                                    //     props.history.push('/userDashboard')
                                    //     // var image = this.decodeBase64Image(signImage);
                                    //     //signup({variables: {firstName,lastName, natioanlity, controlNumber, dateOfExpiration, email, password}})
                                    // }}
                                />
                                </Card.Section>
                            </Card>
                        ):(
                            <Card styles={styles.cardStyles}>
                                <Card.Section>                
                                {error ? <MessageBar messageBarType={MessageBarType.error} isMultiline={false} dismissButtonAriaLabel="Close" >There is an error processesing your request</MessageBar>:null}
                                <Text variant={'xxLarge'}>Flight Reservation</Text>
                                <Text variant={'xLarge'}>Reservation Info</Text>
                                <TextField
                                    disabled={loading} 
                                    name="email"
                                    value={email} 
                                    onChange={this.handleChange} 
                                    label="Email Id"
                                />
                                <TextField
                                    disabled={loading} 
                                    name="password"
                                    value={password} 
                                    onChange={this.handleChange} 
                                    label="Password"
                                />
                                <PrimaryButton
                                    disabled={loading} 
                                    text="Next"
                                    onClick={this.onNext}
                                />
                                </Card.Section>
                            </Card>
                        
                        )}
                        </div>
                    </div>
                    );
                }}
            </Mutation>
        )
    }
}
export default SignupForm

const SIGNUP = gql`
mutation CreateUser(
  $name: String
  $email: EmailAddress
  $phone: PhoneNumber
  $role: Roles
  $signImage: Upload
  $govtId: Upload
  $address: AddressFields
) {
  createUser(
    input: {
      name: $name
      email: $email
      phone: $phone
      role: $role
      signImage: $signImage
      govtId: $govtId
      address: $address
    }
  ) {
    id
  }
}`;