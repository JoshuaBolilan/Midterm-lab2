import React, { useState, useEffect } from 'react';

const BookManager = () => {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ name: '', author: '', isbn: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books')
            .then(response => response.json())
            .then(data => setBooks(data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData.errors);
                return;
            }

            const newBook = await response.json();
            setBooks([...books, newBook]);
            setForm({ name: '', author: '', isbn: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Book Management</h2>

            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookModal">
                Add Book
            </button>

            <div className="modal fade" id="bookModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Book Name</label>
                                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author</label>
                                    <input type="text" className="form-control" name="author" value={form.author} onChange={handleChange} />
                                    {errors.author && <p className="text-danger">{errors.author}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ISBN</label>
                                    <input type="text" className="form-control" name="isbn" value={form.isbn} onChange={handleChange} />
                                    {errors.isbn && <p className="text-danger">{errors.isbn}</p>}
                                </div>
                                <button type="submit" className="btn btn-success">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>ISBN</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookManager;
