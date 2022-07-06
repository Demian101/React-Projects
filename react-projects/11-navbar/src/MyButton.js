import { useRef ,React} from "react";

export default function MyButton() {
  const countRef = useRef(0)

  const handleClick = () => {
    countRef.current = countRef.current + 1
  };

  return <button onClick={handleClick}>Click me {countRef.current}</button>;
}