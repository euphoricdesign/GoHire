import { useState } from 'react';
import { MdEmail } from "react-icons/md";

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  console.log(JSON.stringify({ email }));
  

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setMessage('Suscribiendo...');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json()
      if (response.ok) {
        setEmail('');
        setMessage('¡Te has suscrito correctamente!');
      } else {
        setMessage(data.error || 'Ocurrió un error. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      setMessage('Ocurrió un error. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className='w-full my-[100px] pt-[50px] pb-[60px] bg-bgNewsletter bg-cover rounded-[16px] flex flex-col justify-center items-center gap-10'>
      <h1 className='mobile:text-[20px] text-white md:text-[37px] font-bold max-w-[540px] mx-auto text-center'>New Things Will Always Update Regularly</h1>
      <form onSubmit={handleSubmit} className='relative mobile:w-[300px] max-w-[500px] bg-white py-[12px] px-[16px] flex gap-4 items-center rounded shadow-custom desktop:w-[600px]'>
        <div className='flex-1 relative'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <MdEmail className='text-gray-600 text-xl' />
              <input
                className='mobile:w-[100px] desktop:w-full'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <button 
              type="submit" 
              className="mobile:w-[100px] mobile:text-[12px] desktop:text-base desktop:w-[150px] text-white px-4 py-3 rounded font-semibold transition duration-300"
              style={{ backgroundColor: '#3C65F5' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
      {message && <p className='text-white text-center'>{message}</p>}
    </div>
  );
}