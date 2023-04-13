import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../actions/jobActions';
import ItemAdder from '../components/ItemAdder';
import Title from '../components/Title';
import Item from '../components/Item';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const jobsListState = useSelector((state) => state.jobsList);
  const { jobList, isLoading } = jobsListState;

  const [modal, setModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: '',
    reducerSlice: '',
    itemIndex: 0,
  });

  const [verticalScrollPosition, setVerticalScrollPosition] = useState(0);

  // write a function that displays the Yoffset everytime the y position is changed
  const checkVerticalScroll = () => {
    const vScroll = window.scrollY;
    console.log(vScroll);
    setVerticalScrollPosition(vScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkVerticalScroll);

    return () => {
      window.removeEventListener('scroll', checkVerticalScroll);
    };
  }, []);

  const isModalOpenHandler = () => {
    setModal(!modal);
  };

  const setModalPropsHandler = (
    title = '',
    reducerSlice = '',
    itemIndex = 0
  ) => {
    setModalProps({ title, reducerSlice, itemIndex });
  };

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <div className='h-full w-full'>
      {isLoading && <Loader isLoading={isLoading} color='#ffffff' />}
      {modal && (
        <Modal
          title={modalProps.title}
          isModalOpenHandler={isModalOpenHandler}
          reducerSlice={modalProps.reducerSlice}
          itemIndex={modalProps.itemIndex}
        />
      )}
      <main className='flex flex-col text-center mx-auto'>
        <Title verticalScrollPosition={verticalScrollPosition} />
        {jobList.map((job, index) => (
          <Item
            job={job}
            index={index}
            isModalOpenHandler={isModalOpenHandler}
            setModalPropsHandler={setModalPropsHandler}
          />
        ))}
        <ItemAdder
          isModalOpenHandler={isModalOpenHandler}
          setModalPropsHandler={setModalPropsHandler}
        />
      </main>
    </div>
  );
};

export default HomeScreen;
