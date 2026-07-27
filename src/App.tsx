import AppShell from './components/layout/AppShell'
import Builder from './components/builder/Builder'
import ReviewPanel from './components/review/ReviewPanel'
import { BundleProvider } from './context/BundleContext'
import { AlertProvider } from './context/AlertContext'

export default function App() {
  return (
    <BundleProvider>
      <AlertProvider>
        <AppShell>
          <Builder />
          <ReviewPanel />
        </AppShell>
      </AlertProvider>
    </BundleProvider>
  )
}
