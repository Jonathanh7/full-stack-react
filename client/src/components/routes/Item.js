import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Layout from '../shared/Layout';

function Item(props) {
  const [item, setItem] = useState([])
  const [deleted, setDeleted] = useState(false)
  let navigate = useNavigate()
  const { id } = useParams();
  console.log('params',id)

 

  useEffect(() => {
 const fetchData = async () => {
    try {
      const response = await axios(`http://localhost:3000/api/items/${id}`)
      console.log(response.data,'response')
      setItem(response.data)

    } catch (error) {
      console.error(error)
    }
  }

    fetchData()
  }, [])

  const destroy = () => {
    axios({
      url: `http://localhost:3000/api/items/${id}`,
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
}}, [deleted, navigate])
  
console.log(item, 'item')
return (
  <Layout>
    <h4>{item.title}</h4>
    <p>Link: {item.link}</p>
    <button onClick={() => destroy()}>Delete Item</button>
    <NavLink to={`/items/${id}/edit`}>
      <button>Edit</button>
    </NavLink>
    <NavLink to="/items">Back to all items</NavLink>
  </Layout>
)
}

export default Item