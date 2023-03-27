import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from './actions/jobActions';
import ItemAdder from './components/ItemAdder';
import Title from './components/Title';
import Item from './components/Item';
import Loader from './components/Loader';
import Modal from './components/Modal';
import './App.css';
function App() {
  const dispatch = useDispatch();
  const jobsListState = useSelector((state) => state.jobsList);
  const { jobList, isLoading } = jobsListState;

  const [modal, setModal] = useState(false);

  const isModalOpenHandler = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} color='#ffffff' />}
      {modal && <Modal isModalOpenHandler={isModalOpenHandler} />}
      <main className='flex flex-col text-center mx-auto'>
        <Title />
        {jobList.map((job, index) => (
          <Item job={job} index={index} />
        ))}
        <ItemAdder isModalOpenHandler={isModalOpenHandler} />
      </main>
    </div>
  );
}

export default App;
