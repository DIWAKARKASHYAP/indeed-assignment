<!-- <script>
    import { onMount } from "svelte";
    import Card from "../components/Card.svelte";
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

<h1 class="">Welcome to SvelteKit</h1>
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
</div> -->

<script>
    import Hero from "../components/subComponent/Hero.svelte";
    import About from "../components/subComponent/About.svelte";
    import Main from "../components/subComponent/Main.svelte";
    import Bottom from "../components/subComponent/Bottom.svelte";
</script>

<Hero />
<About />
<Main />
<Bottom />
