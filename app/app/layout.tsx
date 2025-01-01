
// import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
 
          
          <div>
            {/* <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>  */}
            
            
            {children}</div>
        
    
  )
}