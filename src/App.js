import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <Header />
      <Form />
    </div>
  );
}

export default App;

function Header() {
  return (
    <div>
      <h1>Calculating alcohol blood level 🍷</h1>
    </div>
  );
}

function Form() {
  //States for all values that must be tracked or might change in the UI
  const [bottles, setBottles] = useState(0);
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState("");
  const [bloodAlcoholLevel, setBloodAlcoholLevel] = useState(0);

  //Function to calculate blood alocohol level
  const CalculateBloodAlcoholLevel = () => {
    if (gender === "1" || gender === "2") {
      const litres = bottles * 0.33;
      const grams = litres * 8 * 4.5;
      const burning = weight / 10;

      const gramsLeft = grams - burning * time;

      let result =
        gender === "1"
          ? gramsLeft / (weight * 0.7)
          : gramsLeft / (weight * 0.6);

      //Handles negative results
      if (result < 0) {
        result = 0;
      }
      setBloodAlcoholLevel(result.toFixed(2));
    } else {
      // If neither male nor female is selected
      setBloodAlcoholLevel(0);
    }
  };

  const handleCheckBoxChange = (value) => {
    setGender(value);
  };

  const handleWeightChange = (e) => {
    setWeight(Number(e.target.value));
  };

  const handleBottleChange = (e) => {
    setBottles(Number(e.target.value));
  };

  const handleTimeChange = (e) => {
    setTime(Number(e.target.value));
  };

  return (
    <div className="form-container">
      <form>
        <div className="form-row">
          <label>Weight: </label>
          <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
          ></input>
        </div>

        <div className="form-row">
          <label>Bottles: </label>
          <select value={bottles} onChange={handleBottleChange}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Time:</label>
          <select value={time} onChange={handleTimeChange}>
            {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row label-gender">
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="1"
                checked={gender === "1"}
                onChange={() => handleCheckBoxChange("1")}
              />
              <span className="gender-label">Male</span>
            </label>
            <label>
              <input
                type="checkbox"
                value="2"
                checked={gender === "2"}
                onChange={() => handleCheckBoxChange("2")}
              />
              <span className="gender-label">Female</span>
            </label>
          </div>
        </div>
      </form>

      <div className="result-container">
        <p className="result">{bloodAlcoholLevel}</p>
      </div>

      <div className="button-container">
        <button onClick={CalculateBloodAlcoholLevel}>Calculate</button>
      </div>
    </div>
  );
}
