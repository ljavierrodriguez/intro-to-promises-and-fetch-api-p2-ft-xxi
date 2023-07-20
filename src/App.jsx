import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'

const App = () => {

  const [apiURL] = useState("http://localhost:3001")
  const [users, setUsers] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    listUsers(`${apiURL}/users`)
  }, [])

  const listUsers = (
    url,
    options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }) => {
    fetch(url, options)
      .then((response) => {
        //console.log(response);

        return response.json()
      })
      .then((responseJson) => {
        //console.log(responseJson);
        setUsers(responseJson)
      })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      name
    }

    const url = `${apiURL}/users`
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    createUser(url, options)
  }

  const createUser = (url, options) => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.id) {
          listUsers(`${apiURL}/users`)
          /* setUsers((prevUsers) => {
            return [...prevUsers, responseJson]
          }) */
          setName("");
        }
      })
  }

  const handleDelete = id => {
    //const url = 'http://localhost:3001/users/' + id;
    const url = `${apiURL}/users/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    deleteUser(url, options);
  }

  const deleteUser = (url, options) => {
    fetch(url, options)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        //console.log(responseJson);
        listUsers(`${apiURL}/users`);
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 py-4">
          <h3>Create User</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Insert Name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
              <button className="btn btn-primary">Create</button>
            </div>

          </form>
        </div>
        <div className="col-md-6 py-4">
          <h3>Users List ({users?.length || 0})</h3>
          <ul className="list-group">
            {
              !!users &&
              users.length > 0 &&
              users.map((user) => {
                return (
                  <li key={user.id} className="list-group-item d-flex justify-content-between">
                    <span>{user.name}</span>
                    <span><MdDeleteForever size={24} onClick={() => handleDelete(user.id)} /></span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App