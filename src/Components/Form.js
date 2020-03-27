import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(2,'Name must be at least 2 characters'),
    size: yup.string().required('Must choose a size'),
    pepperoni: yup.boolean().defined(),
    ham: yup.boolean().defined(),
    chicken: yup.boolean().defined(),
    peppers: yup.boolean().defined(),
    sausage: yup.boolean().defined(),
    SpecialIns: yup.string().notRequired()
});

export default function Form() {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: false,
        ham: false,
        chicken: false,
        peppers: false,
        sausage: false,
        SpecialIns: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        ham: "",
        chicken: "",
        peppers: "",
        sausage: "",
        SpecialIns: ""
    })

    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                setPost(res.data);

                setFormState({
                    name: "",
                    size: "",
                    pepperoni: false,
                    ham: false,
                    chicken: false,
                    peppers: false,
                    sausage: false,
                    SpecialIns: ""
                });
            })
            .catch(err => console.log('Issue submitting form', err.response));
    };

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return(
        <form onSubmit = {formSubmit}>
            <Link to ={"/"}>
                <div>Home</div>
            </Link>
            <h1>Start Your Order!</h1>
            <label htmlFor = 'name'>
                Name:
                <br/>
                <input
                    id='name'
                    type='text'
                    name='name'
                    placeholder='First and Last'
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label> <br/>
            <label htmlFor='size'>
                Choose pizza size:
                <br/>
                <select
                    id='size'
                    name='size'
                    onChange={inputChange}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="XL">Extra Large</option>
                    </select>
            </label> <br/>
            <div className='toppingsList'>
                <p>Choose Toppings</p>
                <label htmlFor='pepperoni'>
                    <input
                        id='pepperoniCheck'
                        name='pepperoni'
                        type='checkbox'
                        checked={formState.pepperoni}
                        onChange={inputChange}
                    />
                        Pepperoni
                </label> <br/>
                <label htmlFor='ham'>
                    <input
                        id='hamCheck'
                        name='ham'
                        type='checkbox'
                        checked={formState.ham}
                        onChange={inputChange}
                    />
                    Ham
                </label> <br/>
                <label htmlFor='chicken'>
                <input
                        id='chickenCheck'
                        name='chicken'
                        type='checkbox'
                        checked={formState.chicken}
                        onChange={inputChange}
                    />
                    Chicken
                </label> <br/>
                <label htmlFor='peppers'>
                <input
                        id='peppersCheck'
                        name='peppers'
                        type='checkbox'
                        checked={formState.peppers}
                        onChange={inputChange}
                    />
                    Peppers
                </label> <br/>
                <label htmlFor='sausage'>
                <input
                        id='sausageCheck'
                        name='sausage'
                        type='checkbox'
                        checked={formState.sausage}
                        onChange={inputChange}
                    />
                    Sausage
                </label> <br/>
            </div>
            <label htmlFor='Special Instructions'>
                Any Special Requests?
                <br/>
                <textarea
                    id='SpecialIns'
                    name='SpecialIns'
                    placeholder='Type special requests here..'
                    value={formState.SpecialIns}
                    onChange={inputChange}
                />
            </label> <br/>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )

}