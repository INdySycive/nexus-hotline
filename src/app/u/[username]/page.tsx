import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) {
    notFound()
  }

  // Check if the viewer is the owner of this profile
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === profile.id

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {profile.display_name || profile.username}
            </h1>
            <p className="text-zinc-400 mt-1">@{profile.username}</p>
          </div>

          {isOwner && (
            <Link
              href="/profile/edit"
              className="px-4 py-2 text-sm border border-zinc-700 rounded-lg hover:bg-zinc-900 transition"
            >
              Edit Profile
            </Link>
          )}
        </div>

        {/* Bio */}
        {profile.bio ? (
          <div className="mb-10">
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {profile.bio}
            </p>
          </div>
        ) : (
          <p className="text-zinc-500 mb-10 italic">No bio yet.</p>
        )}

        {/* Placeholder sections for later */}
        <div className="border-t border-zinc-800 pt-10">
          <h2 className="text-xl font-semibold mb-4">Activity</h2>
          <p className="text-zinc-500 text-sm">
            Games, artwork, music, and posts will appear here later.
          </p>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="text-zinc-400 hover:text-white text-sm">
            ← Back to Nexus Hotline
          </Link>
        </div>
      </div>
    </main>
  )
}