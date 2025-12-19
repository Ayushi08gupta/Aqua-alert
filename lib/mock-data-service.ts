export class MockDataService {
  private static baseData = {
    incois: {
      "source": "INCOIS_SIMULATION",
      "generated_at": new Date().toISOString(),
      "region": {
        "coast": "East Coast",
        "state": "Odisha", 
        "location": "Puri",
        "latitude": 19.8135,
        "longitude": 85.8312
      },
      "ocean_parameters": {
        "wave_height_m": 3.6,
        "swell_height_m": 4.2,
        "sea_surface_temperature_c": 28.9,
        "sea_level_anomaly_m": 0.82,
        "current_speed_mps": 1.4,
        "current_direction_deg": 135
      },
      "atmospheric_parameters": {
        "wind_speed_kmph": 48,
        "wind_direction_deg": 120,
        "air_pressure_hpa": 996,
        "rainfall_mm": 68
      },
      "tide_information": {
        "tide_phase": "High Tide",
        "tide_height_m": 2.1
      },
      "risk_flags": {
        "high_wave_warning": true,
        "storm_surge_risk": true,
        "coastal_flooding_risk": true
      }
    },
    crowd: {
      "total_reports_last_hour": 74,
      "verified_reports": 18,
      "critical_reports": 29,
      "geo_density_reports_per_km2": 12.4,
      "dominant_hazards": ["High Waves", "Coastal Flooding", "Strong Currents"]
    },
    social: {
      "platforms": ["Twitter", "YouTube"],
      "total_posts_last_hour": 520,
      "keyword_spike_percentage": 61,
      "top_keywords": ["high waves", "sea flooding", "danger near coast", "boats damaged"],
      "average_sentiment_score": -0.72,
      "panic_index": 0.81,
      "viral_posts_detected": true
    },
    severity: {
      "predicted_severity": "Critical",
      "risk_score": 82.6,
      "confidence": 0.87,
      "contributing_factors": [
        "Rapid increase in wave height",
        "High number of verified citizen reports", 
        "Strong panic sentiment on social media",
        "High tide combined with storm surge risk"
      ],
      "recommended_action": "Immediate coastal evacuation and marine activity suspension"
    }
  };

  static getRealtimeData() {
    const data = JSON.parse(JSON.stringify(this.baseData));
    
    // Add realistic variations
    data.incois.ocean_parameters.wave_height_m += (Math.random() - 0.5) * 0.4;
    data.incois.atmospheric_parameters.wind_speed_kmph += (Math.random() - 0.5) * 8;
    data.crowd.total_reports_last_hour += Math.floor((Math.random() - 0.5) * 10);
    data.social.total_posts_last_hour += Math.floor((Math.random() - 0.5) * 50);
    data.severity.risk_score += (Math.random() - 0.5) * 5;
    
    data.incois.generated_at = new Date().toISOString();
    
    return data;
  }
}