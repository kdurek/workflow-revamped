import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';

import Button from '@/common/components/Button';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import SelectNative from '@/common/components/SelectNative';
import usePrinterCreate from '@/modules/reactQuery/mutations/useCreatePrinter';

const PrinterCreate = () => {
  const router = useRouter();

  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();

  const {mutate: createPrinter} = usePrinterCreate();

  const handlePrinterCreate = data => {
    createPrinter(data);
    router.push('/printers');
  };

  const handleCancel = () => {
    router.push('/printers');
  };

  return (
    <Form label="Create printer" onSubmit={handleSubmit(handlePrinterCreate)}>
      <SelectNative label="Brand" options={['Xerox', 'HP']} register={register('brand')} />
      <Input
        error={errors?.model?.message}
        label="Model"
        register={register('model', {required: {value: true, message: 'Model is required'}})}
      />
      <div className="flex gap-4">
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="primary"
          onClick={handleSubmit(handlePrinterCreate)}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default PrinterCreate;
