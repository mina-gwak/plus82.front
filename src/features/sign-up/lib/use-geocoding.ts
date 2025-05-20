import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useRef } from 'react'

export const useGeocoding = () => {
  const lib = useMapsLibrary('geocoding')
  const geocoder = useRef<google.maps.Geocoder | null>(null)

  useEffect(() => {
    if (lib) {
      geocoder.current = new lib.Geocoder()
    }
  }, [lib])

  const geocode = async (
    address: string,
    callback: (result: { lat: number; lng: number }) => void,
  ) => {
    if (!geocoder.current) return null

    await geocoder.current.geocode({ address }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const { location } = results[0].geometry

        callback({
          lat: location.lat(),
          lng: location.lng(),
        })
      }
    })
  }

  return { geocode }
}
