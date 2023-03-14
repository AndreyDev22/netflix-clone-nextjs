import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Bilboard from '../components/Bilboard';
import InfoModal from '../components/InfoModal';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import useFavorites from '../hooks/useFovorites';
import useInfoModal from '../hooks/useInfoModal';
import useMovieList from '../hooks/useMovieList';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Bilboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default Home;
