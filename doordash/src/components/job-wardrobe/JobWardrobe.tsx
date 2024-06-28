import classNames from "classnames";
import { useState } from "react";

const companies = [
  {
    name: 'Google',
    email: 'support@google.com',
    country: 'United States',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    portal: 'https://www.google.com/about/careers/applications/jobs/results',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    country: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    portal: '3h ago',
  }
]

export default function JobWardrobe() {
const [selectedCompany, setselectedCompany] = useState(-1);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <ul role="list" className="divide-y divide-gray-100">
      {companies.map((company, index) => (
        <li 
        key={company.email} 
        className={classNames('flex justify-between gap-x-6 py-5',
          selectedCompany === index ? 'bg-slate-400' : ' hover:bg-slate-200',
          'rounded-md px-3 py-2 text-sm font-medium'
        )}
        onClick={
          () => setselectedCompany(selectedCompany===index ? -1 : index)
        }
        >
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={company.imageUrl} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-lg font-semibold leading-6 text-gray-900">{company.name}</p>
              <p 
              className={classNames('mt-1 truncate text-sm leading-5',
                selectedCompany === index ? 'text-gray-100' : ' text-gray-500'
              )}
              >{company.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{company.country}</p>
            <a target="_blank" href={company.portal} className="mt-1 truncate text-sm leading-5 text-blue-700">
              Career Portal
            </a>
          </div>
        </li>
      ))}
    </ul>
    </div>
    
  )
}
