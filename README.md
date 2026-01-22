npm-run-al. packahe. is heped to. run all package in on ecaammad


//
when we done in the viteproj. 
we. need to install the eletron and. 

i. created the eletron folder insode the src and nake the   seprtte tsconfig insde the eltron flder . and 
excluded the folder electon on the tsconfig that given by the vite  /Users/adhilhabeebi/Downloads/eletronapp/tsconfig.app.json
  and also the outdir to   "outDir": "../../disteletron", 


in pcakge.json 
"transpile": " tsc --project src/eletron/tsconfig.json",   
tis is used to mak ethe run the tsconfig 


///. eletron builder running 

in pcakege.json
   "main": "./disteletron/main.js",(  ----- is getted after running npm run  transpile    we done in tscofig in lecero folder-----  )
   is used to.  know the electron builder whiv file is to run 

and set. eletron-builer.json 
{
    "appId":"com.nzemin",  // i lik a id for our app 
    "files":["disteletron","distreactele"],
    "icon":"./png.png",
    "mac":{
        "target":"dmg"
    },
    "linux":{
        "target":"AppImage",
        "category":"Utility"
    },
    "win":{
        "target":["portable","msi"]
    }

}
    
    when we. " run npx eletron ."


cross env  pacjakage used to  set env. in node acamamnd
is used to 
    "deve": " npm run  transpile && cross-env NODE_ENV=development electron .",