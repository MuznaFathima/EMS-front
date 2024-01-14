import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../service/allapi';
import { registerContext } from '../components/Contextshare';
import { useNavigate } from 'react-router-dom';


function Add() {

const{registerData,setregisterData}=useContext(registerContext)

const navigate=useNavigate()


// states to hold normal inputs
  const[normalInput,setnormalInput]=useState({
    fname:" ",
    lname:" ",
    email:" ",
    mobile:" ",
    gender:" ",
    location:" "
  })

  // to hold status  

  const [status,setStatus]=useState(" ")
  // to hold file uploading content

    const[profile,setProfile]=useState("")

  const[preview,setpreview]=useState("")

  useEffect(()=>{

    if(profile){
      URL.createObjectURL(profile)
      setpreview(URL.createObjectURL(profile))
    }
  },[profile])


  // to hold file uploading content



  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  
  ];
  // to get normal input from textbox
  const getandsetInput=(e)=>{
  const{name,value}=e.target
  // rest operator
 setnormalInput({...normalInput,[name]:value})

  }
  console.log(normalInput);
// to get status

  console.log(status);
// to get profile
const getandsetProfile=(e)=>{
  console.log(e.target.files[0]);
  setProfile(e.target.files[0])
}
console.log(profile);


const handleSubmit=async(e)=>{
  e.preventDefault()
  const{fname,
  lname,
  email,
  mobile,
  gender,
  location}=normalInput

  if(!fname || !lname ||!email ||!mobile ||!gender ||!location  ||!status 
    ||!profile){
toast.warning("please fill the form completely")
    }
    else{
      // toast.success("form filled")
      // if form has uploading content init and it needs to be stored in backend use class FormData() to convert data into form data
      const data=new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("location",location)
      data.append("status",status)
      data.append("profile",profile)

      const headers={
        "content-type":"multipart/form-data"
      }
      // make api call

     const result= await addUser(data,headers)
     console.log(result);
     if(result.status===200){
      // to make states empty
      setnormalInput({...normalInput,
        fname:" ",
        lname:" ",
        email:" ",
        mobile:" ",
        gender:" ",
        location:" "
      })

      setStatus("")
      setProfile("")
      setregisterData(result.data)
      navigate('/')

     }else{
      toast.error("request failed")
     }
    }
}
  return (

    <>
      <div className='container'>
        <h1 className='text-center Fw-bolder'>Add new Employee Details</h1>
        <div className='shadow-border rounded p-2 mt-3'>
           <div className='text-center'>
            <img style={{width:"70px", height:"70px"}} src={preview?preview:"https://www.nicepng.com/png/detail/144-1446162_pin-businessman-clipart-png-flat-user-icon.png"}  />
           </div>
  
           <Form className="mt-3">
            <Row >
  
              {/* first name */}
  <FloatingLabel controlId="floatingInputfname" label="firstname" className='mb-3 col-lg-6'>
          <Form.Control type="text" value={normalInput.value} placeholder="firstname" name='fname' onChange={e=>getandsetInput(e)}/>
        </FloatingLabel>
  
  
              {/* last name */}
  <FloatingLabel controlId="floatingInputlname" label="lastname" className='mb-3 col-lg-6'>
          <Form.Control type="text" value={normalInput.value} placeholder="lastname"  name='lname' onChange={e=>getandsetInput(e)}/>
        </FloatingLabel>
  
              {/* Email*/}
  <FloatingLabel controlId="floatingInputemail" label="e-mail" className='mb-3 col-lg-6'>
          <Form.Control type="email" value={normalInput.value} placeholder="e-mail" name='email' onChange={e=>getandsetInput(e)} />
        </FloatingLabel>
  
              {/* mobile number */}
  <FloatingLabel controlId="floatingInputmobile" label="mobile" className='mb-3 col-lg-6'>
          <Form.Control type="text" value={normalInput.value} placeholder="mobile"  name='mobile' onChange={e=>getandsetInput(e)}/>
        </FloatingLabel>
  
        {/* gender */}
  
        <Form.Group className='mb-3 col-lg-6'>
     <Form.Label>Select Gender</Form.Label>
     <Form.Check
             type={"radio"}
             value={"male"}
             label={"male"}
             name={"gender"}
             onChange={e=>getandsetInput(e)}
            
            />
     <Form.Check
             type={"radio"}
             value={"female"}
             label={"female"}
             name={"gender"}
             onChange={e=>getandsetInput(e)}
          
            />
            
  
  
        </Form.Group>
  
  
  {/* status */}
        <Form.Group className='mb-3 col-lg-6'>
     <Form.Label>Select Employee status</Form.Label>
    
     <Select  options={options}
         onChange={e=>setStatus(e.value)}/>
  
  
        </Form.Group>
  
        {/* photo upload */}
        <Form.Group className='mb-3 col-lg-6'>
     <Form.Label>choose a profile picture</Form.Label>
    
     
     <Form.Control type="file" onChange={e=>getandsetProfile(e)} name='user_profile' />
  
        </Form.Group>
  
  
  {/* location */}
  
  {/* last name */}
  <FloatingLabel controlId="floatingInputlocation" label="location" className='mb-3 col-lg-6 mt-5'>
          <Form.Control type="text" value={normalInput.value} placeholder="location" name='location' onChange={e=>getandsetInput(e)}/>
        </FloatingLabel>
  
    <Button type='submit' variant='primary' onClick={e=>handleSubmit(e)}>submit</Button>
  
            </Row>
  
           </Form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Add



