import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { jwtToken } from '../../Recoil';
import './landing.css';

const Landing = () => {

    const [jwt,] = useRecoilState(jwtToken);
    const navigate = useNavigate();


    useEffect((): void => {
        if(jwt === "") {
            navigate('/');
        }
    });

    return (
        <div className="landing">
            Landing page
        </div>
    );
}

export default Landing;