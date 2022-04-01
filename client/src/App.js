import { useLocation, Route, Routes  } from 'react-router-dom';
import Items from './components/routes/Items'
import Item from './components/routes/Item'
import ItemEdit from './components/routes/ItemEdit'
import ItemCreate from './components/routes/ItemCreate'
import Home from './components/routes/Home'
import './App.css';

function App(props) {
  return (
    <div className="App">
      <h3>{props.location.state ? props.location.state.msg : null}</h3>
      <Routes>
    <Route  path='/' element={<Home />} />
    <Route  path='/items' element={<Items />} />
    <Route  path='/create-item' element={<ItemCreate />} />
    <Route  path='/items/:id' element={<Item />} />
    <Route  path='/items/:id/edit' element={<ItemEdit />} />
</Routes>
    </div>
  );
}

function withRouter(Child) {
  return function withRouter(props) {
    const location = useLocation

    return <Child {...props} location={location}  />
  }
}

export default withRouter(App);
