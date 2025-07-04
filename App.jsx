import { useEffect, useState } from "react";
const App = () => {
  const [timeInSec, setTimeinSec] = useState(0);
  const [Laps, setLaps] = useState([]);
  const [pause, setpause] = useState(true);


  useEffect(() => {
    let id = null;
    if (pause) {
      id = setTimeout(() => {
        setTimeinSec((prevTime) => {
          console.log("T", prevTime)
          return prevTime + 1
        });
      }, 1000)
    }
    return () => {
      clearTimeout(id);
    }
  }, [timeInSec, pause]);  //everytime::before running the callback function react will always run the cleanup fucntion from previous call back
  const seconds = timeInSec % 60;
  const minutes = Math.floor(timeInSec / 60) % 60;
  const hours = Math.floor(timeInSec / 3600);
  const uniformSecondValue = seconds.toString().padStart(2, '0')
  const uniformMinutesValue = minutes.toString().padStart(2, "0")
  const uniformHoursValue = hours.toString().padStart(2, "0")
  const handlelap = () => {
    setLaps((prev) => {
      const temp = [...prev];
      temp.push(`${uniformHoursValue}:${uniformMinutesValue}:${uniformSecondValue}`)
      return temp;
    })
  }
  const handlePause = () => {
    setpause((prev) => {
      return !prev;
    });
  }
  const handleReset = () => {
    setpause(false);
    setTimeinSec(0);
  }
  return (
    <>
      <div>
        <h2>
          {uniformHoursValue}:{uniformMinutesValue}:{uniformSecondValue}
        </h2>
        <button onClick={handlelap}>Lap</button>
        {pause ? (<button onClick={handlePause}>PAUSE</button>)
          : (<button onClick={handlePause}>PLAY</button>
          )}
        <button onClick={handleReset}>RESET</button>

      </div >
      <ol>
        {Laps.map((lap, idx) => {
          return <li key={idx}>{lap}</li>
        })}
      </ol>
    </>
  )
}
export default App;