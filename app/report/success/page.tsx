import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Eye } from "lucide-react"

export default function ReportSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold">Report Submitted Successfully</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Thank you for helping protect our coastal communities. Your hazard report has been submitted and will be
                reviewed by our team.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
                <p className="font-medium text-primary mb-1">What happens next?</p>
                <ul className="text-left text-muted-foreground space-y-1">
                  <li>• Your report will be reviewed within 24 hours</li>
                  <li>• Verified reports appear on the public map</li>
                  <li>• Critical hazards trigger immediate alerts</li>
                  <li>• You'll receive updates on your report status</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  <Eye className="h-4 w-4 mr-2" />
                  View Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/report">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Submit Another Report
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
