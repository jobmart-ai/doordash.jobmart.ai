import { CustomRouteConfigs } from './config'
import { observer } from 'mobx-react'
import React, { Dispatch, FC, SetStateAction, Suspense, useContext, useEffect } from 'react'
import { Route, Routes  } from 'react-router-dom'
import Home from "../home/Home";
import Header from '../header/Header'

const CustomRoutes: FC = observer(() => {

    console.log('Rendering PrivateRoutes');
    return (
       <Suspense fallback={<Home />}>
           <Routes>
                {CustomRouteConfigs.map((route: { component: any; path: string; header: boolean; }, index: any) => {
                   const Component = route.component;
                   const WrappedComponent = route.header ? (
                        <>
                            <Header />
                            <Component />
                        </>
                    ) : (
                        <Component />
                    );
                   
                   return <Route key={`route-${index}`} path={route.path} element={WrappedComponent} />
                })}
                
               <Route key={`route-0`} path='/' element={<Home/>} />
           </Routes>
       </Suspense>
    )
   })

   const PrivateRoutes = React.memo(CustomRoutes)
   export default PrivateRoutes