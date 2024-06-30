import { useNavigate } from "react-router-dom"

export function Home() {
    const navigate = useNavigate()

    function getStarted() {
        navigate("/todo")
    }
    return (<>
        <h1> Welcome To Todo List But Better</h1>
        <button onClick={getStarted}>Get Started</button>
    </>
    )
}