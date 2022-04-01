import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import ItemForm from "../shared/ItemForm";
import Layout from "../shared/Layout";

function ItemCreate(props) {
  const [item, setItem] = useState({
    title: '',
    link:''
  })
  const [createdItem, setCreatedItem] = useState(null)

  const navigate = useNavigate()
  
  const handleChange = async (event) => {
console.log(event)
    const updatedField = { [event.target.name]: event.target.value }

    const editedItem = Object.assign(item, updatedField)

    setItem(editedItem)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
        url: `http://localhost:3000/api/items`,
        method: 'POST',
        data: item
    })
        .then(res => setCreatedItem(res.data.item))
        .catch(console.error)
}
  useEffect(() => {
    if (createdItem) {
    return navigate(`/items`)
  }
}, [createdItem, navigate])

  
  return (
    <Layout>
    <ItemForm
        item={item}
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleSubmit(e)}
        cancelPath="/"
    />
</Layout>
  )
}

export default ItemCreate