import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Invalid() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/0')
    }, [navigate])
    
    return (
        <div data-testid="invalid-component" className="w-screen h-screen flex justify-center items-center">
        </div>
    )
}