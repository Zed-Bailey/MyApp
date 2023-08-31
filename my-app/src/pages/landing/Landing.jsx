

export function Landing() {

    return(
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-lg">this is the landing page</h1>
            <a className="border-2 border-solid border-blue-600 p-2 rounded hover:bg-blue-600 hover:text-white hover:shadow-md" href="/login">Login</a>
        </div>
    );
}