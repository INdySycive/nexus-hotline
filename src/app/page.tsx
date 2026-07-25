import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Nexus Hotline
        </h1>
        <p className="text-zinc-400 text-lg">
          Platform foundation is live.
        </p>

        <div className="mt-10 p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
          <p className="text-sm text-zinc-500 mb-2">Supabase Status</p>
          <p className="text-emerald-400 font-medium">
            {user ? `Logged in as ${user.email}` : 'Connected — no user logged in yet'}
          </p>
        </div>

        <p className="text-zinc-500 text-sm mt-8">
          Next: Authentication + Profiles + Groups
        </p>
      </div>
    </main>
  )
}