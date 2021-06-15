import {PDFViewer} from '@react-pdf/renderer';
import {useSession} from 'next-auth/client';
import {useState} from 'react';

import Input from '@/common/components/Input';
import ShippingDocument from '@/modules/templates/shipping/ShippingDocument';

const TemplateShipping = () => {
  const [session] = useSession();

  const [value, setValue] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div label="Details" className="space-y-4 lg:col-span-4">
        <Input label="Value" value={value} onChange={e => setValue(e.target.value)} />
        <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <Input label="Code" value={code} onChange={e => setCode(e.target.value)} />
        <Input label="City" value={city} onChange={e => setCity(e.target.value)} />
      </div>
      <div className="lg:col-span-8">
        <PDFViewer className="w-full h-[24rem] lg:h-full">
          <ShippingDocument
            senderName={session.user.name}
            senderLocation={session.user.location}
            recipientData={{
              value,
              name,
              address,
              code,
              city,
            }}
          />
        </PDFViewer>
      </div>
    </div>
  );
};

export default TemplateShipping;
