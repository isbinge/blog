import React from 'react';
import { Route, RouteProps, RedirectProps, Switch } from 'react-router-dom';

interface CompatibleRouteConfigBase
  extends Omit<RouteProps, 'component'>,
    Partial<Omit<RedirectProps, 'path'>> {}

interface RouteConfig extends CompatibleRouteConfigBase {
  /** Specify route name  */
  name?: string;
  /** Route title  */
  title?: false | string | { defaultTitle: string; id: string };
  /** Sub routes for layout route or simply organizing */
  routes?: RouteConfig[];
  /**
   * `isLazy` is deprecated.
   *
   * Directly pass dynamic import function here
   * to enable route splitting
   */
  fallback?: React.ReactNode;
  /** Redirecting route */
  //   redirect?: RedirectProps;
  /** Component to render */
  component?: React.ComponentType<unknown>;
  /** Accepting roles */
  // auths?: UserRole[];
  /** Redirecting if not match the auths */
  // authNoMatchRedirect?: string;
  /** Render if not match the auths */
  // authNoMatchRender?: React.ComponentType<unknown>;
  /** If to carry token for authorization */
  noTokenRedeem?: boolean;
}

const ConfiguredRoute: React.FC<RouteConfig> = (props) => {
  const { component, routes, ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: React.ComponentType<any> = component;

  if (!Component) {
    throw new Error('component is required for each path');
  }
  if (routes) {
    return (
      <Route
        {...rest}
        render={(routeProps) => (
          <Component {...routeProps}>
            <Switch>
              {routes.map((subRoute, i) => (
                <ConfiguredRoute {...subRoute} key={i} />
              ))}
            </Switch>
          </Component>
        )}
      />
    );
  }

  return <Route path={rest.path} component={component} />;
};

export default ConfiguredRoute;
