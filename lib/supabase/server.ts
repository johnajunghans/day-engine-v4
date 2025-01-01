// Import the function to create a Supabase client for server-side rendering (SSR)
import { createServerClient } from '@supabase/ssr';
// Import the Next.js headers module to interact with cookies
import { cookies } from 'next/headers';

export async function createClient() {
  // Get the current cookie store from the server-side request context
  const cookieStore = await cookies();

  // Create and return a server-side Supabase client
  return createServerClient(
    // The Supabase project URL, loaded from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // The public anonymous key for accessing Supabase, loaded from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Configure cookie handling for Supabase session management
      cookies: {
        // Define how to retrieve all cookies
        getAll() {
          return cookieStore.getAll(); // Fetch all cookies from the request context
        },
        // Define how to set multiple cookies
        setAll(cookiesToSet) {
          try {
            // Iterate through each cookie and set it in the response
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            console.error("Failed to set cookies in setAll:", error);
            // The `setAll` method was called from a Server Component context,
            // which does not allow setting cookies directly.
            // This block prevents the application from crashing in this scenario.
          }
        },
      },
    }
  );
}
