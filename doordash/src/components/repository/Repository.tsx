import classNames from "classnames";
import { useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import OfficeHqIcon from '../../assets/office-hq-icon.jpg'
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import AddCompany from "../modal/AddCompany";



function EmptyRepository(props: any) {

  function EmptyRepositoryMessage() {
    if(props.companies.length == 0)
      return (<>
        <img
          className="w-32 mb-4"
          src={OfficeHqIcon}
        />
        <h2 className="mb-2 text-xl font-semibold text-gray-700">Empty Repository</h2>
        <p className="mb-6 text-center text-gray-500">
          It looks like you haven't added any companies yet. Start by adding a new dream company.
        </p>
      </>);
    else
      return <>
        <p className="mb-6 text-center text-gray-500">
          Add more companies to your repository.
        </p>
      </>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 bg-white">
      <EmptyRepositoryMessage/>
      <button
        onClick={() => props.setAddCompany(true)}
        className="px-5 py-2.5 text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
      >
        + Company
      </button>
    </div>
  );
}

export default function Repository() {

  const navigate = useNavigate();
  const [selectedCompany, setselectedCompany] = useState(-1);
  const [companies, setCompanies] = useState([]);
  const {isAuth, Authenticate} = AuthContext();
  const [addCompany, setAddCompany] = useState(false);
  console.log('Rendering Repository with auth:', isAuth);

  function FetchComapnies() {
    
    const backendUrl = new URL(process.env.REACT_APP_TOWLSCHII_UTILITIES_INGRESS + "companies");
    fetch(backendUrl, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      if(response.ok)
        response.json()
        .then((data) => {
          console.log("List of Comapnies")
          console.log(data);
          setCompanies(data.map((item: any) => item.fields));
        })
      else if(response.status === 401)
        response.text()
        .then((data) => {
          console.log(data);
          navigate('/login');
        })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    Authenticate();
    FetchComapnies();
  }, [isAuth]);

  useEffect(() => {
    if(addCompany === false)
      FetchComapnies();
  }, [addCompany]);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      
      <AddCompany open={addCompany} setOpen={setAddCompany}/>

      <EmptyRepository companies={companies} setAddCompany={setAddCompany}/>
      <ul role="list" className="divide-y divide-gray-100">
      {companies.map((company: any, index) => (
        <li 
        key={company.email} 
        className={classNames('flex justify-between gap-x-6 py-5',
          selectedCompany === index ? 'bg-slate-400' : ' hover:bg-rose-200',
          'rounded-md px-3 py-2 text-sm font-medium'
        )}
        onClick={
          () => setselectedCompany(selectedCompany === index ? -1 : index)
        }
        >
          <div className="flex min-w-0 gap-x-4">
            <BriefcaseIcon className="flex-none bg-rose-500 rounded-full h-12 w-12 p-2 text-white" aria-hidden="true" />
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
