import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../shared/Layout'
import ItemForm from '../shared/ItemForm'

function ItemEdit(props) {
  const navigate = useNavigate()
  const [item, setItem] = useState({
    title: '',
    link: ''
  })
  const { updated, setUpdated } = useState(false)
  
 

  useEffect(() => {
   const fetchData = async () => {
    try {
      const response = await axios(`http://localhost:3000/api/items/${props.match.params.id}`)
      setItem(response.data)
  } catch (err) {
      console.error(err)
  }
   }
    fetchData();
  }, [props.match.params.id])
  
  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    
    const editedItem = Object.assign(item, updatedField)

    setItem(editedItem)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `http://localhost:3000/api/items/${props.match.params.id}`,
            method: 'PUT',
            data: item
    }).then(() => setUpdated(true)).catch(console.error)
  }
  useEffect(() => {
    if (updated) {
  return navigate(`/items/${props.match.params.id}`)
  }
})

  return (
    <Layout>
    <ItemForm
        item={item}
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleSubmit(e)}
        cancelPath={`/items/${props.match.params.id}`}
    />
</Layout>
  )
}

export default ItemEdit