import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                location={location}
                history={{ replace: (path) => navigate(path, { replace: true }), push: (path) => navigate(path) }}
                match={{ params }}
                params={params}
            />
        );
    }

    return ComponentWithRouterProp;
}
