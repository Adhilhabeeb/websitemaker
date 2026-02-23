import { useUser } from "@clerk/clerk-react"
import { useContext, useEffect, useState, useTransition } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Link } from "react-router"
import { NavContext, type Contextapptype } from "./App"
import { insertDataSupabasefromnmap } from "./lib/Supabaseopertions"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "./lib/supabase"

function Dashboard() {
 const [isPending, startTransition] = useTransition();
  let context=useContext<Contextapptype |undefined>(NavContext )

  if (!context) {
    throw new Error("contecxtnot fund ");
    
  }
  // let {mobMapRef,mobileoldmapstoreing,lapMapRef,historytmapref}=context
  // console.log(mobMapRef,mobileoldmapstoreing,lapMapRef,historytmapref,mapreffff)
  const { user, isLoaded, isSignedIn } = useUser()

  const [projects, setProjects] = useState <any[]>([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false)

  if (!isLoaded) return <div className="p-8">Loading...</div>
  if (!isSignedIn) return <div className="p-8">Not signed in</div>;
const { data, isLoading } = useQuery({
  queryKey: ["projects", user.primaryEmailAddress?.emailAddress],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("websitemaker")
      .select("*")
      .eq("email", user.primaryEmailAddress?.emailAddress)

    if (error) throw error
    return data
  },
  enabled: !!user.primaryEmailAddress?.emailAddress,
  retry: 3,
select: (data) => {
  return data.map(el => {
    const obn = Object.entries(el).map(([name, value]) => {

       

      try {
         const parsedValue = JSON.parse(value as string)
          if (Array.isArray(parsedValue)) {
          return [name, parsedValue]
        }
      
      } catch (error) {
        
      }

      return [name, value]
    })

    return Object.fromEntries(obn)
  })
}
})

useEffect(() => {
 if (data) {
  setProjects(data)
 }
}, [data])

  
console.log(data,"isa datyata")
  const handleCreateProject = async () => {

    if (!name.trim()) return

startTransition(async () => {
  let email=user.primaryEmailAddress?.emailAddress as string
  console.log(email,"is suer email")
        await  insertDataSupabasefromnmap(name,description,email)

    setProjects([...projects, { name, description }])
    setName("")
    setDescription("")
    setOpen(false)
        });

  }

  return (
    <div className="min-h-screen bg-background">

      {/* Top Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          
          {/* Left */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user.firstName}
            </p>
          </div>

          {/* Right - User */}
          <div className="flex items-center gap-3 bg-muted px-4 py-2 rounded-full">
            <img
              src={user.imageUrl}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">

        <h2 className="text-lg font-semibold mb-6 text-foreground">
          Projects
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* Existing Projects */}
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="rounded-2xl hover:shadow-lg group transition relative cursor-pointer"
            >
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-lg">
                  {project.projectname}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link  to={`/project/${project.projectname}`}>
                
                
                
                <Button
    size="sm" 
    className="absolute bottom-4 right-4 
               opacity-0 translate-y-2
               group-hover:opacity-100 
               group-hover:translate-y-0
               transition-all duration-200"
  >
    Open
  </Button>
  </Link>
              </CardFooter>
            </Card>
          ))}

          {/* Create Project Card */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Card className="border-dashed border-2 rounded-2xl flex items-center justify-center hover:bg-muted/50 transition cursor-pointer">
                <CardContent className="p-8 text-center">
                  <Plus className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    Create New Project
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <Input
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  placeholder="Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
