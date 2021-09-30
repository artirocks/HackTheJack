import React, { Fragment } from 'react'

//components
import HeaderHomePage from '../../components/header/HeaderHomepage'
import AAILogo from '../../assets/a2.png'

//ui
import { Text, Stack } from 'office-ui-fabric-react';
import { Icon } from '@fluentui/react/lib/Icon';

//style 
import './style.css'

const stackTokens = { childrenGap: 20 };

function Home() {
    return (
        <div id="home">
            <div style={{padding:'0em',margin:'0'}} className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <HeaderHomePage/>
                </div>
                <div style={{padding:'5em'}}>
                    <div style={{minHeight:"650px"}} className="ms-Grid-row">
                        <div style={{marginLeft:"900px"}} class="ms-Grid-col ms-sm6 ms-sm6">
                            <Text style={{color:'#ffffff',height:'100%', fontSize:'150px'}} variant={'xxLarge'}><div className="portal">Air<br/> Exit</div></Text>
                        </div>
                        <div style={{marginRight:"10px"}}class="ms-Grid-col ms-sm6 ms-sm6">
                            <img src={AAILogo} width="130%" alt="Air Fast"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home