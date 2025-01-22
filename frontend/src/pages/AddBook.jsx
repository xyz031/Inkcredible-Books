import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

export default function AddBook() {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setData({ ...Data, url: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    const submit = async () => {
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === ""
            ) {
                alert("All Fields are required");
                return;
            }
    
            console.log("Submitting data:", Data); // Debug payload
            console.log("Headers:", headers); // Debug headers
    
            const response = await axios.post(
                "https://inkcredible-books.onrender.com/api/v1/add-book",
                Data,
                { headers }
            );
    
            setData({
                url: "",
                title: "",
                author: "",
                price: "",
                desc: "",
                language: ""
            });
    
            alert(response.data.message);
        } catch (error) {
            console.error(error); // Log the error for debugging
            alert(error.response?.data?.message || "An error occurred.");
        }
    };
    

    return (
        <div className="h-[100%] p-0 md:p-4">
            <h1 className="text-3xl md:test-5xl font-semibold text-zinc-500 mb-8">
                Add Book
            </h1>
            <div className="p-4 bg-zinc-800 rounded">
                <div>
                    <label htmlFor="" className="text-zinc-400">
                        Image
                    </label>
                    <div
                        {...getRootProps()}
                        className={`w-full mt-2 bg-zinc-900 text-zinc-100 p-4 outline-none border-dashed border-2 ${isDragActive ? "border-blue-500" : "border-gray-600"} rounded`}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the image here...</p>
                        ) : Data.url ? (
                            <img
                                src={Data.url}
                                alt="Uploaded"
                                className="w-full h-40 object-contain"
                            />
                        ) : (
                            <p>Drag & drop an image here, or click to select one</p>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Title of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Title of Image"
                        name="title"
                        required
                        value={Data.title}
                        onChange={change}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Author of book
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Enter Author name"
                        name="author"
                        required
                        value={Data.author}
                        onChange={change}
                    />
                </div>
                <div className="mt-4 flex gap-4">
                    <div className="w-3/6">
                        <label htmlFor="" className="text-zinc-400">
                            Language
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Language of book"
                            name="language"
                            required
                            value={Data.language}
                            onChange={change}
                        />
                    </div>

                    <div className="w-3/6">
                        <label htmlFor="" className="text-zinc-400">
                            Price of book
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Enter price of book"
                            name="price"
                            required
                            value={Data.price}
                            onChange={change}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="text-zinc-400">
                        Description of book
                    </label>
                    <textarea
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Description of book"
                        name="desc"
                        required
                        value={Data.desc}
                        onChange={change}
                    />
                </div>
            </div>

            <button
                className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-30"
                onClick={submit}
            >
                Add Book
            </button>
        </div>
    );
}
