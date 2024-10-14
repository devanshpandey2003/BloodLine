
function CardComponent ({children} : {children: React.ReactNode}) {
    return (

        <div className='bg-gray-50 m-[30px] w-[450px] shadow-xl h-[450px]'>
            {children}
        </div>

    )
}

export default CardComponent;

