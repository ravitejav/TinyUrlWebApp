import { ToasterProps } from '../../Constant/PropTypes';
import './toaster.css';



export const Toaster = (toasterValues: ToasterProps) => {

    return (
        toasterValues.show ? (
            <div className='toasterCoantienr'>
                <div className='toaster'>
                    {toasterValues.message}
                </div>
            </div>
        ): null
    );

}