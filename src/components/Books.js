import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const { token, role } = localStorage;

    useEffect(() => {
        if (token) {
            fetch('http://localhost:3000/api/books', {
                headers: { Authorization: token },
            })
                .then(response => response.json())
                .then(data => setBooks(data.sort((a, b) => a.id - b.id)));
        }
    }, [token]);

    return (
        <div style={{backgroundColor: '#000', borderColor: '#000'}}>
            <br/>
            {token && (
                <>
                    <div style={{backgroundColor: '#000',margin:"10px", borderColor: '#000', display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outline-danger" onClick={
                            () => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('role');
                                window.location = '/home';
                            }
                        }>Logout</Button>
                        {role === 'admin' ? (
                            <Link to="/add">
                                <Button variant="outline-primary">Add Book</Button>
                            </Link>
                        ) : (
                            <Button variant="outline-primary">Read Reviews</Button>
                        )}
                    </div>
                    {books.map(book => (
                        <Card className="mb-4" key={book.id}>
                            <Card.Img variant="top" src={book.pic_url} />
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>{book.description}</Card.Text>
                                <Card.Text>Created by {book.author}</Card.Text>
                                {role === 'admin' && (
                                    <>
                                        <Link to={`/edit/${book.id}`}>
                                            <Button variant="outline-primary">Edit</Button>
                                        </Link>
                                        <Button variant="outline-danger" onClick={() => {
                                            fetch(`http://localhost:3000/api/book/${book.id}`, {
                                                method: 'DELETE',
                                                headers: { Authorization: token },
                                            })
                                                .then(() => setBooks(books.filter(b => b.id !== book.id)));
                                        }}>Delete</Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </>
            )}
        </div>
    );
};

export default Books;