import React, { useEffect, useState } from 'react';
import Header from '../../component/Header/Header';
import { MdDelete } from "react-icons/md";
import { FaUserEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { deleteUser, addUser, getUsers, editUser, getUserByID } from '../../FirebaseService/UserService';
import Loading from '../../component/Loaders/Oclock/Loading';



import { createAccount } from '../../FirebaseService/AuthService';

const Usuario = () => {
    const [users, setUsers] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [userID, setUserID] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
        setIsLoading(false);
    }, []);

    const fetchUsers = async () => {
        const datos = await getUsers();
        if (datos) {
            setUsers(datos);
        }
    };

    const ModalInformacion = ({ id, tipo }) => {
        const [user, setUser] = useState('');
        const [password, setPassword] = useState('');
        const [tipoInput, setTipoInput] = useState(false);

        useEffect(() => {
            if (tipo === "Editar" && id) {
                const fetchUser = async () => {
                    const data = await getUserByID(id);
                    if (data) {
                        setUser(data.usuario);
                        setPassword(data.password);
                    }
                };
                fetchUser();
            }
        }, [id, tipo]);

        const saved = async (e) => {
            e.preventDefault();
            const data = {
                usuario: user,
                password: password
            };

            if (tipo === "Crear") {
                if (await createAccount(data)) {
                    setIsCreating(false);
                    fetchUsers();
                } else {
                    alert('Error al crear usuario');
                }
            } else {
                if (await editUser(id, data.usuario, data.password)) {
                    setIsEditing(false);
                    fetchUsers();
                } else {
                    alert('Error al editar usuario');
                }
            }
        };

        return (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <form className='flex flex-col gap-5 text-center bg-white rounded shadow-md p-9' onSubmit={saved}>
                    <input
                        required
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className='outline-none w-[250px] p-1 border-b-[1px] border-b-[#000]'
                        type="email"
                        placeholder='Correo'
                    />
                    <div className='flex flex-row items-center justify-center w-full'>
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='outline-none w-[250px] p-1 border-b-[1px] border-b-[#000]'
                            type={tipoInput ? "text" : "password"}
                            placeholder='Password'
                        />
                        {tipoInput ? (
                            <FaEyeSlash size={20} onClick={() => setTipoInput(!tipoInput)} />
                        ) : (
                            <FaEye size={20} onClick={() => setTipoInput(!tipoInput)} />
                        )}
                    </div>
                    <div className='flex flex-row items-center justify-center gap-5'>
                        <button className='p-2 mt-4 bg-primary text-secondary-a' type='submit'>
                            {tipo === "Crear" ? "Crear" : "Editar"}
                        </button>
                        <button className='p-2 mt-4 bg-gray-300 rounded' type='button' onClick={() => { tipo === "Crear" ? setIsCreating(false) : setIsEditing(false) }}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const ModalEliminar = () => {
        const handleDelete = async () => {
            if (userID) {
                if (await deleteUser(userID)) {
                    setIsDeleting(false);
                    fetchUsers();
                } else {
                    alert('Error al eliminar usuario');
                }
            }
        };

        return (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='text-center bg-white rounded shadow-md p-9'>
                    <p>¿Estás seguro de eliminar a este usuario?</p>
                    <div className='mt-4'>
                        <button onClick={handleDelete} className='p-2 mr-2 text-white bg-red-500 rounded w-[100px]'>Sí</button>
                        <button onClick={() => { setIsDeleting(false); }} className='p-2 bg-gray-300 rounded w-[100px]'>No</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            {
                isLoading ?
                    Loading()
                    :
                    <section className='mx-auto my-5 w-[90%] flex flex-col gap-5 relative'>
                        <p className='font-bold text-[20px]'>Usuarios Registrados</p>
                        <button className='p-2 rounded-md bg-primary text-secondary-a w-[200px]' onClick={() => { setIsCreating(true); }}>
                            Crear Usuario
                        </button>
                        {
                            users.length === 0 ? <p>No hay usuarios registrados</p> :
                                users.map((user, index) => (
                                    <div key={index} className='flex flex-row items-center justify-between p-4 shadow-md'>
                                        <p>{user?.usuario}</p>
                                        <div className='flex flex-row gap-5'>
                                            <MdDelete onClick={() => { setIsDeleting(true); setUserID(user.id); }} className='cursor-pointer' size={35} />
                                            <FaUserEdit onClick={() => { setIsEditing(true); setUserID(user.id); }} className='cursor-pointer' size={35} />
                                        </div>
                                    </div>
                                ))
                        }
                        {isDeleting && <ModalEliminar />}
                        {isEditing && <ModalInformacion id={userID} tipo='Editar' />}
                        {isCreating && <ModalInformacion tipo='Crear' />}
                    </section>
            }


        </>
    );
};

export default Usuario;