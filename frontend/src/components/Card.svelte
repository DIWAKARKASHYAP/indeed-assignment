<script>
    import CarBuyModal from "./CarBuyModal.svelte";
    import { Card } from "flowbite-svelte";
    import CarCreateModal from "./CarCreateModal.svelte";
    export let type; // Prop to receive vehicle type
    export let name; // Prop to receive vehicle name (optional)
    export let model; // Prop to receive vehicle model
    export let info; // Prop to receive additional information (optional)
    export let carId;
    export let dealer;
    // console.log(carId, dealer);
</script>

<div class="vehicle-details mb-10 mx-5">
    <Card href="">
        <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
            {type}
            {name}
        </h5>
        <div class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            {model}
        </div>
        <div>{info}</div>
        <!-- <span class=" "> -->
        <CarBuyModal {carId} dealerId={dealer} />
        <!-- </span> -->
    </Card>
</div>
