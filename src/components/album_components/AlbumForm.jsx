import { FormProvider, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import LabelInput from '../LabelInput';
import Error from '../Error';

const validationRules = {
  albumName: {
    required: 'Album name is required',
    maxLength: {
      value: 25,
      message: 'Album name cannot exceed 25 characters',
    },
  },
};

export default function AlbumForm({ onSubmit, onCancel }) {
  const methods = useForm({
    defaultValues: {
      albumName: '',
    },
  });

  const { reset, handleSubmit } = methods;

  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        await onSubmit(formData);
        reset();
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
    [onSubmit, reset]
  );

  return (
    <FormProvider {...methods}>
      <div className='container'>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='d-flex flex-column'
        >
          <h1>Create New Album</h1>

          {/* <Error error={methods.formState.errors.albumName?.message} /> */}

          <LabelInput
            label='Album Name'
            type='text'
            name='albumName'
            placeholder='Enter album name'
            validationRules={validationRules.albumName}
          />

          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={methods.formState.isSubmitting}
              >
                Create Album
              </button>

              <button
                type='button'
                className='btn btn-light'
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
