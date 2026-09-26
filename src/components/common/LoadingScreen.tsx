'use client';

export { AppLoadingScreen as LoadingScreen, AppLoadingScreen } from './AppLoadingScreen';
export default function LoadingScreenDefault(props: Parameters<typeof import('./AppLoadingScreen').AppLoadingScreen>[0]) {
  const { AppLoadingScreen } = require('./AppLoadingScreen');
  return <AppLoadingScreen {...props} />;
}
