import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct, toggleApproval, toggleMissing, setQuantityUpdated } from '../slice/productSlice';
import {BsPrinter} from "react-icons/bs";
import {AiOutlineSearch} from "react-icons/ai"
import Modal from './Modal';
import avocadoImageUrl from './AvocadoHass.jpg'
import {AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai"
import {RxCross1} from "react-icons/rx"
import {BsCheck2} from "react-icons/bs"

function ProductList() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(5);
  const [modalTotal, setModalTotal] = useState(0);
  

  const getNextProductId = () => {
    const maxId = Math.max(...products.map((product) => product.id), 0);
    return maxId + 1;
  };
  const initialProduct = products[0]
  const handleAddProduct = () => {
    const newProductId = getNextProductId();
    const newProduct = {
      ...initialProduct,
      id: newProductId,
    };
    
    dispatch(addProduct(newProduct));
  };

  const handleToggleApproval = (productId) => {
    dispatch(toggleApproval(productId));
    
  };
  const handleToggleMissing = (productId) => {
    dispatch(toggleMissing(productId));
    
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };
  const handleEditProduct = (productId, updatedProduct) => {
    if (!selectedProduct) {
      console.error('Selected product is null.');
      return;
    }
  
    const newTotal = updatedProduct.price * updatedProduct.quantity;
    setModalTotal(newTotal);
  
    dispatch(editProduct({ id: productId, updatedProduct }));
    
    if (modalQuantity !== selectedProduct.quantity) {
    console.log('Quantity changed');
    dispatch(setQuantityUpdated({ productId, quantityUpdated: true }));
    console.log('Redux state after setQuantityUpdated:', products); 
  }
  
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      total: newTotal,
    }));
  
    handleCloseEditModal();
  };
  
  const handlePriceChange = (newPrice) => {
    const parsedPrice = parseFloat(newPrice);
    if (!isNaN(parsedPrice)) {
      const newTotal = (modalQuantity * parsedPrice).toFixed(2); 
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        price: parsedPrice, 
      }));
      setModalTotal(newTotal); 
    }
  };

  const handleQuantityChange = (increment) => {
    if (selectedProduct) {
      const newQuantity = modalQuantity + increment;
      const newTotal = (newQuantity * selectedProduct.price).toFixed(2);
  
      setModalQuantity(newQuantity);
      setModalTotal(newTotal);
    }
  };
  
  useEffect(() => {
    function updateProduct() {
      if (selectedProduct && modalQuantity !== selectedProduct.quantity) {
        const updatedProduct = {
          ...selectedProduct,
          quantity: modalQuantity,
          total: (modalQuantity * selectedProduct.price).toFixed(2),
        };
  
        setSelectedProduct(updatedProduct);
        dispatch(setQuantityUpdated({ productId: selectedProduct.id, quantityUpdated: true }));
        
      }
    }
  
    updateProduct();
  }, [modalQuantity, selectedProduct, dispatch]);


  return (
    <div className='mt-8 mx-20 h-2/3 border-2 border-gray-300 rounded-lg'>
        <div className=' mx-10 flex items-center justify-between mt-8'>
            <div className='w-96 h-8 border border-gray-300 rounded-2xl cursor-pointer overflow-hidden flex justify-between items-center'>
                <input type="text" placeholder='Search...' className='pl-5 outline-none w-full'/>
                <div className='text-gray-300 text-xl pr-5'><AiOutlineSearch /></div>
            </div>
            <div className='flex space-x-10 items-center'>
                <button className='w-28 h-8 text-green-800 font-semibold border border-green-800 rounded-2xl hover:bg-green-800 hover:text-white cursor-pointer' onClick={ handleAddProduct}>Add item</button>
                <div className='text-green-800 text-4xl '><BsPrinter /></div>
            </div>
        </div>

        <div className='mt-8 mx-10 h-8 border border-gray-300 rounded-t-lg flex items-center'>
            <div className='pl-32'>product Name</div>
            <div className='pl-48'>Brand</div>
            <div className='pl-44'>Price</div>
            <div className='pl-28'>Quantity</div>
            <div className='pl-16'>Total</div>
            <div className='pl-20'>Status</div>
        </div>
        
        <div >
        
        {products.map((product) => (
            <div key={product.id} className=' ml-14 mr-10  flex items-center  border-b border-gray-400 space-x-12'>
              <img src={avocadoImageUrl} alt="avocado" className='w-12 h-12  mt-5 mb-5'/>
              <div >{product.name}</div>
              <div >{product.brand}</div>
              <div >${product.price} /6*1LB</div>
              <div >{product.quantity} x 6 * 1LB</div>
              <div className='pr-1'>${product.total}</div>
              <div className='bg-gray-200 w-96 h-24 flex justify-between items-center space-x-5 pr-8'>
                <div className=''>
                  <div className={` bg-green-600 rounded-2xl text-white px-2 text-center w-24 h-8 ml-5 ${product.approved  ? 'visible' : 'hidden'}`}>Approved</div>
                  <div className={` bg-orange-600 text-white rounded-2xl text-center w-20 h-8 ml-5 ${product.missing  ? 'visible' : 'hidden'}`}>Missing</div>
                  <div>
                  {product.quantityUpdated && (<div className='bg-orange-600 text-white rounded-2xl text-center w-32 h-8 ml-5'>Quantity Updated</div>)}
                  </div> 
                </div>
                <div className='flex space-x-5 items-center'> 
                  <button className={`text-2xl ${product.approved  ? 'text-green-600' : ''}`} onClick={() => handleToggleApproval(product.id)}> <BsCheck2 /></button>
                  <button onClick={() => handleToggleMissing(product.id)} className={`text-2xl ${product.missing  ? 'text-red-500' : ''}`}><RxCross1 /></button>
                  <button onClick={() => handleOpenEditModal(product)} className='underline cursor-pointer'>Edit</button>
                </div>
                
              </div>
            </div>
        ))}
        </div>
          

        {/* Modal */}
        {editModalOpen && (
          
        <Modal >
        
        <div className="p-5 ">
          <div  className="top-6 right-6 absolute" onClick={handleCloseEditModal}><RxCross1 /></div>
          <div className='font-semibold text-2xl'>Chicken Breast Fillet, Boneless Marinated 6 Ounce Raw, Invivid...</div>
          <div className='text-2xl'>American Roland</div>
          <div className='flex pt-10'>
            <div className="w-36 h-36" style={{backgroundImage: `url(${avocadoImageUrl})`, backgroundSize: 'cover'}}></div>
            <div className='flex-row space-y-5 ml-5'>
              <div className='flex items-center space-x-36'>
                <div>Price ($)</div>
                <div className='flex items-center space-x-2'>
                  <input type="text" placeholder='9999.99' value={selectedProduct.price} 
                onChange={(e) => handlePriceChange(Number(e.target.value))}  className='w-24 h-8 overflow-hidden border border-gray-300 bg-gray-100 rounded-lg text-center'/>
                  <div>/6 * 1LB</div>
                </div>
              </div>
              <div className='flex items-center space-x-28'>
                <div>Quantity</div>
                <div className='flex items-center space-x-2'>
                  <div className='text-green-500 text-2xl cursor-pointer' onClick={() => handleQuantityChange(-1)}><AiFillMinusCircle /></div>
                  <input type="text" placeholder='5' value={modalQuantity} onChange={(e) => setModalQuantity(Number(e.target.value))} disabled={selectedProduct === null} className='w-24 h-8 overflow-hidden border border-gray-300 bg-gray-100 rounded-lg text-center'/>
                  <div className='text-green-500 text-2xl cursor-pointer' onClick={() => handleQuantityChange(+1)}><AiFillPlusCircle /></div>
                  <div>/6 * 1LB</div>
                </div>
              </div>
              <div className='flex items-center space-x-40'>
                <div>Total</div>
                <div>$ {modalTotal}</div>
                
              </div>
            </div>
          </div>
          <div>
            <div className='font-semibold mt-10'>Choose Reason (Optional)</div>
            <div className='flex space-x-2 items-center mt-3'>
              <div className='h-8 border border-gray-300 rounded-2xl px-4 text-center'>Missing Product</div>
              <div className='h-8 border border-gray-300 rounded-2xl px-4 text-center'>Quantity is not the same</div>
              <div className='h-8 border border-gray-300 rounded-2xl px-4 text-center'>Price is not the same</div>
              <div className='h-8 border border-gray-300 rounded-2xl px-4 text-center'>Other</div>
            </div>
          </div>
          <div className='flex justify-end mt-10 space-x-3'>
          <button className='text-green-800 border-hidden font-semibold' onClick={handleCloseEditModal}>Cancel</button>
          <button onClick={() => handleEditProduct(selectedProduct.id, selectedProduct)} 
          className='w-24 h-8 bg-green-800 rounded-2xl text-white font-semibold cursor-pointer  hover:bg-white hover:text-green-800 hover:border-2 hover:border-green-800'>send</button>
          </div>
          
        </div>
      </Modal>
      )}
        
    </div>
  );
}

export default ProductList;