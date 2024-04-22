const DragExcelFile = () => {
  return (
    `<><Dialog open={warningModalPreview} onClose={()=> {
    setWarningModalPreview(false);
    }}
    >
    <Dialog.Panel>
        <div className="p-5 text-center">
            <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-warning" />
            <div className="mt-5 text-3xl">Oops...</div>
            <div className="mt-2 text-slate-500">
                Something went wrong!
            </div>
        </div>
        <div className="px-5 pb-8 text-center">
            <Button type="button" variant="primary" onClick={()=> {
                setWarningModalPreview(false);
                }}
                className="w-24"
                >
                Ok
            </Button>
        </div>
        <div className="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400">
            <a href="" className="text-primary">
                Why do I have this issue?
            </a>
        </div>
    </Dialog.Panel>
</Dialog></>`
  );
}

export default DragExcelFile;
