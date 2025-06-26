"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, X, Download, Send, FileText, ImageIcon, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"

interface UploadedImage {
  id: string
  file: File
  preview: string
}

interface LogEntry {
  id: string
  message: string
  timestamp: Date
  type: "info" | "success" | "error"
}

export default function Dashboard() {
  const [prompt, setPrompt] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadReady, setDownloadReady] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addLog = (message: string, type: "info" | "success" | "error" = "info") => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      type,
    }
    setLogs((prev) => [...prev, newLog])
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random(),
            file,
            preview: e.target?.result as string,
          }
          setImages((prev) => [...prev, newImage])
          addLog(`Image uploaded: ${file.name}`, "success")
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
    addLog("Image removed", "info")
  }

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      addLog("Please enter a prompt", "error")
      return
    }

    setIsProcessing(true)
    setDownloadReady(false)
    addLog("Starting processing...", "info")

    // Simulate processing
    setTimeout(() => {
      addLog("Analyzing prompt...", "info")
    }, 1000)

    setTimeout(() => {
      addLog("Processing images...", "info")
    }, 2000)

    setTimeout(() => {
      addLog("Generating document...", "info")
    }, 3500)

    setTimeout(() => {
      addLog("Processing completed successfully!", "success")
      setIsProcessing(false)
      setDownloadReady(true)
    }, 5000)
  }

  const handleDownload = () => {
    addLog("Download initiated", "success")
    // Simulate download
    const link = document.createElement("a")
    link.href = "#"
    link.download = "processed-document.pdf"
    link.click()
  }

  return (
    <div className="max-h-screen  bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 max-h-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-slate-900">
              Générateur de demande de brevet
            </h1>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Hero Section */}
          {/* <div className="text-center space-y-2 py-4">
            <p className="text-slate-600 text-lg">Transform your ideas and images into professional documents</p>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Input Section */}
            <div className="hidden md:block bg-background/75 p-4 rounded-lg space-y-6 max-h-[calc(100vh-100px)] overflow-auto scrollbar-[3px] scrollbar-thumb-gray-400 scrollbar-track-transparent">
              {/* Prompt Input */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-600" />
                    Enter Your Prompt
                  </CardTitle>
                  <CardDescription>Describe what you want to create or process</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your detailed prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 resize-none border-slate-200 focus:border-slate-400"
                  />
                </CardContent>
              </Card>

              {/* Image Upload Section */}
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-slate-600" />
                    Upload Images
                  </CardTitle>
                  <CardDescription>Upload multiple images to include in your document</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Click to upload images</p>
                    <p className="text-sm text-slate-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                            <Image
                              src={image.preview || "/placeholder.svg"}
                              alt="Preview"
                              width={150}
                              height={150}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <p className="text-xs text-slate-500 mt-1 truncate">{image.file.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card className="shadow-sm border-slate-200">
                <CardContent className="pt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing || !prompt.trim()}
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit & Process
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Output & Status */}
            <div className="space-y-6 max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] overflow-hidden">
              {/* Document Preview */}
              <Card className="shadow-sm border-slate-200 h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">Document Preview</CardTitle>
                    <CardDescription>Generated document will appear here</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownload}
                    disabled={!downloadReady}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="border rounded-lg p-6 bg-white h-full overflow-y-auto">
                    {downloadReady ? (
                      <div className="space-y-4 max-h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                        {/* Preview */}
                        <p>
                          Live preview
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent text-slate-400">
                        <div className="text-center">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Document preview will appear here</p>
                          <p className="text-sm mt-1">Submit your prompt to generate</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status Panel */}
              {/* <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Prompt</span>
                    <Badge variant={prompt.trim() ? "default" : "secondary"}>{prompt.trim() ? "Ready" : "Empty"}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Images</span>
                    <Badge variant={images.length > 0 ? "default" : "secondary"}>{images.length} uploaded</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Processing</span>
                    <Badge variant={isProcessing ? "default" : downloadReady ? "default" : "secondary"}>
                      {isProcessing ? "In Progress" : downloadReady ? "Complete" : "Waiting"}
                    </Badge>
                  </div>
                </CardContent>
              </Card> */}

              {/* Activity Log */}
              {/* <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Activity Log</CardTitle>
                  <CardDescription>Real-time processing updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {logs.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-4">No activity yet</p>
                      ) : (
                        logs.map((log) => (
                          <div key={log.id} className="text-sm p-2 rounded border-l-2 border-l-slate-300">
                            <div className="flex items-center justify-between">
                              <span
                                className={`${
                                  log.type === "success"
                                    ? "text-green-600"
                                    : log.type === "error"
                                      ? "text-red-600"
                                      : "text-slate-600"
                                }`}
                              >
                                {log.message}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{log.timestamp.toLocaleTimeString()}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
