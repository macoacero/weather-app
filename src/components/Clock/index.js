import React, {useState, useEffect} from 'react';

function Clock(props){

    const [date, setDate] = useState(new Date());  
    
    const nowInLocalTime = Date.now() + 1000 * ( props.data.timezone / 3600);
    const millitime = new Date(nowInLocalTime).toLocaleString()


    useEffect(() => {
        var timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
          };
       });
      
         function tick() {
          setDate(nowInLocalTime);
         }

    return (
        <div className="container">
            Local time: {props.data.length !== 0 ? millitime : ''}
        </div>
        );

}

export default Clock;