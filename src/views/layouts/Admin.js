import { BrowserRouter } from 'react-router-dom';
import RouterView from '../../router/RouterView';

import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import Footer from '../partials/Footer';

const Admin = () => (
    <section id="body-pd" className='section-body'>
        <BrowserRouter>
            <Header/>
            <Sidebar/>
            <div className="">
                <RouterView/>
            </div>     
        </BrowserRouter>    
        {/*<Footer/>   */}
    </section>
);

export default Admin;