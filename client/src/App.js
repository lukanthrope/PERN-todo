import React, { lazy, Suspense } from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './components/Header';
import Addtodo from './components/Addtodo';
const TodoList = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./components/TodoList')), 500)));

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
