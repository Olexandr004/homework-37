import React, { useState } from 'react';

function App() {
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [photosByAlbum, setPhotosByAlbum] = useState({});

    const fetchUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const fetchAlbums = (userId) => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Error fetching albums:', error));
    };

    const fetchPhotos = (albumId) => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => response.json())
            .then(data => {
                setPhotosByAlbum(prevState => ({
                    ...prevState,
                    [albumId]: data
                }));
            })
            .catch(error => console.error('Error fetching photos:', error));
    };

    return (
        <div>
            <h1>User List</h1>
            <button onClick={fetchUsers}>Load Users</button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                        <button onClick={() => fetchAlbums(user.id)}>Album</button>
                        <ul>
                            {albums.map(album => (
                                <li key={album.id}>
                                    {album.title}
                                    <button onClick={() => fetchPhotos(album.id)}>Photos</button>
                                    <ul className="img-list">
                                        {photosByAlbum[album.id] && photosByAlbum[album.id].map(photo => (
                                            <li key={photo.id}>
                                                <img src={photo.thumbnailUrl} alt={photo.title} />
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
