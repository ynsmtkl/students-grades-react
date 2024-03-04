import Alert from "../../base-components/Alert";

function Main() {
  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Page 2</h2>
      </div>
      {/* BEGIN: Page Layout */}
      <div className="p-5 mt-5 intro-y box">
          <Alert variant="primary" className="mb-2">
              <div className="flex items-center">
                  <div className="text-lg font-medium">
                      Awesome alert with additional info
                  </div>
                  <div className="px-1 ml-auto text-xs bg-white rounded-md text-slate-700">
                      New
                  </div>
              </div>
              <div className="mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s.
              </div>
          </Alert>
      </div>
      {/* END: Page Layout */}
    </>
  );
}

export default Main;
