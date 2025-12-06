"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Flag, Eye, MessageCircle } from "lucide-react"

interface UserVerificationProps {
  reportId: number
  currentUserVote?: 'confirm' | 'dispute' | null
  confirmCount: number
  disputeCount: number
  onVote: (vote: 'confirm' | 'dispute') => void
  onFlag: () => void
}

export function UserVerification({ 
  reportId, 
  currentUserVote, 
  confirmCount, 
  disputeCount, 
  onVote, 
  onFlag 
}: UserVerificationProps) {
  const [hasVoted, setHasVoted] = useState(!!currentUserVote)

  const handleVote = (vote: 'confirm' | 'dispute') => {
    if (!hasVoted) {
      onVote(vote)
      setHasVoted(true)
    }
  }

  return (
    <Card className="bg-muted/30 border-border/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Community Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={currentUserVote === 'confirm' ? 'default' : 'outline'}
              onClick={() => handleVote('confirm')}
              disabled={hasVoted}
              className="text-xs"
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              Confirm ({confirmCount})
            </Button>
            <Button
              size="sm"
              variant={currentUserVote === 'dispute' ? 'destructive' : 'outline'}
              onClick={() => handleVote('dispute')}
              disabled={hasVoted}
              className="text-xs"
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              Dispute ({disputeCount})
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onFlag}
            className="text-xs"
          >
            <Flag className="h-3 w-3 mr-1" />
            Flag
          </Button>
        </div>
        
        {hasVoted && (
          <div className="text-xs text-muted-foreground">
            Thank you for helping verify this report
          </div>
        )}
      </CardContent>
    </Card>
  )
}