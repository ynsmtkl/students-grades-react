import Button from "../../base-components/Button";
import {useState} from "react";

function Page5() {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div className="flex justify-center items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Page 5</h2>
      </div>
      {/* BEGIN: Page Layout */}
      <div className="p-5 mt-5 intro-y box">
        <div className="flex justify-between items-center">
          <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
          <h2>{counter}</h2>
        </div>
      </div>
      {/* END: Page Layout */}
    </>
  );
}

export default Page5;
