import { createRoot } from 'react-dom/client'
import { InstUISettingsProvider, canvas } from '@instructure/ui'

import Example from './example';

createRoot(document.getElementById('root')!).render(
  <InstUISettingsProvider theme={canvas}>
    <Example />
  </InstUISettingsProvider>
)
