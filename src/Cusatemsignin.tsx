import { useState, type FormEvent } from "react";
import { SignIn, useSignIn } from "@clerk/clerk-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import React from 'react'

function Cusatemsignin() {
  return (
   <div className='flex justify-center  pt-30 h-screen'>

        <SignIn  routing="virtual"
  fallbackRedirectUrl="/"/>
    </div>
  )
}

export default Cusatemsignin