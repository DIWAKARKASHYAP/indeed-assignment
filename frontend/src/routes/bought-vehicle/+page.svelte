<!-- SoldVehiclesPage.svelte -->
<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { Card } from "flowbite-svelte";

    let soldVehicles = [];

    onMount(async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                "https://indeed-assignment.vercel.app/user/bought",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            soldVehicles = response.data.soldVehicles;
            console.log(soldVehicles);
        } catch (error) {
            console.error("Error fetching sold vehicles:", error);
        }
    });
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

    <h1 class="text-3xl font-bold mb-6">Bought Vehicles</h1>
    <div class="  h-1 bg-black rounded-full max-w-7xl m-auto mb-10"></div>

    <!-- <div class="grid gap-6 lg:grid-cols-3"> -->
    <div class=" mb-10 mx-5 flex max-w-7xl justify-evenly flex-wrap">
        {#if soldVehicles.length == 0}
            <div class=" h-96 flex items-center justify-center">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-900 md:text-5xl lg:text-6xl dark:text-white"
                >
                    no order found
                </h1>
            </div>
        {:else}
            {#each soldVehicles as vehicle}
                <Card class="mb-10">
                    <h5
                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        {vehicle.type}
                        {vehicle.name}
                    </h5>
                    <div
                        class="font-normal text-gray-700 dark:text-gray-400 leading-tight"
                    >
                        {vehicle.model}
                    </div>
                    <div>{vehicle.car_info}</div>
                    <!-- <span class=" "> -->
                    <!-- </span> -->
                </Card>
            {/each}
        {/if}
    </div>
</div>
