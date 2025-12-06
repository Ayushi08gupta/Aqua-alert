"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationPicker } from "./location-picker"
import { ImageUpload } from "./image-upload"
import { AlertTriangle, MapPin, Camera, Send } from "lucide-react"

interface ReportFormProps {
  userId: string
}

const HAZARD_TYPES = [
  { value: "tsunami", label: "Tsunami" },
  { value: "hurricane", label: "Hurricane" },
  { value: "storm_surge", label: "Storm Surge" },
  { value: "coastal_flooding", label: "Coastal Flooding" },
  { value: "rip_current", label: "Rip Current" },
  { value: "marine_debris", label: "Marine Debris" },
  { value: "oil_spill", label: "Oil Spill" },
  { value: "harmful_algae", label: "Harmful Algae Bloom" },
  { value: "other", label: "Other" },
]

const SEVERITY_LEVELS = [
  { value: "low", label: "Low - Minor concern" },
  { value: "medium", label: "Medium - Moderate risk" },
  { value: "high", label: "High - Significant danger" },
  { value: "critical", label: "Critical - Immediate threat" },
]

export function ReportForm({ userId }: ReportFormProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hazard_type: "",
    severity: "",
    latitude: 0,
    longitude: 0,
    location_name: "",
    image_url: "",
  })

  const router = useRouter()
  const supabase = createClient()

  const handleLocationSelect = (lat: number, lng: number, locationName: string) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      location_name: locationName,
    }))
  }

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: imageUrl,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase.from("hazard_reports").insert({
        user_id: userId,
        title: formData.title,
        description: formData.description,
        hazard_type: formData.hazard_type,
        severity: formData.severity,
        latitude: formData.latitude,
        longitude: formData.longitude,
        location_name: formData.location_name,
        image_url: formData.image_url || null,
      })

      if (error) throw error

      // Also save to localStorage for immediate dashboard display
      const userReport = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        hazard_type: formData.hazard_type,
        severity: formData.severity,
        latitude: formData.latitude,
        longitude: formData.longitude,
        location: formData.location_name,
        created_at: new Date().toISOString()
      }
      
      const existingReports = JSON.parse(localStorage.getItem('userHazardReports') || '[]')
      existingReports.push(userReport)
      localStorage.setItem('userHazardReports', JSON.stringify(existingReports))

      router.push("/dashboard?success=report-submitted")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to submit report")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.hazard_type &&
    formData.severity &&
    formData.latitude !== 0 &&
    formData.longitude !== 0

  return (
    <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-accent" />
          {t('report.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                {t('report.title')} *
              </Label>
              <Input
                id="title"
                placeholder={t('report.title')}
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="h-11"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hazard_type" className="text-sm font-medium">
                  {t('report.type')} *
                </Label>
                <Select
                  value={formData.hazard_type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, hazard_type: value }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder={t('report.type')} />
                  </SelectTrigger>
                  <SelectContent>
                    {HAZARD_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity" className="text-sm font-medium">
                  Severity Level *
                </Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEVERITY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                {t('report.description')} *
              </Label>
              <Textarea
                id="description"
                placeholder={t('report.description')}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="min-h-[120px] resize-none"
                required
              />
            </div>
          </div>

          {/* Location Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t('report.location')} *
            </Label>
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {formData.location_name && (
              <p className="text-sm text-muted-foreground">Selected: {formData.location_name}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photo Evidence (Optional)
            </Label>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                t('common.loading')
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t('report.submit')}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
