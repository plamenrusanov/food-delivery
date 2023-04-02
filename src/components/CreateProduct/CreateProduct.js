import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { create } from "../../services/productService"

import TextField from "../Shared/TextField/TextField";
import Button from "../Shared/Button/Button";
import FileUpload from "../Shared/FileUpload/FileUpload";

import "./CreateProduct.css";

export default function CreateProduct() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { addProduct } = useContext(ProductsContext);
  const [submitError, setSubmitError] = useState("");
  const { values, changeHandler, resetForm, changeValue } = useForm({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });


  function validateField(key, value) {
    const regex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
    let result = "";
    switch (key) {
      case "name":
        if (value.length < 3 || value.length > 20) {
          result = "The product name must be between 3 and 20 symbols!";
        }
        break;

      case "email":
        if (!regex.test(String(value).toLowerCase())) {
          result = "Please provide a valid email!";
        }
        break;

      case "price":
        let num = Number(value);
        if (!num) {
          result = "The price is not correct number!";
        }
        break;
      case "re-pass":
        if (value !== values.password) {
          result = "Confirm password don't match password!";
        }
        break;

      default:
        break;
    }
    return result;
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      var responce = await create(token, values);
      addProduct(responce);
      resetForm();
      navigate("/");
    } catch (error) {
      console.log(error);
      setSubmitError(error.message);
    }
  };

  return (
    <div className="form-holder">
      <h1 className="form-header">Create Prodict</h1>
      {submitError && <p className="submit-error">{submitError}</p>}
      <form className="form" onSubmit={onSubmitHandler}>
        <TextField
          name="name"
          label="Name"
          inputType="text"
          value={values.name}
          onChangeValue={changeHandler}
          onValidation={validateField}
        />

        <TextField
          name="price"
          label="Price"
          inputType="number"
          value={values.price}
          onChangeValue={changeHandler}
          onValidation={validateField}
        />

        <TextField
          name="description"
          label="Description"
          inputType="text"
          value={values.description}
          onChangeValue={changeHandler}
          onValidation={validateField}
        />

        <FileUpload
          name="imageUrl"
          label="Image"
          value={values.imageUrl}
          onChangeValue={changeHandler}
          changeValue={changeValue}
        />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
