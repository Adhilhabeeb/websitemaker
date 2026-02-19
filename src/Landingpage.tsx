import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, LayoutDashboard, Monitor, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br 
      from-background 
      via-background 
      to-blue-100/40 
      dark:to-blue-900/20
      transition-colors duration-500">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-40 grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground">
            Build Websites{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Visually.
            </span>
            <br className="hidden sm:block" />
            No Code Required.
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Drag. Drop. Design. Publish.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="rounded-2xl shadow-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl">
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md md:max-w-lg">
            <div className="bg-card text-card-foreground rounded-2xl shadow-2xl p-6 border">
              <div className="bg-gradient-to-r 
                from-blue-500 
                to-indigo-500 
                dark:from-blue-600 
                dark:to-indigo-700 
                rounded-xl h-40 flex items-center justify-center">
                <Laptop className="text-white" size={64} />
              </div>

              <div className="mt-6 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[{
          icon: LayoutDashboard,
          title: "Drag & Drop Builder",
          desc: "Easily create layouts visually without writing any code."
        },
        {
          icon: Monitor,
          title: "Mobile & Desktop Design",
          desc: "Fully responsive designs optimized for every device."
        },
        {
          icon: Eye,
          title: "Real-Time Preview",
          desc: "See changes instantly as you design your website."
        }].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl shadow-md hover:shadow-2xl transition duration-300">
              <CardContent className="p-8 space-y-4">
                <feature.icon className="text-blue-600 dark:text-blue-400" size={40} />
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

    </div>
  )
}
