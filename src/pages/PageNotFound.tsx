import { Ban } from 'lucide-react';

const PageNotFound = () => {

    const speak = () => {
        const text = "Page Not Found!";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = .1

        window.speechSynthesis.speak(utterance)

    }

    return (
        <div   className='w-full min-h-[80vh] flex justify-center items-center font-fira gap-2 '>
          <button onClick={speak} className='flex justify-center items-center gap-2 cursor-pointer'><Ban className='text-red-500 h-12 w-12' /> <div className='font-bold text-6xl'> <span className='text-red-500'>404</span>   Page Not Found</div></button>
        </div>
    );
};

export default PageNotFound;