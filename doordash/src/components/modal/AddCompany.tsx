import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { BuildingOfficeIcon } from '@heroicons/react/24/outline'

function PostCompany(name: any, country: any, state: any, zipCode: any, emailId: any, careerPortal: any, setError: any, setOpen: any) {

  const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "companies");

  fetch(backendUrl, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      name: name,
      country: country,
      state: state,
      zipCode: zipCode,
      email: emailId,
      portal: careerPortal
    })
  }).then((response) => {
    if(response.ok)
      response.json()
      .then((data) => {
        console.log(data);
        setError(null);
        setOpen(false);
      })
    else
      response.text()
      .then((data) => {
        console.log(data);
        setError(data)
      })
  })
  .catch((err) => {
    console.log(err.message);
    setError(err.message)
  });

}

export default function AddCompany({open, setOpen}: any) {
  
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [emailId, setEmailId] = useState('');
  const [careerPortal, setCareerPortal] = useState('');
  const [error, setError] = useState(null);

  return (
    <Dialog className="relative z-10" open={open} onClose={setOpen}>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto opacity-95">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-gray-800 px-4 pb-5 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-500 sm:mx-0 sm:h-10 sm:w-10">
                  <BuildingOfficeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h2" className="font-semibold leading-6 text-lg text-white">
                    Company Details
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                      Enter official name, addresses and contact details of the company.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 mb-8 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-2" action="#" method="POST">
                <div>
                  <label htmlFor="text" className="block text-sm font-medium leading-6 text-white">
                    Name*
                  </label>
                  <div className="mt-2">
                    <input
                      id="Name"
                      name="Name"
                      type="text"
                      required
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full text-gray-300 rounded-md border-0 py-1.5 pl-2 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="text" className="block text-sm font-medium leading-6 text-white">
                    Country*
                  </label>
                  <div className="mt-2">
                    <input
                      id="Country"
                      name="Country"
                      type="text"
                      required
                      onChange={(e) => setCountry(e.target.value)}
                      className="block w-full text-gray-300 rounded-md border-0 py-1.5 pl-2 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="text" className="block text-sm font-medium leading-6 text-white">
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      id="State"
                      name="State"
                      type="text"
                      onChange={(e) => setState(e.target.value)}
                      className="block w-full text-gray-300 rounded-md border-0 py-1.5 pl-2 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="text" className="block text-sm font-medium leading-6 text-white">
                    ZIP Code
                  </label>
                  <div className="mt-2">
                    <input
                      id="ZIP Code"
                      name="ZIP Code"
                      type="text"
                      onChange={(e) => setZipCode(e.target.value)}
                      className="block w-full text-gray-300 rounded-md border-0 py-1.5 pl-2 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                    Email ID*
                  </label>
                  <div className="mt-2">
                    <input
                      id="Email ID"
                      name="Email ID"
                      type="email"
                      required
                      onChange={(e) => setEmailId(e.target.value)}
                      className="block w-full text-gray-300 rounded-md border-0 py-1.5 pl-2 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-medium leading-6 text-white">
                    Career Portal*
                  </label>
                  <div className="mt-2">
                    <input
                      id="Career Portal"
                      name="Career Portal"
                      type="url"
                      required
                      onChange={(e) => setCareerPortal(e.target.value)}
                      className="block w-full text-gray-300 rounded-md border-0 py-1.5 pl-2 bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <p
                className='text-red-500'
                >
                  {error}
                </p>
              </form>
            </div>

            <div className="bg-gray-800 px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6">
                <a
                onClick={() => PostCompany(name, country, state, zipCode, emailId, careerPortal, setError, setOpen)}
                className="cursor-pointer rounded-md transition bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Submit
                </a>
                <a
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md transition px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:text-red-400 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Cancel
                </a>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}