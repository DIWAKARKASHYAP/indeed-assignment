<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { Card } from "flowbite-svelte";
    import { Badge } from "flowbite-svelte";
    let orders = [];

    onMount(async () => {
        const token = localStorage.getItem("token");
        console.log("-----------------------------");
        console.log(token);
        console.log("-----------------------------");
        try {
            const response = await axios.get(
                "https://indeed-assignment.vercel.app/user/order",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            orders = response.data.deals;
            console.log(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    });
</script>

<div class="container max-w-7xl mx-auto py-8">
    <div
        class=" w-80 h-80 diffBorder absolute bg-red-200 -top-40 rotate-45 -left-6"
    ></div>
    <div class=" w-96 h-96 diffBorder absolute bg-red-200 right-20"></div>
    <h1 class="text-3xl font-bold mb-6">View Orders</h1>
    <div class="  h-1 bg-black rounded-full max-w-7xl m-auto mb-10"></div>

    <div class=" flex flex-wrap justify-evenly max-w-7xl m-auto">
        {#if orders.length == 0}
            <div class=" h-96 flex items-center justify-center">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-900 md:text-5xl lg:text-6xl dark:text-white"
                >
                    no order found
                </h1>
            </div>
        {:else}
            {#each orders as order}
                <Card class=" m-5">
                    <h5
                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        {order.carDetails.type}
                        {order.carDetails.name}
                    </h5>
                    <div
                        class="font-normal text-gray-700 dark:text-gray-400 leading-tight"
                    >
                        {order.carDetails.model}
                    </div>
                    <div>{order.carDetails.car_info}</div>
                    <div>
                        <Badge border color="blue">Request Sent</Badge>
                    </div>
                    <!-- <span class=" "> -->
                    <!-- <CarBuyModal {carId} dealerId={dealer} /> -->
                    <!-- </span> -->
                </Card>
            {/each}
        {/if}
    </div>
</div>
