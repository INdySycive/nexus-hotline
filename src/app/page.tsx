import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username, display_name')
      .eq('id', user.id)
      .single()
    profile = data
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">
          Nexus Hotline
        </h1>
        <p className="text-zinc-400 text-lg">
          Platform foundation is live.
        </p>

        <div className="mt-10 p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
          {user ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Logged in as</p>
                <p className="text-emerald-400 font-medium">
                  {profile?.display_name || user.email}
                </p>
                {profile?.username && (
                  <p className="text-zinc-500 text-sm mt-1">@{profile.username}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {profile?.username && (
                  <Link
                    href={`/u/${profile.username}`}
                    className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm"
                  >
                    View Profile
                  </Link>
                )}
                <Link
                  href="/profile/edit"
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm"
                >
                  Edit Profile
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="px-5 py-2 border border-zinc-700 hover:bg-zinc-900 rounded-lg text-sm"
                  >
                    Log Out
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-zinc-400">Not logged in</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 border border-zinc-700 rounded-lg text-sm hover:bg-zinc-900"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}