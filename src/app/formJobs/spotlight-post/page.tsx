import FormJobs from '@/components/FormJobs/FormJobs'
import React from 'react'
import Growth from '../../../../public/growth.svg'

const CreatePostWithAd: React.FC = () => {
  return (
    <div className='mt-[100px] mobile:px-[30px] md:px-[124px]'>
      <FormJobs title='Get started with ads to win work' img={Growth} width='w-[645px]' textButton='Continue' />
    </div>
  )
}

export default CreatePostWithAd