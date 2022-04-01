import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Layout from '../shared/Layout';

function Item(props) {
  const [item, setItem] = useState(null)
  const [deleted, setDeleted] = useState(false)
  let navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios(`http://localhost:3000/api/items/${props.match.params.id}`)
      setItem(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const destroy = () => {
    axios({
      url: `http://localhost:3000/api/items/${props.match.params.id}`,
      method: 'DELETE'
    }).then(() => setDeleted(true)).catch(console.error)
  }

  useEffect(() => {
    if (!item) {
    return <p>Loading...</p>
  }
  }, [item])
  
  useEffect(() => {
    if (deleted) {
  return navigate("/")
}}, [deleted])
  

return (
  <Layout>
    <h4>{item.title}</h4>
    <p>Link: {item.link}</p>
    <button onClick={() => destroy()}>Delete Item</button>
    <NavLink to={`/items/${props.match.params.id}/edit`}>
      <button>Edit</button>
    </NavLink>
    <NavLink to="/items">Back to all items</NavLink>
  </Layout>
)
}

export default Item