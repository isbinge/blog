import { hot } from 'react-hot-loader/root';
import React from 'react';
import dva, { routerRedux } from 'dva';
import { notification } from 'antd';
import { Switch } from 'dva/router';
import models from './config/models';
import routeConfig from './config/router';
import ConfiguredRoute from './ConfiguredRoute';

import 'antd/dist/antd.css';
const { ConnectedRouter } = routerRedux;

const app = dva({
  onError: (e) => {
    if (process.env.development) {
      notification.error({
        message: `未处理的错误: ${e.message}`,
        description: (
          <div>
            <div>该错误非自定义错误，且未被处理，而被顶层捕获。</div>
            <div style={{ marginBottom: '8px' }}>
              请查看控制台排查，如果这是有意为之，请确保有后续 catch 操作。
            </div>
            <em>注意: 该提示仅在开发模式下可见。</em>
          </div>
        ),
        duration: 2,
      });
      console.error(e);
    } else {
      notification.error({
        message: "Something's wrong...",
        description:
          'Please refresh and try again, if the error still exists, please contact the support team.',
        duration: 2,
      });
    }
  },
});

models.forEach((model) => app.model(model));

app.router(({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {routeConfig.map((route, i) => (
          <ConfiguredRoute {...route} key={i} />
        ))}
      </Switch>
    </ConnectedRouter>
  );
});

const App = app.start();

export default hot(() => <App />);
