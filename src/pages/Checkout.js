import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../features/cart/cartAPI'
import { deleteItemFromCartAsync, selectItems } from '../features/cart/cartSlice'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser } from '../features/auth/authSlice'
import { createOrderAsync, orderplacedstatus } from '../features/order/orderSlice'
import { discountedPrice } from '../app/constants'
import { updateUserAsync } from '../features/user/UserSlice'

const Checkout = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch();
    const orderstatus=useSelector(orderplacedstatus);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();  
    const items = useSelector(selectItems);
    const user=useSelector(selectLoggedInUser);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const totalAmount = items.reduce((amount, item)=>discountedPrice(item.product)*item.quantity +amount,0)
    const totalItems = items.reduce((total, item)=>item.quantity + total,0)
    const handleQuantity = (e, item) => {
      dispatch(updateCart({ id:item.id, quantity: +e.target.value }));
    };
  
    const handleRemove =(e, id)=>{
      dispatch(deleteItemFromCartAsync(id))
    }
  
    const handlePayment = (e) => {
      console.log(e.target.value);
      setPaymentMethod(e.target.value);
    };
  
    const handleAddress = (e) => {
      console.log(e.target.value);
      setSelectedAddress(user.addresses[e.target.value]);
    };

    const handleOrder = (e) => {
      if (selectedAddress && paymentMethod) {
        const order = {
          items,
          totalAmount,
          totalItems,
          user: user.id,
          paymentMethod,
          selectedAddress,
          status: 'pending', // other status can be delivered, received.
        };
        dispatch(createOrderAsync(order));
        // need to redirect from here to a new page of order success.
      } else {
        
        alert('Enter Address and Payment method');
      }
    };
  return (
    <>
   {!items.length && <Navigate to="/" replace={true}></Navigate>}
   {orderstatus &&  orderstatus.paymentMethod ==='cash' && (
        <Navigate
          to={`/order-success/${orderstatus.id}`}
          replace={true}
        ></Navigate>
      )}
      {orderstatus &&  orderstatus.paymentMethod ==='card' && (
        <Navigate
          to={`/stripe-checkout/`}
          replace={true}
        ></Navigate>
      )}
    <form  noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
               reset();
              })}>
         <div className="mx-auto max-w-7xl  mt-10 px-4 sm:px-6 lg:px-8">
     <div className="grid px-5 grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className='  lg:col-span-3'>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
             Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('name', {
                  required: 'name is required',
                })}
                id="name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register('email', {
                  required: 'email is required',
                })}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
            </label>
            <input
                  id="phone"
                {...register('phone', {
                  required: 'phone is required',
                })}
                type="tel"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <input
                {...register('street', {
                  required: 'street is required',
                })}
                id="street"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('city', {
                  required: 'city is required',
                })}
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('state', {
                  required: 'state is required',
                })}
                id="state"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('pinCode', {
                  required: 'pinCode is required',
                })}
                id="pinCode"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        add adress
      </button>
    </div>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">address</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          choose from existing adresss
        </p>

        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
            <ul role="list" className="divide-y divide-gray-100">
          {user.addresses.map((address,index) => (

            <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
          <div className="flex items-center gap-x-3">
                <input
                  onChange={handleAddress}
                  name="payment"
                  type="radio"
                  value={index}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={} alt="" /> */}
            <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.city}
                          </p>
                        </div>
        </li>
      ))}
    </ul>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
              <input id="cash"
                    name="paymentMethod"
                    value="cash"
                    onChange={handlePayment}
                    type="radio"
                    checked={paymentMethod === 'cash'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                 Cash
                </label>
              </div>
              <div className="flex items-center gap-x-3">
              <input
                        id="card"
                        name="paymentMethod"
                        value="card"
                        onChange={handlePayment}
                        type="radio"
                        checked={paymentMethod === 'card'}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />

                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                  Card Payment
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    </div>
   <div className='lg:col-span-2'>
   <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                       src={item.product.thumbnail}
                       alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">${item.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                             onClick={e=>handleRemove(e,item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
            <div
                onClick={handleOrder}
                className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Order Now
              </div>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
    </div> 
    </div>
    </div>
  </form>
  </>
  )
}

export default Checkout
