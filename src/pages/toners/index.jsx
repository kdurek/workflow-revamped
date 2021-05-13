import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import {useRouter} from 'next/router';
import axios from 'axios';
import classNames from 'classnames';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import getTonerColor from '@/modules/printers/utils/getTonerColor';
import useToners from '@/modules/reactQuery/queries/useToners';

const TonerItem = ({toner}) => {
  const router = useRouter();

  const handleTonerClick = () => {
    router.push(`/toners/${toner._id}`);
  };

  return (
    <button type="button" onClick={handleTonerClick}>
      <div
        className={classNames(
          'flex hover:bg-blue-200 transition items-center justify-between shadow h-16 bg-gray-100 rounded-xl overflow-hidden'
        )}
      >
        <span className="px-4 text-2xl font-medium">{toner.code}</span>
        <div
          className={`w-16 h-16 p-1 flex items-center justify-center ${getTonerColor(toner.color)}`}
        >
          <span className="text-2xl font-medium">{toner.amount}</span>
        </div>
      </div>
    </button>
  );
};

TonerItem.propTypes = {
  toner: PropTypes.shape({
    _id: PropTypes.string,
    amount: PropTypes.number,
    code: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

const TonersList = () => {
  const {data: tonersList} = useToners();

  return (
    <DefaultLayout>
      <Head>
        <title>Toners</title>
      </Head>
      <Card className="flex flex-col gap-4 p-4">
        {tonersList.map(toner => (
          <TonerItem key={toner._id} toner={toner} />
        ))}
      </Card>
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/printers',
        permanent: false,
      },
    };
  }

  const getToners = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners`, {
      headers: {
        Authorization: `bearer ${session.accessToken}`,
      },
    });
    return data.toners;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('toners', getToners);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default TonersList;
