'use client'
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  let [location, setLocation] = useState("");
  let [cars, setCars] = useState([]);
  let [simSpeed, setSimSpeed] = useState(10);
  const running = useRef(null);

  let setup = () => {
    console.log("Hola");
    fetch("http://localhost:8000/simulations", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  })
    }).then(resp => resp.json())
    .then(data => {
      console.log(data);
      setLocation(data["Location"]);
      setCars(data["cars"]);
    });
  }

  const handleStart = () => {
    running.current = setInterval(() => {
      fetch("http://localhost:8000" + location)
      .then(res => res.json())
      .then(data => {
        setCars(data["cars"]);
      });
    }, 1000 / simSpeed);
  };

  const handleStop = () => {
    clearInterval(running.current);
  }

  const handleSimSpeedSliderChange = (event, newValue) => {
    setSimSpeed(newValue);
  };


  return (
    <main className={styles.main}>
      <div>
        <button variant={"contained"} onClick={setup}>
          Setup
        </button>
        <button variant={"contained"} onClick={handleStart}>
          Start
        </button>
        <button variant={"contained"} onClick={handleStop}>
          Stop
        </button>
      </div>
      <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"white"}}>

      <rect x={0} y={200} width={800} height={80} style={{fill: "darkgray"}}></rect>
      {/* <image x={0} y={240} href="./racing-car.png"/> */}
      {
        cars.map(car =>
          <image id={car.id} x={car.pos[0]*32} y={240} width={32} href="./racing-car.png"/>
        )
      }
      </svg>
    </main>
  );
}
