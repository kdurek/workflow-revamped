import {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useSession} from 'next-auth/client';

import printerService from '../src/services/printerService';
import tonerService from '../src/services/tonerService';

import DefaultLayout from '@/layouts/DefaultLayout';
import Printers from '@/components/Printers';

const PrintersPage = () => {
  const [session, loading] = useSession();

  const [printersList, setPrintersList] = useState([]);
  const [uncategorizedToners, setUncategorizedToners] = useState([]);

  useEffect(() => {
    if (session) {
      retrievePrintersList();
      retrieveUncategorizedTonersList();
    }
  }, [session]);

  const retrievePrintersList = async () => {
    try {
      const {data} = await printerService.getAll();
      setPrintersList(data.printers);
    } catch (err) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
    }
  };

  const refreshPrintersList = () => {
    retrievePrintersList();
  };

  const retrieveUncategorizedTonersList = async () => {
    try {
      const {data} = await tonerService.getAllUncategorized();
      setUncategorizedToners(data.toners);
    } catch (err) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
    }
  };

  const refreshUncategorizedTonersList = () => {
    retrieveUncategorizedTonersList();
  };

  const updatePrinter = async (printerId, editObject) => {
    try {
      await printerService.update(printerId, editObject);
      refreshPrintersList();
      refreshUncategorizedTonersList();
    } catch (err) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
    }
  };

  const useToner = async toner => {
    try {
      await tonerService.update(toner._id, {
        amount: toner.amount - 1,
      });
      refreshPrintersList();
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
      <Printers
        updatePrinter={updatePrinter}
        useToner={useToner}
        printersList={printersList}
        uncategorizedToners={uncategorizedToners}
      />
    </DefaultLayout>
  );
};

export default PrintersPage;
