import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import AddFeedback from '../AddFeedback/AddFeedback';
import Details from '../Details/Details';
import { ProductAction } from '../../store/ProductSlice';

import Home from '../home/Home';
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(ProductAction.initialLoad());
    dispatch(ProductAction.loadData());
  }, [dispatch]);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/new">
          <AddFeedback />
        </Route>
        <Route path="/feedback/:id">
          <Details />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
