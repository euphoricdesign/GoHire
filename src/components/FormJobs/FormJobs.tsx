"use client";

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JobsPostData } from '@/types/jobsTypes';
import { usePostJobMutation} from "@/lib/services/jobsApi";
import { FaInfoCircle, FaBriefcase, FaAlignLeft, FaFolder, FaImage, FaLaptopHouse, FaMapMarkerAlt, FaMoneyBillAlt } from 'react-icons/fa';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { plans } from '@/utils/plan';
import { usePostPaymentMutation } from '@/lib/services/paymentsApi';
import { useAppDispatch } from '@/lib/hooks';
import { setPaymentData } from '@/lib/features/slices/paymentsSlice';
import CategorySelect from '@/components/CategorySelect/CategorySelect'; // Importa el nuevo componente

interface FormJobsProps {
  title: string;
  img: string;
  width: string;
  textButton: string;
}

interface Plan {
  idPubli?: number;
  title: string;
  quantity: number;
  unit_price: number;
  description: string;
  id: string
}

const FormJobs: React.FC<FormJobsProps> = ({ title, img, width, textButton }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<JobsPostData>();
  const [postJob, { isLoading, isError, isSuccess }] = usePostJobMutation();
  const [postPayment] = usePostPaymentMutation();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const [dataSelect, setDataSelect] = useState<Plan>({} as Plan);

  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlan = plans.find(plan => plan.idPubli === parseInt(e.target.value));
    if (selectedPlan) {
      setDataSelect(selectedPlan);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value); 
    setValue('category', e.target.value);
  };

  const onSubmit: SubmitHandler<JobsPostData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('location', data.location); // Asegúrate de agregar 'location'
      formData.append('remoteWork', data.remoteWork.toString()); // Convertir a string
      if (data.file) formData.append('file', data.file);

      const post = await postJob(formData).unwrap();
      toast.success("Post created successfully!");

      const nuevoObjeto = Object.assign({}, dataSelect);
      delete nuevoObjeto.idPubli
      nuevoObjeto['id'] = post?.id
      console.log(nuevoObjeto)
      const result = await postPayment(nuevoObjeto).unwrap();

      dispatch(setPaymentData(result));

      if (path === '/formJobs/spotlight-post') {
        router.push('/formJobs/checkout');
      }
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('file', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue('file', undefined);
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    console.log('Data updated:', dataSelect);
  }, [dataSelect]);

  return (
    <section className="mt-[100px] mb-[60px]  mobile:px-[25px] md:px-0">
      <ToastContainer />
      <div className="mx-auto max-w-screen-xl pb-8">
        <div className="flex gap-[90px] mobile:flex-col md:flex-row">
          <div className="lg:col-span-2 flex flex-col gap-[80px]">
            <p className="max-w-xl text-[30px] text-[#05264E] font-semibold mobile:text-center md:text-start">
              {title}
            </p>
            <Image src={img} width={100} height={1} alt='' className={`${width}`} />
          </div>

          <div className="relative block overflow-hidden rounded-lg border-gray-100 p-4 sm:pt-6 sm:pr-6 sm:pl-6 lg:pt-8 lg:pr-8 lg:pl-8 form-container shadow-md">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center">
                <div className="w-10 text-[#3C65F5]">
                  <FaBriefcase className="w-5 h-5" />
                </div>
                <div className="flex-grow relative">
                  <input
                    className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer"
                    placeholder="Job Title"
                    type="text"
                    id="jobTitle"
                    {...register("title", {
                      required: "The title is required.",
                      maxLength: { value: 20, message: "The title cannot be more than 20 characters." }
                    })}
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                  {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 text-[#3C65F5] mt-2">
                  <FaAlignLeft className="w-5 h-5" />
                </div>
                <div className="flex-grow relative">
                  <textarea
                    className="w-full h-[80px] text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 resize-none peer"
                    placeholder="Description"
                    id="description"
                    rows={4}
                    {...register("description", {
                      required: "The description is mandatory.",
                      maxLength: { value: 200, message: "The description cannot be more than 200 characters." }
                    })}
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                  {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 text-[#3C65F5]">
                  <FaFolder className="w-5 h-5" />
                </div>
                <div className="flex-grow relative">
                  <CategorySelect selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                  {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 text-[#3C65F5]">
                  <FaLaptopHouse className="w-5 h-5" />
                </div>
                <div className="flex-grow relative">
                  <select
                    className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer"
                    id="remoteWork"
                    {...register("remoteWork", { required: true })}
                  >
                    <option value="">Is it a remote job?</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                  {errors.remoteWork && <span className="text-red-500 text-xs mt-1">Please select an option</span>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 text-[#3C65F5]">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div className="flex-grow relative">
                  <input
                    className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer"
                    placeholder="Location"
                    type="text"
                    id="location"
                    {...register("location", {
                      required: "The location is required",
                      maxLength: { value: 50, message: "The location cannot be more than 50 characters." }
                    })}
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                  {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 text-[#3C65F5]">
                  <FaImage className="w-5 h-5" />
                </div>
                <div className="flex-grow relative">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image"
                    className="w-full text-gray-700 text-lg focus:outline-none pl-0 pr-3 py-2 peer cursor-pointer flex items-center"
                  >
                    <span className="text-gray-500">
                      {previewImage ? "Change image" : "Add image"}
                    </span>
                  </label>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                </div>
              </div>

              {/* Previsualización de la imagen */}
              {previewImage && (
                <div className="mt-4 max-w-[200px]">
                  <img 
                    src={previewImage} 
                    alt="Vista previa" 
                    className="max-w-full h-auto rounded-lg shadow-md" 
                  />
                </div>
              )}

              {path !== '/formJobs' && (
                <div className="flex items-center">
                  <div className="w-10 text-[#3C65F5]">
                    <FaMoneyBillAlt className="w-5 h-5" />
                  </div>
                  <div className="flex-grow relative">
                    <select
                      onChange={handlePlanChange}
                      className="w-full text-gray-700 text-base focus:outline-none pl-0 pr-3 py-2 peer"
                      id="paymentPlan"
                    >
                      <option value="">Selecciona un plan</option>
                      {plans.map(plan => (
                        <option key={plan.idPubli} value={plan.idPubli}>
                          {plan.title} (${plan.unit_price})
                        </option>
                      ))}
                    </select>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 peer-focus:w-full peer-focus:bg-[#3C65F5]" style={{ width: 'calc(100% - 3rem)' }}></div>
                    {errors.paymentPlan && <span className="text-red-500 text-xs mt-1">Please select a payment plan</span>}
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-100 rounded-lg flex items-start space-x-2">
                <FaInfoCircle className="w-5 h-5 text-[#3C65F5] mt-1 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Note:</span> The time of publication will be automatically added to your post when you submit it.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full text-white px-4 py-3 rounded font-semibold transition duration-300"
                  style={{ backgroundColor: '#3C65F5' }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : `${textButton}`}
                </button>
              </div>
              {isError && <div className="text-red-500 text-center">An error occurred while creating the post.</div>}
              {isSuccess && <div className="text-green-500 text-center">Post created successfully!</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormJobs;
