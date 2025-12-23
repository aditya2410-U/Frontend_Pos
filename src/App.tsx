import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./common/@atoms/button";
import { Input } from "./common/@atoms/input";
import { Textarea } from "./common/@atoms/textarea";
import { ModeToggle } from "./common/@atoms/mode-toggle";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button>Click me</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Input placeholder="Type your name" />
        <Textarea placeholder="Type your message" />
        <ModeToggle />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
