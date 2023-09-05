import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export function Landing() {

    const items = ["camera", "laptop", "headphones", "camera", "laptop", "headphones", "camera", "laptop", "headphones", "camera", "laptop", "headphones"]
    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center gap-5">
                <h1 className="text-lg">this is the landing page</h1>
                <a className="border-2 border-solid border-blue-600 p-2 rounded hover:bg-blue-600 hover:text-white hover:shadow-md" href="/login">Login</a>
            </div>

            <div className="flex flex-row flex-wrap gap-10 justify-center py-10">
                {

                    items.map((value, index) => {
                        return (
                            <Card className="py-4 lg:w-[270px] md:w-1/3 sm:w-full" isPressable isHoverable>
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                    <small className="text-default-500">12 Tracks</small>
                                    <h4 className="font-bold text-large">{value}</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=270&q=80"
                                        width={270}
                                    />
                                </CardBody>
                            </Card>
                        )

                    })
                }
            </div>


        </div>

    );
}