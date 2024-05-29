import React from 'react'

const Home = () => {
  return (
    <>
        <div className='min-h-screen flex justify-center items-center bg-violetBg bg-fixed z-0 bg-top'>
            <div className='flex justify-evenly gap-24 items-center'>
                <div>
                    <h1 className='text-5xl font-bold text-[#363636] w-[500px]'>Conseguí el trabajo de tus sueños</h1>
                    {/* <SearchBar /> */}
                </div>
                <img className='w-96' src="https://institutosantalucia.es/wp-content/uploads/2020/10/caracteristicas-de-las-mujeres-trabajadoras.jpg" alt="" />
            </div>
        </div>

        <div className='p-10'>
            <h2 className='font-bold text-4xl'>Simple section</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto doloribus perferendis non incidunt tenetur aliquam eligendi laudantium quisquam nemo. Sunt modi et quidem ab ipsa non, nesciunt optio amet architecto, voluptatibus eum itaque, hic exercitationem perspiciatis labore fugit blanditiis nulla?</p>
        </div>
    </>
  )
}

export default Home