"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Crosshair, Search } from "lucide-react"

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, locationName: string) => void
}

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
    name: string
  } | null>(null)

  const getCurrentLocation = () => {
    setIsGettingLocation(true)

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.")
      setIsGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        // NavIC provides enhanced accuracy for Indian region
        const locationName = `NavIC Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`

        setSelectedLocation({ lat, lng, name: locationName })
        onLocationSelect(lat, lng, locationName)
        setIsGettingLocation(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        alert("Unable to get your location. Please enter it manually.")
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const searchLocation = async () => {
    if (!searchQuery.trim()) return

    // Indian coastal locations with NavIC coverage
    const mockLocations = [
      { name: "Mumbai Coast, Maharashtra", lat: 19.0760, lng: 72.8777 },
      { name: "Chennai Marina, Tamil Nadu", lat: 13.0827, lng: 80.2707 },
      { name: "Goa Beaches, Goa", lat: 15.2993, lng: 74.1240 },
      { name: "Kochi Coast, Kerala", lat: 9.9312, lng: 76.2673 },
      { name: "Visakhapatnam Beach, Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
      { name: "Puri Beach, Odisha", lat: 19.8135, lng: 85.8312 },
    ]

    const found = mockLocations.find((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (found) {
      setSelectedLocation(found)
      onLocationSelect(found.lat, found.lng, found.name)
    } else {
      alert("Location not found. Please try a different search term or use current location.")
    }
  }

  return (
    <div className="space-y-4">
      {/* Current Location Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 bg-transparent"
        onClick={getCurrentLocation}
        disabled={isGettingLocation}
      >
        <Crosshair className="h-4 w-4 mr-2" />
        {isGettingLocation ? "Getting location..." : "Use Current Location"}
      </Button>

      {/* Search Location */}
      <div className="flex gap-2">
        <Input
          placeholder="Search for a location (e.g., Mumbai Coast, Maharashtra)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11"
          onKeyPress={(e) => e.key === "Enter" && searchLocation()}
        />
        <Button type="button" variant="outline" onClick={searchLocation} className="h-11 px-3 bg-transparent">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium text-sm">{selectedLocation.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Location Suggestions */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Mumbai Coast", lat: 19.0760, lng: 72.8777 },
          { name: "Chennai Marina", lat: 13.0827, lng: 80.2707 },
          { name: "Goa Beaches", lat: 15.2993, lng: 74.1240 },
          { name: "Kochi Coast", lat: 9.9312, lng: 76.2673 },
        ].map((location) => (
          <Button
            key={location.name}
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={() => {
              setSelectedLocation(location)
              onLocationSelect(location.lat, location.lng, location.name)
            }}
          >
            {location.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
