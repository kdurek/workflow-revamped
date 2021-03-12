import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import {createToner} from 'src/services/tonerService';
import Modal from '../Modal';

const TonerCreate = () => {
  const {register, handleSubmit, watch, errors} = useForm();

  const queryClient = useQueryClient();

  const createTonerMutation = useMutation(createToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });

  const handleTonerCreate = async data => {
    createTonerMutation.mutate(data);
  };

  return (
    <Modal buttonLabel={'Add Toner'} submit={handleSubmit(handleTonerCreate)}>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <legend className="text-4xl">Create Toner</legend>
        <label htmlFor="code">
          Code
          <input
            autoComplete="off"
            className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200"
            name="code"
            ref={register({required: true})}
          />
          {errors.code && <span className="block text-red-600">You must provide code</span>}
        </label>
        <label htmlFor="color">
          Color
          <select
            className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200 focus:outline-none"
            name="color"
            ref={register}
          >
            <option value="Black">Black</option>
            <option value="Cyan">Cyan</option>
            <option value="Magenta">Magenta</option>
            <option value="Yellow">Yellow</option>
          </select>
        </label>
      </form>
    </Modal>
  );
};

export default TonerCreate;
