import {useForm} from 'react-hook-form';
import {useQueryClient, useMutation, useQuery} from 'react-query';
import {useState} from 'react';

import {getToners} from '@/services/tonerService';
import {updateToner, deleteToner} from '@/services/tonerService';
import Modal from '@/components/Modal';

const TonerEdit = () => {
  const [selectedTonerId, setSelectedTonerId] = useState();

  const {register, handleSubmit, errors} = useForm();

  const queryClient = useQueryClient();

  const {data: tonersList} = useQuery('toners', getToners);

  const updateTonerMutation = useMutation(updateToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });
  const handleTonerEdit = async data => {
    updateTonerMutation.mutate({id: selectedTonerId, updatedToner: data});
    setSelectedTonerId();
  };

  const deleteTonerMutation = useMutation(deleteToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });
  const handleTonerDelete = async tonerId => {
    deleteTonerMutation.mutate(tonerId);
  };

  return (
    <Modal buttonLabel={'Edit Toner'} submit={handleSubmit(handleTonerEdit)}>
      <div className="relative flex flex-col gap-4">
        <div>
          <select onChange={e => setSelectedTonerId(e.target.value)}>
            {tonersList?.map(toner => (
              <option key={toner._id} value={toner._id}>
                {toner.code}
              </option>
            ))}
          </select>
        </div>
        {tonersList?.map(toner =>
          toner._id === selectedTonerId ? (
            <div key={toner._id}>
              <button
                onClick={() => handleTonerDelete(toner._id)}
                className="absolute top-0 right-0"
              >
                <span className="material-icons">close</span>
              </button>
              <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                <legend className="text-4xl">Create Toner</legend>
                <label htmlFor="code">
                  Code
                  <input
                    autoComplete="off"
                    className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200"
                    name="code"
                    defaultValue={toner.code}
                    ref={register({required: true})}
                  />
                  {errors.code && <span className="block text-red-600">You must provide code</span>}
                </label>
                <label htmlFor="color">
                  Color
                  <select
                    className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200 focus:outline-none"
                    name="color"
                    defaultValue={toner.color}
                    ref={register}
                  >
                    <option value="Black">Black</option>
                    <option value="Cyan">Cyan</option>
                    <option value="Magenta">Magenta</option>
                    <option value="Yellow">Yellow</option>
                  </select>
                </label>
              </form>
            </div>
          ) : null
        )}
      </div>
    </Modal>
  );
};

export default TonerEdit;
