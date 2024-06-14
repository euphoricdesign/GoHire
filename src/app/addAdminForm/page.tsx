'use client';
import React from 'react';
import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';
import AdminCategory from '@/components/AdminCategory/AdminCategory';

const AddCategoryPage: React.FC = () => {
    return (
        <div className='mt-[100px] px-4 md:px-[124px] flex flex-col md:flex-row gap-4'>
            <div className="w-full md:w-1/2">
                <AddCategoryForm />
            </div>
            <div className="w-full md:w-1/2">
                <AdminCategory />
            </div>
        </div>
    );
};

export default AddCategoryPage;
