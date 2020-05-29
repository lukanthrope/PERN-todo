import React, { lazy, Suspense } from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './components/Header';
import Addtodo from './components/Addtodo';
const TodoList = lazy(() => import('./components/TodoList'));

function App() {
  return (
    <div className="App">
      <Header />
      <Addtodo />
      <Suspense fallback={<CircularProgress />}>
        <TodoList />
      </Suspense>
    </div>
  );
}

export default App;
