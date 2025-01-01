'use client'

import { UserButton, useAuth } from '@clerk/nextjs'

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

export default function Home() {
  const { has, isLoaded } = useAuth()

  if (!isLoaded) {
    return <span>Loading...</span>
  }

  const isAdmin = has({ permission: 'org:app:admin' })

  return (
    <header>
      <UserButton>
        {isAdmin && (
          <UserButton.MenuItems>
            <UserButton.Link
              label="Create organization"
              labelIcon={<DotIcon />}
              href="/create-organization"
            />
          </UserButton.MenuItems>
        )}
      </UserButton>
    </header>
  )
}