import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function UnauthenticatedBosch() {

    const router = useRouter();

    useEffect(() => {
        router.replace('/login')
    }, []);
    
    return (
        <>
        </>
    )

}