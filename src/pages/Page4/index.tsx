import { Disclosure } from "../../base-components/Headless";

function Page4(){
    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Page 4</h2>
            </div>
            {/* BEGIN: Page Layout */}
            <div className="p-5 mt-5 intro-y box">
                <Disclosure.Group>
                    <Disclosure>
                        <Disclosure.Button>
                            OpenSSL Essentials: Working with SSL Certificates,
                            Private Keys
                        </Disclosure.Button>
                        <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                        </Disclosure.Panel>
                    </Disclosure>
                    <Disclosure>
                        <Disclosure.Button>
                            Understanding IP Addresses, Subnets, and CIDR Notation
                        </Disclosure.Button>
                        <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                        </Disclosure.Panel>
                    </Disclosure>
                    <Disclosure>
                        <Disclosure.Button>
                            How To Troubleshoot Common HTTP Error Codes
                        </Disclosure.Button>
                        <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                        </Disclosure.Panel>
                    </Disclosure>
                    <Disclosure>
                        <Disclosure.Button>
                            An Introduction to Securing your Linux VPS
                        </Disclosure.Button>
                        <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                        </Disclosure.Panel>
                    </Disclosure>
                </Disclosure.Group>
            </div>
            {/* END: Page Layout */}
        </>
    );
}

export default Page4;
