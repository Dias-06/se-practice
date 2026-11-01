// Final optimized version with mobile padding fix
import { Building2 } from 'lucide-react';
import AvailabilityChecker from '@/components/AvailabilityChecker';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-5 sm:px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-teal-700">Smart Campus</p>
            <h1 className="text-xl font-semibold leading-tight text-slate-900">Study Room Availability</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
            Find out if your study room is free
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Select a room, enter the time window you need, and check it against the current schedule.
          </p>
        </div>

        <AvailabilityChecker />
      </main>
    </div>
  );
}

export default App;
