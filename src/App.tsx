import { useEffect, useState } from 'react';
import './App.css';

const generateRandomColor = () => {
  const digits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'];
  const color = new Array(6)
    .fill('')
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join('');
  return `#${color}`;
}

function App() {

  // color guessing game
  const [currentColor, setCurrentColor] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    assignHexColors();
  }, []);

  const assignHexColors = () => {
    const correctColor = generateRandomColor();
    setCurrentColor(correctColor);
    const colorOptions = [correctColor, generateRandomColor(), generateRandomColor()];
    setOptions(colorOptions.sort(() => 0.5 - Math.random()));
  }

  const makeGuess = (guess: string) => {
    if (guess === currentColor) {
      setResultMessage('CORRECT');
      assignHexColors();
    } else {
      setResultMessage('WRONG ANSWER');
    }
  }

  return (
    <div className='outer-container'>
      <div className='color-section' style={{ background: currentColor }}></div>
      <div className='choice-container'>
        <button className='color-choice' onClick={() => makeGuess(options[0])}>{options[0]}</button>
        <button className='color-choice' onClick={() => makeGuess(options[1])}>{options[1]}</button>
        <button className='color-choice' onClick={() => makeGuess(options[2])}>{options[2]}</button>
      </div>
      {resultMessage && (
        <div style={{ color: resultMessage === "CORRECT" ? 'green' : 'red' }}>
          {resultMessage}
        </div>
      )}
    </div>
  )
}

export default App
