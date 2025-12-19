const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function verifyDatabase() {
  try {
    console.log('Checking database connection...')
    
    // Test connection by checking if hazard_reports table exists
    const { data, error } = await supabase
      .from('hazard_reports')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Database error:', error.message)
      console.log('\nPossible solutions:')
      console.log('1. Run the SQL scripts in your Supabase dashboard:')
      console.log('   - scripts/001_create_tables.sql')
      console.log('   - scripts/002_create_policies.sql')
      console.log('   - scripts/003_create_functions.sql')
      console.log('   - scripts/004_create_indexes.sql')
      console.log('2. Check your Supabase URL and API key in .env.local')
      console.log('3. Ensure Row Level Security policies are properly configured')
      return false
    }
    
    console.log('✅ Database connection successful!')
    console.log(`Found ${data?.length || 0} reports in the database`)
    
    // Test authentication
    const { data: user, error: authError } = await supabase.auth.getUser()
    if (authError) {
      console.log('⚠️  No authenticated user (this is normal for server-side check)')
    } else {
      console.log('✅ User authenticated:', user?.user?.email)
    }
    
    return true
  } catch (error) {
    console.error('Verification failed:', error.message)
    return false
  }
}

verifyDatabase()