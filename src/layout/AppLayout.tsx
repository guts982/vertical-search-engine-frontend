
import { Outlet } from 'react-router';
import Header from './components/Header';


const AppLayout = () => {
    return (
        <main className=''>
            <Header />
            <Outlet />
        </main>
    );
};

export default AppLayout;