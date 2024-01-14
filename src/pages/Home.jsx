import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from '../components/Contextshare'
import Alert from 'react-bootstrap/Alert';
import { deleteUser, getUsers } from '../service/allapi'

function Home() {

  const[alluserData,setalluserData]=useState([])
  const{registerData,setregisterData}=useContext(registerContext)
  const[search,setSearch]=useState("")
console.log(search);
  // for spinner

  const [showspin, setshowSpin] = useState(true)
  useEffect(() => {

    getAllEmployees()
    setTimeout(() => {
      setshowSpin(false)
    }, 2000)
  }, [search])

  // api call for get all employees
  const getAllEmployees=async()=>{
    const response=await getUsers(search)
    console.log(response);
    if(response.status==200){
      setalluserData(response.data)
    }
    else{
      alert("cannot fetch data")
    }
  }
console.log(alluserData);

// delete Employee
const removeUser=async(id)=>{
  const response=await deleteUser(id)

  if(response.status===200){
    getAllEmployees()
    
   
  }
  else{
    console.log("error",response.data);   alert("opertaion failed!!! please try after sometime")
  }
}

  return (

    <>

    {/* {   
      registerData&&<Alert variant='success' onClose={()=>setregisterData("")} dismissible>
      {registerData.fname.toUpperCase()} registered successfully........
      </Alert>
    } */}

{registerData && registerData.fname && (
  <Alert variant='success' onClose={()=>setregisterData("")} dismissible>
    {registerData.fname.toUpperCase()} registered successfully........
  </Alert>
)}
      {
        showspin ?

          <LoadingSpinner /> :
          <div className='container'>
            <div className='search d-flex align-items-center mt-4'>

              <span>Search:</span>
              <input onChange={e=>setSearch(e.target.value)} type="text" placeholder='Search by Employee Name' className='form-control ms-2' style={{ width: "400px" }} />

              <Link to={'/add'} className='btn btn-primary ms-auto'>
                <i class="fa-solid fa-user-plus">Add</i>

              </Link>
            </div>


            <div className='table mt-5'>
              <h1 className='fw-bolder'>List Of All Employees</h1>
            </div>
            <Hometable displayData={alluserData} removeUser={removeUser}/>
          </div>
      }
    </>
  )
}

export default Home