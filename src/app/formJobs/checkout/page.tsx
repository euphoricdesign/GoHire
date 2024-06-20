'use client'
import Image from 'next/image'
import React, { useState, ChangeEvent } from 'react'
import Cards from '../../../../public/cards.png'
import Mp from '../../../../public/mp.png'
import { SiMercadopago } from "react-icons/si";
import { FaCheck } from "react-icons/fa6";
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '@/lib/store'
import { useGetJobByIdQuery } from '@/lib/services/jobsApi'


const Checkout: React.FC = () => {
    const defaultItem = { id: '', category_id: '', currency_id: '', description: '', title: '', quantity: 0, unit_price: 0 };

    const [isMercadoPagoChecked, setIsMercadoPagoChecked] = useState<boolean>(false)
    const url = useSelector((state: RootState) => state.payments.paymentData?.url, shallowEqual) || ''
    const item = useSelector((state: RootState) => state.payments.paymentData?.item, shallowEqual) || defaultItem;
    
    const { data } = useGetJobByIdQuery({ id: item.id });
    console.log(data)

    let duration = ''

    switch (item.description) {
        case '7 días':
            duration = '7 días'
            break;
        
        case '15 días':
            duration = '15 días'
            break;

        case '30 días':
            duration = '30 días'
            break;
    
        default:
            break;
    }

    const handleMpChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsMercadoPagoChecked(event.target.checked);
    };

    return (
        <>
            {
                data && item ? (
                    <div className='mt-[100px] px-[124px] gap-[200px] flex justify-between'>
                        <div className='w-full rounded h-[174px] border border-[#0612241a]'>
                            <table className='w-full bg-white  '>
                                <thead className='flex flex-col'>
                                    <tr className='bg-[#0612240e] text-[#4a4a4a] font-normal text-sm text-start'>
                                        <th className=' p-4 text-left text-[#05264E]'>Opciones de pago</th>
                                    </tr>
                                </thead>
                                <tbody className='font-normal text-gray-600 text-sm'>
                                    <tr className=''>
                                        <td className='p-4 flex items-center gap-2 text-[#05264E]'>
                                            <input type="checkbox" />
                                            Tarjetas de débito y crédito
                                            <Image src={Cards} alt='' className='w-[150px]' />
                                        </td>
                                    </tr>
                                    <tr className=''>
                                        <td className='p-4 flex items-center gap-2 text-[#05264E]'>
                                            <input type="checkbox" checked={isMercadoPagoChecked} onChange={handleMpChange} />
                                            <Image src={Mp} alt='' className='w-[80px]' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='border border-[#0612241a] rounded'>
                            <div className='bg-[#0612240e] text-[#4a4a4a] w-[400px] p-5'>
                                {data && data.length > 0 && (
                                    <>
                                      <div className="flex gap-3 w-[60px] items-center mb-[10px]">
                                        <Image
                                          className="w-full h-full"
                                          width={100}
                                          height={1}
                                          src={data[0].imgUrl}
                                          alt=""
                                        />
                                        <h4 className="font-semibold text-left mb-[4px] text-base">
                                          {data[0].title}
                                        </h4>
                                      </div>
                                      <p className='text-sm mb-[10px]'>{data[0].description}</p>
                                    </>
                                )}
                                <div className='flex justify-between mb-4'>
                                    <span className='font-[700] w-[265px] text-base'>Pago publicación destacada</span>
                                    <span>${item.unit_price}</span>
                                </div>
                                <span className='flex items-center gap-2'><FaCheck className='text-[15px]' /> Destacada por <span>{duration}</span></span>
                                <span className='flex items-center gap-2'><FaCheck className='text-[15px]' /> Etiqueta de contratación urgente</span>
                            </div>
                            <div className='bg-white text-[#4a4a4a] w-[400px] p-5'>
                                <div className='flex justify-between font-[700] text-[18px]'>
                                    <span>Total</span>
                                    <span>${item.unit_price}</span>
                                </div>
                                <button onClick={isMercadoPagoChecked ? () => window.location.href = `${url}` : () => {}} className={`w-full mt-5 border-none p-2.5 h-12 rounded text-white font-medium flex items-center justify-center ${isMercadoPagoChecked ? 'bg-sky-500' : 'bg-[#3C65F5]'} transition-all cursor-pointer duration-300 ease-in-out opacity-100 hover:opacity-80 text-center`}>{isMercadoPagoChecked ? <SiMercadopago className='text-[40px] text-center text-white' /> : 'Ir a pagar' }</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </>
    )
}

export default Checkout
