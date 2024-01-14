import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getUsers } from '../service/allapi'
import { BASE_URL } from '../service/Baseurl'
// useParams for getting id from url path parameter
// queryparameter is to share data from front end to backend through url
function View() {


  const [user, setUser] = useState({})
  const { id } = useParams()
  console.log(id);
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    // when you do api call its response will be in key named data
    const { data } = await getUsers("")
    console.log(data);
    //  to check if params id is present in mongoDB ids
    setUser(data.find(item => item._id === id));

  }

  return (
    <div className='container' style={{ height: '80vh' }}>
      {

        user ?
          <Card className='shadow ms-auto mt-5 p-3'>

            <div className='image text-center'>
              <img style={{ width: "70px", height: "70px" }} src={`${BASE_URL}/uploads/${user.profile}`} alt="no image" />
            </div>
            <div className='text-center'>
              <h3>
                {user.fname} {user.lname}
              </h3>
              <h3>Eamil:{user.email}</h3>
              <h4>Mobile:{user.mobile}</h4>
              <h3>Gender:{user.gender}</h3>
              <h3>Status:{user.status}</h3>
              <h3>Location:{user.location}</h3>

            </div>

          </Card> : ""

      }


    </div>
  )
}

export default View