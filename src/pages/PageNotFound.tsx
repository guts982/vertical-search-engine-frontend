import { Ban } from 'lucide-react';

const PageNotFound = () => {
    return (
        <div className='w-full min-h-[80vh] flex justify-center items-center font-fira gap-2'>
           <Ban className='text-red-500 h-12 w-12' /> <div className='font-bold text-6xl'> <span className='text-red-500'>404</span>   Page Not Found</div>
        </div>
    );
};

export default PageNotFound;