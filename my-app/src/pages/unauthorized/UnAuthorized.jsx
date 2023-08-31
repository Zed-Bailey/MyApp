


export function Unauthorized() {

    return(
        <section className="dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-6xl text-primary-600 dark:text-primary-500">Un Authorized</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Looks like your not authorized to view this</p>
                    <a href="/" className="inline-flex bg-blue-600 rounded-lg hover:shadow-lg p-2 px-3 mt-5 text-white">Back to Homepage</a>
                </div>   
            </div>
        </section>
    );
}