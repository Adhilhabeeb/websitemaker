import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
    </div>
  )
}
