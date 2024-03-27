<script>
    import { onMount } from "svelte";
    import Card from "../../components/Card.svelte";
    import axios from "axios";

    let carData = [];

    const getCarData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/dealer/car"
            );
            console.log(response.data.data);
            carData = response.data.data;
        } catch (error) {
            console.error("Error fetching car data:", error);
        }
    };

    onMount(getCarData);
</script>

<div>
    <div
        class=" w-80 h-80 diffBorder absolute bg-red-200 -top-40 rotate-45 -left-6"
    ></div>
    <div class=" w-96 h-96 diffBorder absolute bg-red-200 right-20"></div>
    <div class="flex flex-col">
        <h1
            class="  mb-6 mt-12 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-red-900 m-auto mb-7"
        >
            Explore Cars
        </h1>
    </div>
    <div class="flex flex-wrap justify-evenly">
        {#each carData as data}
            <Card
                type={data.type}
                name={data.name}
                model={data.model}
                info={data.car_info}
                carId={data._id}
                dealer={data.dealer}
            />
        {/each}
    </div>
</div>
