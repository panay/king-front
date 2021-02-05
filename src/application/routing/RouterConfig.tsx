import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";

const NotFoundPage = lazy(() => import('../pages/NotFound'));

export const RouterConfig = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    {/*<Route exact path="/" component={Todos}/>*/}
                    {/*<Route exact path="/:id/tasks" component={Tasks}/>*/}

                    <Route path="*" component={NotFoundPage}/>
                </Switch>
            </Suspense>
        </>
    )
};
