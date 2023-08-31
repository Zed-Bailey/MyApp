import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from 'store/slices/users.slice';
import { weatherActions } from 'store/slices/weather.slice';



export function Home() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    
    const { weather } = useSelector(x => x.weather);
    

    useEffect(() => {
        dispatch(weatherActions.getForecast());
    }, []);

    return (
        <div>
            <h1>Hi {authUser?.username}!</h1>
            <p>your roles: <span className='font-bold'>{authUser.roles}</span></p>
        
            <br/>
            <hr/>
            <p>Weather from authenticated endpoint</p>
            {weather.length &&
                
                <ul>
                    {weather.map((w, i) =>
                        <li key={i}>{w.date} | {w.temperatureC}° | {w.summary}</li>
                    )}
                </ul>

            }

            {weather.loading && <div className="spinner-border spinner-border-sm"></div>}
            {weather.error && <div className="text-danger">Error loading users: {weather.error.message}</div>}


        </div>
    );
}
