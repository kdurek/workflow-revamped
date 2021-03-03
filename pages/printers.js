import {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useSession} from 'next-auth/client';
import axios from 'axios';

import DefaultLayout from '@/layouts/DefaultLayout';
import Printers from '@/components/Printers';

const PrintersPage = () => {
  const [session, loading] = useSession();

  const [printersList, setPrintersList] = useState([]);

  useEffect(async () => {
    if (session) {
      try {
        const {data} = await axios.get(`printers`);
        setPrintersList(data.printers);
      } catch (err) {
        const errorMessage = err.response.data.message;
        console.log(errorMessage);
      }
    }
  }, [session]);

  const onUse = async tonerToUse => {
    try {
      const updatedToner = await axios.patch(`toners/${tonerToUse._id}`, {
        amount: tonerToUse.amount - 1,
      });

      setPrintersList(
        printersList.map(printer => {
          const newToners = printer.toners.map(toner =>
            toner._id === tonerToUse._id ? updatedToner.data.toner : toner
          );
          printer.toners = newToners;
          return printer;
        })
      );
    } catch (err) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
    }
  };

  if (loading) {
    return null;
  }

  if (!session) {
    return (
      <div>
        You must first sign in to access this page.
        <Link href={'/login'}>Login</Link>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Printers</title>
      </Head>
      <Printers onUse={onUse} printersList={printersList} />
    </DefaultLayout>
  );
};

export default PrintersPage;
