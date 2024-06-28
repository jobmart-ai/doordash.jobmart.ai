import { CustomRouteConfigs } from './config'
import { observer } from 'mobx-react'
import React, { FC, Suspense } from 'react'
import { Route, Routes  } from 'react-router-dom'
import Body from '../job-wardrobe/JobWardrobe'
import Header from '../header/Header'

const CustomRoutes: FC = observer(() => {
    const Home = CustomRouteConfigs[0].component
    return (
       <Suspense fallback={<Body />}>
           <Routes>
                {CustomRouteConfigs.map((route: { component: any; path: string; auth: boolean; }, index: any) => {
                   const Component = route.component;
                   const WrappedComponent = route.auth ? (
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