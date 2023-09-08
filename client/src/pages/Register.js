import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../redux/slices/userSlice';


const Register = () => {
    const {errors: err, isAuth} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        dispatch(signup(data))

    }
    console.log(errors);
    console.log("err :", err);

    useEffect(() => {
        if(isAuth) navigate("/")
    }, [isAuth])

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
    <input type="text" placeholder="name" {...register("name", {required: true})} />
    <p className="errors"> {errors.name && "this field is required"} </p>
    <input type="email" placeholder="email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
    <p className="errors"> {errors.email && "this field is required"} </p>
    {/* <p className="errors"> {err  && "email exist, please try to login"} </p> */}
    {err ==="email exist, please try to login" && (
    <p className="errors">email exist, please try to login</p>
)}

    <input type="password" placeholder="password" {...register("password", {required: true})} />
    <p className="errors"> {errors.password && "this field is required"} </p>
    {err ==="Password must be at least 8 characters long." && (
    <p className="errors">your password must be at least 6 characters and contain numbers, letters uppercase and lowercase, symbols</p>
)}
    <input type="submit" />
  </form>
  )
}

export default Register