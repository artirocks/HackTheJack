import React from 'react';

//components
import { Link } from 'react-router-dom';
//ui
import { Text , Stack} from 'office-ui-fabric-react';

// styles
import './style.css'

const stackTokens = { childrenGap: 15 };

function HeaderHomepage() {
    return (
        <div id = "header" style={{backgroundColor:'blue'}}>
            <div className="ms-Grid-row">
                <div style={{height:'75px',padding:'0em',margin:'0',display:'flex',flexDirection:'row',backgroundColor:'#FFFFFF'}}>
                        <Text style={{marginTop:'10px',marginLeft:'40px',marginRight:"35%",height:'100%', width:'100%', fontSize:'35px'}} variant={'xxLarge'} nowrap>Biometric Based Check In</Text>
                    <div style={{paddingTop:"20px",width:'40%',marginRight:"50px",color:'black'}}>
                        <Stack horizontal tokens={stackTokens}>    
                            <Link className="header" to='/'>Home</Link>
                            <Link className="header" to='/login'>Login</Link>
                            <Link className="header" to='/signup'>Signup</Link>
                            <Link className="header" to='/faq'>FAQs</Link>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderHomepage