/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";

export default function Component() {
    const { data, status }: any = useSession();
    const [items , setItems] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [isAdmin, setAdmin] = useState(false)
    const [candidat, setCandidat] = useState({
        name: ""
      });


    useEffect(() => {
        console.log("Logging in...", status);

        if (status === 'unauthenticated') {
            signIn("asgardeo");
        } else if (status === 'authenticated') {
            console.log("Authenticated ...", status);
            console.log("User : ", data)
            const scopes = data?.user?.scope;
            if (scopes && scopes.includes("urn:senthalan:backendservicepythonitems:add_item")) {
                setAdmin(true);
            }
            getItems();
        }
    }, [status])

    const getItems = async () => {
        try {
          setLoading(true)
            const response = await axios.get("/api/items");
            console.log("items : ", response.data);
            // items = response.data;
            setItems(response.data)
            setLoading(false)
        } catch (error) {
          setLoading(false)
        }
    }

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (candidat.name === "")
          return alert("Item can't be null");
    
        await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(candidat),
            });
            setItems([...items, candidat]);
    };

    return (
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Item List</h1>
        {(!data) && <p>No Items</p>}
        {(isAdmin) && (
            <Popup trigger={<button> Add Item </button>} 
                position="right center">
                <form
        onSubmit={onSubmit}
        className="w-1/3 justify-center border-2 flex flex-col gap-4 m-4 p-2">
        <input
          className="border-2 border-gray-200  p-2"
          onChange={(e) => setCandidat({name : e.target.value})} 
        ></input>

        <button
          className="bg-black text-white text-sm font-medium p-2 rounded "
          type="submit"
        >
          <>Add</>
        </button>
      </form>
           </Popup>
        )}
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
        {items.map((item) => (
          <li 
          key={item.name}
          style={{
            borderColor: 'rgb(44 54 99)',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            {item.name}
            </li>
        ))}
        
      </ul>
      </div>
    )
}