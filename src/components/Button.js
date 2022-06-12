import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/user'
import axios from 'axios'

function Button() {
  const [users, setUsers] = React.useState([])
  const [single, setSingle] = React.useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://reqres.in/api/users')
      setUsers(response.data)
      dispatch(setUser(response.data))
    }
    fetchData()
  }, [dispatch])

  const handleThis = (id) => {
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => {
      setSingle(res.data)
    })
    if (single.data !== undefined) {
      const popup = document.getElementById('popup-box')
      popup.style.display = 'block'
      const name = document.getElementById('name')
      name.innerText = `${single.data.first_name} ${single.data.last_name}`
      const email = document.getElementById('email')
      email.innerText = `${single.data.email}`
    }
  }

  return (
    <>
      <span>
        <h1>Double Tap</h1>
        <h3> on any button to get user Information</h3>
      </span>

      <div
        style={{
          width: '100vw',
          height: '80vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {users.data !== undefined
          ? users.data.map((user) => (
              <div key={user.id}>
                <button
                  style={{
                    height: '70px',
                    width: '70px',
                    backgroundColor: '#6fbfbf',
                    margin: '10px',
                    borderRadius: '10%',
                  }}
                  onClick={() => {
                    handleThis(user.id)
                  }}
                >
                  <h1>{user.id}</h1>
                </button>
              </div>
            ))
          : null}
      </div>

      <div
        id='popup-box'
        style={{
          display: 'none',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#f1f1f1',
          padding: '30px',
          borderRadius: '10px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <h2>Name:</h2>
          <h2 id='name'>Name</h2>
        </div>
        <div style={{ display: 'flex' }}>
          <h3>Email:</h3>
          <h3 id='email'>Email</h3>
        </div>
      </div>
    </>
  )
}

export default Button
