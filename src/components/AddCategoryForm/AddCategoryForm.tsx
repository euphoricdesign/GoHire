'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { FaFolder } from 'react-icons/fa';
import { useCreateProfessionMutation } from '@/lib/services/professionsApi';
import { Professions } from "@/types/professionsTypes";


const AddCategoryForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Professions>();
  const [createProfession, { data, isLoading, error }] = useCreateProfessionMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Professions> = async (data) => {
    setIsSubmitting(true);
    try {
      await createProfession({ category: data.category }).unwrap();
      toast.success('Category added successfully');
      window.location.reload()
    } catch (error) {
      toast.error('Error adding category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='relative max-w-xl block overflow-hidden rounded-lg border-gray-100 p-4 sm:pt-6 sm:pr-6 sm:pl-6 lg:pt-8 lg:pr-8 lg:pl-8 form-container shadow-md'>
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
        <div className='flex items-center mt-4'>
          <div className='w-10 text-[#3C65F5]'>
            <FaFolder className='w-5 h-5' />
          </div>
          <div className='flex-grow relative'>
            <input
              className='w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer'
              placeholder='Category Name'
              type='text'
              id='categoryName'
              {...register('category', {
                required: 'Category name is required.',
                maxLength: { value: 50, message: 'Category name cannot exceed 50 characters.' }
              })}
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
            {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
          </div>
        </div>
        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full text-white px-4 py-3 rounded font-semibold transition duration-300'
            style={{ backgroundColor: '#3C65F5' }}
          >
            {isSubmitting ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;
