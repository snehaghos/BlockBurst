import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();
    const handleStartGame=()=>{
        navigate('/start');
    }
    return (
        <>
            <div>Home</div>
            <div >
                {/* <Link to="/" className='bg-yellow-300 p-4 rounded-md'>BLOCK BURST</Link> */}
                <div className='bg-yellow-300 p-4 rounded-md' onClick={handleStartGame}>
                    BLOCK BURST



                    
                </div>
            </div>

        </>
    )
}

export default Home