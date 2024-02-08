import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga';
import { App } from './App';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import './styles/index.css';

const { VITE_GOOGLE_TAG_ID, DEV } = import.meta.env;

ReactGA.initialize(VITE_GOOGLE_TAG_ID, { debug: DEV });

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
