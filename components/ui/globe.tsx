"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { cn } from "@/lib/utils"

interface EarthProps {
  className?: string
  theta?: number
  dark?: number
  scale?: number
  diffuse?: number
  mapSamples?: number
  mapBrightness?: number
  baseColor?: [number, number, number]
  markerColor?: [number, number, number]
  glowColor?: [number, number, number]
}

const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [1, 0, 0],
  glowColor = [0.2745, 0.5765, 0.898],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    try {
      if (!canvasRef.current) return

      let width = 0
      const onResize = () => {
        if (canvasRef.current) {
          width = canvasRef.current.offsetWidth
        }
      }

      window.addEventListener("resize", onResize)
      onResize()
      let phi = 0

      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: theta,
        dark: dark,
        scale: scale,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: baseColor,
        markerColor: markerColor,
        glowColor: glowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state: Record<string, any>) => {
          state.phi = phi
          phi += 0.003
        },
      })

      return () => {
        try {
          globe.destroy()
        } catch (e) {
          console.error("[v0] Error destroying globe:", e)
        }
      }
    } catch (error) {
      console.error("[v0] Error creating globe:", error)
      setHasError(true)
    }
  }, [dark, baseColor, markerColor, glowColor])

  if (hasError) {
    return (
      <div className={cn("z-[10] mx-auto flex w-full max-w-[350px] items-center justify-center", className)}>
        <div className="w-full aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
          <span className="text-muted-foreground">Globe loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("z-[10] mx-auto flex w-full max-w-[350px] items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1",
        }}
      />
    </div>
  )
}

export default Earth
