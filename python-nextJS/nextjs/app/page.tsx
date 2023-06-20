/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useSession, signIn, signOut } from "next-auth/react"
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

        if (status === 'authenticated') {
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

    const invokeSignOut = async () => {
        const idToken = data?.idToken;
        signOut()
            .then(
                () => window.location.assign(
                    "https://api.asgardeo.io/t/" + process.env.NEXT_PUBLIC_ASGARDEO_ORGANIZATION_NAME +
                    "/oidc/logout?id_token_hint=" + idToken + "&post_logout_redirect_uri=" +
                    process.env.NEXT_PUBLIC_ASGARDEO_POST_LOGOUT_REDIRECT_URI + "&state=sign_out_success"
                )
            );
    }

    const invokeSignUp = async () => {
        // https://accounts.asgardeo.io/t/senthalan/accountrecoveryendpoint/register.do?client_id=QUbrRSWKpBFMmp3TYjq_Xa9jRZ4a&code_challenge=m-eIDDayHUeyQJbA8ZEmIxLRSgcrppkGZp0OBEd6vZ8&code_challenge_method=S256&commonAuthCallerPath=%2Ft%2Fsenthalan%2Foauth2%2Fauthorize&forceAuth=false&passiveAuth=false&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fasgardeo&response_type=code&scope=openid+profile+groups+urn%3Asenthalan%3Abackendservicepythonitems%3Aadd_item&state=Akb2Un7fcph2u7P5oHV1K80ZhRWa8VZtFqq_rY8Z5TY&sessionDataKey=5097afa5-ea70-4e89-814f-2fd3e8f25fed&relyingParty=QUbrRSWKpBFMmp3TYjq_Xa9jRZ4a&type=oidc&sp=App+Dev+Exp+Backend_Sandbox&isSaaSApp=false&authenticators=BasicAuthenticator%3ALOCAL&reCaptcha=true&reCaptchaResend=true&callback=https%3A%2F%2Faccounts.asgardeo.io%2Ft%2Fsenthalan%2Fauthenticationendpoint%2Flogin.do%3Fclient_id%3DQUbrRSWKpBFMmp3TYjq_Xa9jRZ4a%26code_challenge%3Dm-eIDDayHUeyQJbA8ZEmIxLRSgcrppkGZp0OBEd6vZ8%26code_challenge_method%3DS256%26commonAuthCallerPath%3D%2Ft%2Fsenthalan%2Foauth2%2Fauthorize%26forceAuth%3Dfalse%26passiveAuth%3Dfalse%26redirect_uri%3Dhttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fasgardeo%26response_type%3Dcode%26scope%3Dopenid+profile+groups+urn%3Asenthalan%3Abackendservicepythonitems%3Aadd_item%26state%3DAkb2Un7fcph2u7P5oHV1K80ZhRWa8VZtFqq_rY8Z5TY%26sessionDataKey%3D5097afa5-ea70-4e89-814f-2fd3e8f25fed%26relyingParty%3DQUbrRSWKpBFMmp3TYjq_Xa9jRZ4a%26type%3Doidc%26sp%3DApp+Dev+Exp+Backend_Sandbox%26isSaaSApp%3Dfalse%26authenticators%3DBasicAuthenticator%3ALOCAL%26reCaptcha%3Dtrue%26reCaptchaResend%3Dtrue

        // https://accounts.asgardeo.io/t/tpptenentsorg/accountrecoveryendpoint/register.do?client_id=SfDcIpAGUQXCOdZPPX02DTNaeFwa&sp=TPP_Login
        window.location.assign(
                    "https://accounts.asgardeo.io/t/" + process.env.NEXT_PUBLIC_ASGARDEO_ORGANIZATION_NAME +
                    "/accountrecoveryendpoint/register.do?sp=" + process.env.NEXT_PUBLIC_ASGARDEO_APP_NAME
            )
    }

    return (
      <div>

        {
            (status === 'unauthenticated') &&
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold mb-4">You are not logged in!</h1>
                <button
                    className="bg-black text-white text-sm font-medium p-2 rounded "
                    onClick={() => signIn("asgardeo")}
                >
                    <>Sign In</>
                </button> 
                <button
                    className="bg-black text-white text-sm font-medium p-2 rounded "
                    onClick={invokeSignUp}
                >
                    <>Sign Up</>
                </button> 
            </div>
        }
        {
            (status === 'authenticated') &&
            <div>
                <h3>Welcome {data.user.email}</h3>
                <button className="bg-black text-white text-sm font-medium p-2 rounded "onClick={invokeSignOut}>
                    Sign Out
                </button>

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
        }
      </div>
    )
}