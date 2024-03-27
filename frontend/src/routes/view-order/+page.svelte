<!-- DealerDealsPage.svelte -->
<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { Card, Badge, Button } from "flowbite-svelte";
    let deals = [];

    onMount(async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                "https://indeed-assignment.vercel.app/dealer/order",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            deals = response.data.deals;
        } catch (error) {
            console.error("Error fetching deals:", error);
        }
    });

    const confirmDeal = async (carId, userId, dealId) => {
        const token = localStorage.getItem("token");
        console.log("--------------------------------------");
        // console.log(carId, userId, dealId);
        console.log("--------------------------------------");

        try {
            const response = await axios.post(
                "https://indeed-assignment.vercel.app/dealer/order",

                {
                    carId,
                    userId,
                    dealId,
                    token,
                }
            );

            console.log(response);
            if (response.data.success) {
                alert("successfully ");
                window.location.href = "/view-order";
            } else {
                alert("some error occur, please try after some time ");
            }
            // deals = response.data.deals;
        } catch (error) {
            console.error("Error fetching deals:", error);
        }
    };
</script>

<div class="container max-w-7xl mx-auto py-8">
    <div
        class=" w-80 h-80 diffBorder absolute bg-red-200 top-10 rotate-90 -left-6"
    ></div>
    <div
        class=" w-96 h-96 diffBorder absolute bg-red-200 top-40 rotate-45 right-24"
    ></div>
    <div
        class=" w-40 h-40 diffBorder absolute bg-red-200 bottom-20 rotate-12 left-52"
    ></div>

    <h1 class="text-3xl font-bold mb-6">Vehicles Order</h1>
    <div class="  h-1 bg-black rounded-full max-w-7xl m-auto mb-10"></div>

    <div class="grid gap-6 lg:grid-cols-3">
        {#if deals.length == 0}
            <div class=" h-96 flex items-center justify-center">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-900 md:text-5xl lg:text-6xl dark:text-white"
                >
                    no order found
                </h1>
            </div>
        {:else}
            {#each deals as deal}
                <Card class="p-4 shadow-md border border-gray-200 rounded-lg">
                    <div>
                        <h2 class="text-lg font-semibold mb-2">
                            {deal.carDetails.name}
                        </h2>
                        <p class="text-gray-600 mb-2">
                            Model: {deal.carDetails.model}
                        </p>
                        <p class="text-gray-600 mb-2">
                            Type: {deal.carDetails.type}
                        </p>

                        <p class="text-gray-600 mb-2">
                            Customer: {deal.userDetails.email}
                        </p>
                        <p class="text-gray-600 mb-2">
                            Location: {deal.userDetails.location}
                        </p>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-500"
                                >Deal ID: {deal._id}</span
                            >
                        </div>
                    </div>
                    <Button
                        class=" mt-5"
                        on:click={confirmDeal(
                            deal.carId,
                            deal.userDetails._id,
                            deal._id
                        )}>confirm</Button
                    >
                </Card>
            {/each}
        {/if}
    </div>
</div>

<style>
    /* Add Tailwind CSS styles here */
</style>
