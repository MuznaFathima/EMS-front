// we use context api to share data between unrelated components. ie they are not parents or child. suppose here from add.js to home.js

// step 1: create a component for context

// step 2 wrap selector of  App.js inside selector of contextShare.js  in index.js page. now you can access contextShare in every components. because we know App.js is the main parent
// -------------------------
// step3: globally creates the context and assign to a variable. use createContext library for this. 
// step 4 passing the created context to children(consider add and home as children here) as object to contextShare
// step 5: if you want to share the context created you need to use state create state registerData. you  can update context by using this state
// step5:registerContext pass it into children. value also provided to children
// go to add.jsx. we need to use the created context registerContext in add.jsx for that use useContext hook
         



import React, { createContext, useState } from 'react'

export const registerContext=createContext()
function Contextshare({children}) {
    const[registerData,setregisterData]=useState(" ")
  return (
    <registerContext.Provider value={{registerData,setregisterData}} >
         {children}
    </registerContext.Provider>
  )
}

export default Contextshare