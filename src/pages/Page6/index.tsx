import Button from "../../base-components/Button";

export default function Page6(){
  const name = "Ahmad";
  return (
    <>
      <div className="flex justify-center items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Page 6</h2>
      </div>
      {/* BEGIN: Page Layout */}
      <div className="p-5 mt-5 intro-y box">
        <div className="flex justify-between items-center">
          {name}
        </div>
      </div>
    </>
  )
}
