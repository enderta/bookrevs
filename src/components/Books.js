import React, { useState, useEffect } from 'react';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
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
                    <Container>
                        <h1 className="text-center" style={{color:"goldenrod"}}>Books</h1>
                        {/* grid style card for books */}
                        <Row xs={1} md={3} className="g-4">
                            {books.map((book) => (
                                <Col key={book.key}>
                                    <Card className="cards" style={{margin:"5px",background:"goldenrod"}}>
                                        {book.pic_url && (
                                            <Card.Img src={book.pic_url} alt={book.title} style={{width: '100%', height: '15vw', objectFit: 'cover'}} />
                                        )}
                                        <Card.Body>
                                            <Card.Title>{book.title}</Card.Title>
                                            {book.author && (
                                                <Card.Text>{book.author}</Card.Text>
                                            )}

                                            <Link to={`/book/${book.id}`}>
                                                <Button variant="primary">Read Reviews</Button>
                                            </Link>
                                            {

                                                role === 'admin' && (
                                                    <Button
                                                        variant="outline-danger"

                                                        style={{float: 'right'}}
                                                        onClick={async () => {
                                                            const response = await fetch(`http://localhost:3000/api/book/${book.id}`, {
                                                                method: 'DELETE',
                                                                headers: {
                                                                    Authorization: token,
                                                                },
                                                            });
                                                            if (response.status === 200) {
                                                                setBooks(books.filter(b => b.id !== book.id));
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                )
                                            }

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </>
            )}
        </div>
    );
};

export default Books;