import  ReactDOM  from "react-dom";
import { useEffect } from "react";

function Modal({onClose, children}){
   useEffect(() =>{
    document.body.classList.add('overflow-hidden');
    return ()=>{

        document.body.classList.remove('overflow-hidden');
    }
   },[])
   
   
   return ReactDOM.createPortal(
   <div>
        <div onClick={onClose} className="fixed inset-0 bg-neutral-500 opacity-80 "></div>
        <div className="fixed inset-12 top-32 p-10 bg-white w-2/4 h-2/3 inset-x-96 bottom-30 rounded-lg shadow-2xl"> 
        <div className="flex flex-col justify-between h-full">
            {children}</div>
         </div>
    </div>,
    document.querySelector('.modal-container')
)}
export default Modal;