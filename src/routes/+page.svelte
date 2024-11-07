<script>
    import { createLocalStorage } from '$lib/storeData';
    import { onMount } from 'svelte';

    let date;
    let currentDate;
    let capsule;
    let current;
    let open = false;

    function storeData() {
        date = document.getElementById('date').value || 'None';
        capsule = document.querySelector('textarea').value || 'None';
        const stored = { "date": date, "data": capsule };
        const store = createLocalStorage('timeCapsule', stored);
        store.set(stored); 
        window.location.reload();
    }

    function clearData() {
        localStorage.removeItem('timeCapsule');
        window.location.reload();
    }

    onMount(() => {
        current = localStorage.getItem('timeCapsule');
        if (current) {
            const parsed = JSON.parse(current);
            date = parsed.date;
            capsule = parsed.data;
            currentDate = new Date().toISOString().split('T')[0];
            if (currentDate >= date) {
                open = true;
            } else {
                open = false;
            }
        } else {
            date = null;
            capsule = null;
            open = false;
        }
    });
</script>

<div class="flex justify-center">
    {#if !open}
        {#if !current}
            <div class="flex flex-col mt-24 text-center">
                <h1 class="text-4xl font-bold">Time capsule</h1>
                
                <h2 class="text-lg mb-8">Store some info for a future date</h2>
                
                <textarea class="textarea w-96 h-40 textarea-bordered mb-4" placeholder="Enter some cool info to remember!"></textarea>
                <h3 class="font-semibold text-xl">Select a date:</h3>
                <input type="date" required id="date" name="date" class="mt-4 mb-4">
                <button class="btn btn-primary text-lg" on:click={storeData}>Store my info!</button>
            </div>
        {:else}
            <div class="flex flex-col mt-24 text-center">
                <h1 class="text-4xl font-bold">Time capsule</h1>
                <h2 class="text-xl mb-8">You have stored some info for the date:</h2>
                <h3 class="font-semibold text-xl pb-8">{date}</h3>
                <h2>Come back after then to view your capsule!</h2>
            </div>
        {/if}
    {:else}
        <div class="flex flex-col mt-24 text-center">
            <h1 class="text-4xl font-bold">Time capsule</h1>
            <h2 class="text-xl mb-8">You have stored some info for the date:</h2>
            <h3 class="font-semibold text-xl pb-8">{date}</h3>
            <h2 class="text-xl">Your stored info:</h2>
            <p class="text-lg">
                {capsule}
            </p>

            <button class="btn btn-primary text-lg mt-8" on:click={() => clearData()}>Store new info</button>
        </div>  
    {/if}
</div>