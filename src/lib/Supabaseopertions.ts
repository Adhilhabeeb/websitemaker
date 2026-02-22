import { queryClient } from "@/utils/vierw"
import { supabase } from "./supabase"

  export const insertDataSupabasefromnmap = async (projectname:string,description:string,email:string,
    mobref=new Map(),
lapref=new Map(),
historytmapref=new Map(),
mobileoldmapref=new Map(),



) => {
    let mobData=Array.from(mobref)
     let lapData=Array.from(lapref)
      let histdata=Array.from(historytmapref)
       let mobileOld=Array.from(mobileoldmapref)
  const { data, error } = await supabase
    .from("websitemaker")
    .insert([
      {
        mobref: JSON.stringify(mobData),
        lapref: JSON.stringify(lapData),
        histrorymap: JSON.stringify(histdata),
        mobileoldmap: JSON.stringify(mobileOld),
        projectname: projectname,
        description,email
      }
    ])

  if (error) {
    console.log("Error:", error)
  } else {

      queryClient.invalidateQueries({ queryKey: ["projects"] })
    console.log("Inserted:", data)
  }
}