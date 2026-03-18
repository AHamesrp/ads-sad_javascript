import React from "react";
import { Car } from 'lucide-react'

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`loader ${sizes[size]} ${className}`}></div>
  )
}

export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center animate-pulse">
            <Car className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary-500 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
        <p className="text-slate-500 font-medium">Carregando...</p>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft animate-pulse">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-slate-200"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="h-3 bg-slate-200 rounded w-5/6"></div>
      </div>
    </div>
  )
}

export function LoadingRideCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-soft animate-pulse">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <div className="w-0.5 h-12 bg-slate-200"></div>
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-24"></div>
          </div>
          <div>
            <div className="h-4 bg-slate-200 rounded w-28 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-20"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="h-6 bg-slate-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-12"></div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div>
            <div className="h-4 bg-slate-200 rounded w-24 mb-1"></div>
            <div className="h-3 bg-slate-200 rounded w-16"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200"></div>
          <div className="w-8 h-8 rounded-lg bg-slate-200"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
