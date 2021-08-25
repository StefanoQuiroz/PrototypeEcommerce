import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import Swal from 'sweetalert2';
const MenuApi = () => {
    const [menus, setMenus] = useState([]);

    const getMenu = async () => {
        const res = await axios.get(`/api/menu`);
        setMenus(res.data.data);
    }

    useEffect(()=>{
        getMenu();
    },[]);

    /* useEffect(() => {
        axios.get(`/api/menu`)
            .then(response => setMenus(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Error en cargar los datos",
                text: "Problemas al cargar los datos"
            }))
    }, []) */

    //console.log("Menu", menus);
    return {
        menus: [menus, setMenus]
    };
}

export default MenuApi;
