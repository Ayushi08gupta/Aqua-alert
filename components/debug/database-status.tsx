'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

export function DatabaseStatus() {
  const [status, setStatus] = useState<{
    connection: 'checking' | 'success' | 'error'
    auth: 'checking' | 'success' | 'error'
    tables: 'checking' | 'success' | 'error'
    error?: string
    user?: any
  }>({
    connection: 'checking',
    auth: 'checking',
    tables: 'checking'
  })

  const checkStatus = async () => {
    const supabase = createClient()
    
    try {
      // Check connection and tables
      const { data: reportsData, error: reportsError } = await supabase
        .from('hazard_reports')
        .select('count', { count: 'exact', head: true })
      
      if (reportsError) {
        setStatus(prev => ({
          ...prev,
          connection: 'error',
          tables: 'error',
          error: reportsError.message
        }))
        return
      }
      
      setStatus(prev => ({
        ...prev,
        connection: 'success',
        tables: 'success'
      }))
      
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        setStatus(prev => ({
          ...prev,
          auth: 'error',
          error: authError?.message || 'No authenticated user'
        }))
      } else {
        setStatus(prev => ({
          ...prev,
          auth: 'success',
          user
        }))
      }
      
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        connection: 'error',
        auth: 'error',
        tables: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }))
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Connected</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Checking...</Badge>
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Database Status
          <Button
            variant="outline"
            size="sm"
            onClick={checkStatus}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.connection)}
            <span>Database Connection</span>
          </div>
          {getStatusBadge(status.connection)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.tables)}
            <span>Tables</span>
          </div>
          {getStatusBadge(status.tables)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.auth)}
            <span>Authentication</span>
          </div>
          {getStatusBadge(status.auth)}
        </div>
        
        {status.user && (
          <div className="text-sm text-muted-foreground">
            Logged in as: {status.user.email}
          </div>
        )}
        
        {status.error && (
          <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
            Error: {status.error}
          </div>
        )}
        
        {status.connection === 'error' && (
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Troubleshooting steps:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Check your .env.local file has correct Supabase credentials</li>
              <li>Run the SQL scripts in your Supabase dashboard</li>
              <li>Verify Row Level Security policies are enabled</li>
              <li>Ensure you're logged in to submit reports</li>
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  )
}