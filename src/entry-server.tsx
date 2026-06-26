import { renderToString } from 'react-dom/server';
import App from './App';
import { getPrerenderPaths, getRouteMeta, resolveRoute } from './routing';
import './index.css';

export function render(path: string) {
  return renderToString(<App initialPath={path} />);
}

export function titleForPath(path: string) {
  return getRouteMeta(resolveRoute(path)).title;
}

export function metaForPath(path: string) {
  return getRouteMeta(resolveRoute(path));
}

export { getPrerenderPaths };
