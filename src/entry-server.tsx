import { renderToString } from 'react-dom/server';
import App from './App';
import { getPrerenderPaths, getRouteTitle, resolveRoute } from './routing';
import './index.css';

export function render(path: string) {
  return renderToString(<App initialPath={path} />);
}

export function titleForPath(path: string) {
  return getRouteTitle(resolveRoute(path));
}

export { getPrerenderPaths };
