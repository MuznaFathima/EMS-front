import { BASE_URL } from "./Baseurl";
import { commonApi } from "./commonApi";



// add employee

export const addUser= (body,header)=>{
   return  commonApi("POST",`${BASE_URL}/add`,body,header)
}

// get employee

export const getUsers=async(search)=>{
   return commonApi("GET",`${BASE_URL}/get/allusers?search=${search}`,"")
}

// delete employee

export const deleteUser=async(id)=>{
   return await commonApi("DELETE",`${BASE_URL}/delete/user/${id}`,{})
}

// edit  employee

export const editUser=async(id,body,header)=>{
return await commonApi("PUT",`${BASE_URL}/edit/user/${id}`,body,header)
}
// to pass data from front end through url we use queryparameter
// if url have a ? its a query parameter and something is sent from front end backend

